/*
 * AUTENTICACIÓN SPOTIFY — PKCE Flow
 *
 * Por qué PKCE y no Client Credentials:
 *   - Client Credentials expone tu Client Secret en el código fuente (cualquiera puede verlo)
 *   - Client Credentials bloquea CORS en el navegador (Spotify no lo permite desde frontend)
 *   - PKCE es el estándar recomendado por Spotify para apps de navegador / PWA
 *   - No necesita Client Secret — solo el Client ID (que sí puede estar en el frontend)
 *   - Requiere que te loguees una vez con tu cuenta de Spotify
 *
 * CONFIGURACIÓN REQUERIDA EN SPOTIFY DEVELOPER DASHBOARD:
 *   1. Ve a https://developer.spotify.com/dashboard
 *   2. Abre tu app → Edit Settings
 *   3. En "Redirect URIs" añade la URL donde sirves esta app
 *      (ej: http://localhost:8080 para pruebas, o tu dominio real)
 *   4. Guarda cambios
 */

const SPOTIFY = {
  clientId:   '2b9bd15ddfb9489b929c27854928460a',
  playlistId: '2vlCXuACUxD5jgK4aZBJVN',
  scopes:     'playlist-read-private playlist-read-collaborative',
  redirectUri: window.location.origin + window.location.pathname.replace(/index\.html$/, '')
};

// ─── Helpers PKCE ────────────────────────────────────────────────────────────

function generateCodeVerifier(length = 64) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const arr = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(arr).map(b => chars[b % chars.length]).join('');
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

async function loginWithSpotify() {
  const verifier   = generateCodeVerifier();
  const challenge  = await generateCodeChallenge(verifier);
  sessionStorage.setItem('spotify_verifier', verifier);

  const params = new URLSearchParams({
    response_type:         'code',
    client_id:             SPOTIFY.clientId,
    scope:                 SPOTIFY.scopes,
    redirect_uri:          SPOTIFY.redirectUri,
    code_challenge_method: 'S256',
    code_challenge:        challenge
  });

  window.location.href = 'https://accounts.spotify.com/authorize?' + params;
}

async function exchangeCodeForToken(code) {
  const verifier = sessionStorage.getItem('spotify_verifier');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:    'authorization_code',
      code,
      redirect_uri:  SPOTIFY.redirectUri,
      client_id:     SPOTIFY.clientId,
      code_verifier: verifier
    })
  });
  if (!res.ok) throw new Error('Error intercambiando código por token');
  return res.json();
}

async function refreshAccessToken(refreshToken) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:    'refresh_token',
      refresh_token: refreshToken,
      client_id:     SPOTIFY.clientId
    })
  });
  if (!res.ok) throw new Error('Error refrescando token');
  return res.json();
}

// ─── Token storage ────────────────────────────────────────────────────────────

function saveTokens({ access_token, refresh_token, expires_in }) {
  const expiry = Date.now() + (expires_in - 60) * 1000; // 1 min de margen
  localStorage.setItem('sp_access',  access_token);
  localStorage.setItem('sp_expiry',  expiry);
  if (refresh_token) localStorage.setItem('sp_refresh', refresh_token);
}

async function getValidToken() {
  const access  = localStorage.getItem('sp_access');
  const expiry  = parseInt(localStorage.getItem('sp_expiry') || '0');
  const refresh = localStorage.getItem('sp_refresh');

  if (access && Date.now() < expiry) return access;

  if (refresh) {
    const data = await refreshAccessToken(refresh);
    saveTokens(data);
    return data.access_token;
  }

  return null; // necesita login
}

// ─── Playlist fetch ───────────────────────────────────────────────────────────

async function fetchPlaylistTracks(token) {
  let tracks = [];
  let url = `https://api.spotify.com/v1/playlists/${SPOTIFY.playlistId}/tracks?limit=100&fields=next,items(track(id,name,artists,external_urls,album(name,images),preview_url))`;

  while (url) {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(`Error ${res.status}: ${errData?.error?.message || 'Error leyendo playlist'}`);
    }
    const data = await res.json();
    const valid = (data.items || []).filter(i => i.track && i.track.id);
    tracks = tracks.concat(valid.map(i => ({
      titulo:    i.track.name,
      artista:   i.track.artists.map(a => a.name).join(', '),
      album:     i.track.album.name,
      url:       i.track.external_urls.spotify,
      caratula:  i.track.album.images[0]?.url || '',
      preview:   i.track.preview_url
    })));
    url = data.next;
  }
  return tracks;
}

async function getPlaylistCached(token) {
  const cacheKey    = 'sp_playlist';
  const cacheExpiry = 'sp_playlist_exp';
  const now         = Date.now();

  if (now < parseInt(localStorage.getItem(cacheExpiry) || '0')) {
    return JSON.parse(localStorage.getItem(cacheKey));
  }

  const tracks = await fetchPlaylistTracks(token);
  localStorage.setItem(cacheKey,    JSON.stringify(tracks));
  localStorage.setItem(cacheExpiry, now + 24 * 60 * 60 * 1000); // 24h
  return tracks;
}

// ─── Canción del día ──────────────────────────────────────────────────────────

function getDayIndex(total) {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day   = Math.floor((now - start) / 86400000);
  return day % total;
}

// ─── API pública ──────────────────────────────────────────────────────────────

/**
 * Llama a esta función al cargar la página.
 * Maneja el callback de Spotify y el login inicial.
 * Devuelve { status: 'ok'|'needs_login'|'error', cancion?, error? }
 */
async function initSpotify() {
  // ¿Viene Spotify de vuelta con un código?
  const params = new URLSearchParams(window.location.search);
  const code   = params.get('code');
  const error  = params.get('error');

  if (error) return { status: 'error', error: 'El usuario canceló el login de Spotify.' };

  if (code) {
    // Limpiar la URL sin recargar
    window.history.replaceState({}, '', window.location.pathname);
    const data = await exchangeCodeForToken(code);
    saveTokens(data);
  }

  return { status: 'ready' };
}

async function getDailyCancion() {
  const token = await getValidToken();
  if (!token) return { status: 'needs_login' };

  try {
    const tracks = await getPlaylistCached(token);
    if (!tracks.length) throw new Error('La playlist está vacía');
    const cancion = tracks[getDayIndex(tracks.length)];
    return { status: 'ok', cancion };
  } catch (e) {
    // Si el token expiró y el refresh falló, forzar login de nuevo
    if (e.message.includes('401')) {
      localStorage.removeItem('sp_access');
      localStorage.removeItem('sp_refresh');
      return { status: 'needs_login' };
    }
    return { status: 'error', error: e.message };
  }
}
