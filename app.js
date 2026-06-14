// ===== CONSTANTES =====
const TYPE_ROTATION = ['listening', 'cultura', 'vocabulario', 'conversación', 'pronunciación', 'gramática práctica'];
const STORAGE_KEY   = 'olgways_deutsch';
const WORDS_PER_DAY = 5;

// ===== UTILS DE FECHA =====
function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDayOfYear() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
}

// ===== VÍDEO DEL DÍA =====
function getTodayVideo() {
  const day  = getDayOfYear();
  const type = TYPE_ROTATION[day % TYPE_ROTATION.length];
  const pool = VIDEOS.filter(v => v.tipo === type);
  // Si no hay vídeos de ese tipo (no debería pasar), fallback a todos
  const list = pool.length ? pool : VIDEOS;
  return { video: list[day % list.length], type };
}

// ===== VOCABULARIO DEL DÍA =====
function getTodayVocab() {
  const day   = getDayOfYear();
  const start = (day * WORDS_PER_DAY) % VOCAB.length;
  return { words: VOCAB.slice(start, start + WORDS_PER_DAY), startNum: start + 1 };
}

// ===== STORAGE =====
function getStorage() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { days: {} }; }
  catch { return { days: {} }; }
}

function saveStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getTodayCompleted() {
  return getStorage().days[getTodayKey()] || [];
}

// Expuesta globalmente para los botones onclick del HTML
function completeBlock(num) {
  const data = getStorage();
  const key  = getTodayKey();
  if (!data.days[key]) data.days[key] = [];
  if (!data.days[key].includes(num)) {
    data.days[key].push(num);
    saveStorage(data);
    renderAll();
  }
}

// ===== RENDER: CABECERA Y PROGRESO =====
function renderHeader() {
  const completed = getTodayCompleted();
  const count     = completed.length;

  // Fecha bonita
  document.getElementById('todayDate').innerHTML =
    new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  // Texto y emoji de progreso
  document.getElementById('progressText').textContent = `${count}/6 bloques completados hoy`;
  const emojis = ['💪', '🌱', '⚡', '🔥', '🚀', '🌟', '🏆'];
  document.getElementById('progressEmoji').textContent = emojis[Math.min(count, 6)];

  // Puntos
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`dot-${i}`).classList.toggle('done', completed.includes(i));
  }

  // Barra de progreso
  document.getElementById('progressBar').style.width = `${(count / 6) * 100}%`;

  // Estado de cada botón y tarjeta
  for (let i = 1; i <= 6; i++) {
    const block = document.getElementById(`block-${i}`);
    const btn   = document.getElementById(`btn-${i}`);
    if (!block || !btn) continue;
    if (completed.includes(i)) {
      block.classList.add('completed');
      btn.textContent = '✅ Completado';
      btn.classList.add('done');
      btn.onclick = null;
    } else {
      block.classList.remove('completed');
      btn.textContent = '✅ Marcar como completado';
      btn.classList.remove('done');
      btn.onclick = () => completeBlock(i);
    }
  }
}

// ===== RENDER: BLOQUE 1 — VÍDEO =====
function renderVideoBlock() {
  const { video, type } = getTodayVideo();
  document.getElementById('videoBadge').textContent = type;
  document.getElementById('videoContent').innerHTML = `
    <div class="video-type-tag">${type}</div>
    <div class="video-channel">📺 ${video.canal}</div>
    <div class="video-title">${video.titulo}</div>
    <div class="video-why">${video.descripcion}</div>
    <a href="${video.url}" target="_blank" rel="noopener" class="btn-external">▶ Ver vídeo</a>
  `;
}

// ===== RENDER: BLOQUE 2 — CANCIÓN (Spotify) =====
async function renderSongBlock() {
  const container = document.getElementById('songContent');
  container.innerHTML = `<p style="color:var(--t3);font-size:14px;text-align:center;padding:12px 0;">Conectando con Spotify...</p>`;

  // Gestionar callback de Spotify si viene redirigido
  await initSpotify();

  const result = await getDailyCancion();

  if (result.status === 'needs_login') {
    container.innerHTML = `
      <p class="simple-block-text">Conecta tu cuenta de Spotify para ver cada día una canción diferente de tu playlist personal.</p>
      <button class="btn-external" style="border:none;cursor:pointer;width:100%;" onclick="loginWithSpotify()">
        🎵 Conectar con Spotify
      </button>
    `;
    return;
  }

  if (result.status === 'error') {
    container.innerHTML = `
      <p class="simple-block-text" style="color:#c0392b;">
        ⚠️ ${result.error}<br><br>
        <small>Asegúrate de añadir la URL de esta app como Redirect URI en tu <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener" style="color:var(--p)">Spotify Dashboard</a>.</small>
      </p>
      <button class="btn-external" style="border:none;cursor:pointer;width:100%;margin-top:8px;" onclick="loginWithSpotify()">
        🔄 Intentar de nuevo
      </button>
    `;
    return;
  }

  const c = result.cancion;
  container.innerHTML = `
    ${c.caratula ? `<img src="${c.caratula}" alt="Carátula de ${c.titulo}" style="width:100%;border-radius:var(--rs);margin-bottom:14px;aspect-ratio:1;object-fit:cover;">` : ''}
    <div class="song-title">${c.titulo}</div>
    <div class="song-artist">${c.artista}</div>
    <p style="font-size:13px;color:var(--t3);margin-bottom:14px;">${c.album}</p>
    <a href="${c.url}" target="_blank" rel="noopener" class="btn-external">🎧 Abrir en Spotify</a>
    ${c.preview ? `
      <div style="margin-top:12px;">
        <p style="font-size:11px;color:var(--t3);margin-bottom:6px;text-align:center;">VISTA PREVIA (30 seg)</p>
        <audio controls src="${c.preview}" style="width:100%;"></audio>
      </div>
    ` : ''}
  `;
}

// ===== RENDER: BLOQUE 3 — VOCABULARIO =====
function renderVocabBlock() {
  const { words, startNum } = getTodayVocab();
  document.getElementById('vocabBadge').textContent = `#${startNum}–${startNum + 4}`;

  document.getElementById('vocabContent').innerHTML = `
    <p class="vocab-set-label">Palabras ${startNum} a ${startNum + 4} de las 500 más frecuentes del alemán</p>
    ${words.map(w => `
      <div class="vocab-card">
        <div class="vocab-top">
          ${w.gender ? `<span class="vocab-gender">${w.gender}</span>` : ''}
          <span class="vocab-word">${w.word}</span>
        </div>
        <div class="vocab-translation">${w.translation}</div>
        <div class="vocab-pron">/ ${w.pronunciation} /</div>
        <div class="vocab-examples">
          ${w.examples.map(e => `
            <div class="vocab-ex-de">• ${e.de}</div>
            <div class="vocab-ex-es">${e.es}</div>
          `).join('')}
        </div>
      </div>
    `).join('')}
  `;
}

// ===== RENDER: HISTORIAL =====
function renderHistory() {
  const data = getStorage();
  const days = Object.entries(data.days)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 30);

  const container = document.getElementById('historyList');

  if (!days.length) {
    container.innerHTML = `<div class="history-empty">Completa tu primer bloque hoy para empezar el historial 🌱</div>`;
    return;
  }

  container.innerHTML = days.map(([dateStr, completed]) => {
    const count     = (completed || []).length;
    const pct       = Math.round((count / 6) * 100);
    const isPerfect = count === 6;
    const date      = new Date(dateStr + 'T12:00:00');
    const label     = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
    return `
      <div class="history-item">
        <div class="history-date">${label}</div>
        <div class="history-bar-wrap">
          <div class="history-bar${isPerfect ? ' full' : ''}" style="width:${pct}%"></div>
        </div>
        <div class="history-count${isPerfect ? ' perfect' : ''}">${count}/6${isPerfect ? ' ⭐' : ''}</div>
      </div>
    `;
  }).join('');
}

// ===== RENDER GLOBAL =====
function renderAll() {
  renderHeader();
  renderHistory();
}

// ===== INIT =====
async function init() {
  renderAll();
  renderVideoBlock();
  renderVocabBlock();
  renderSongBlock(); // async pero no bloqueante
}

// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

document.addEventListener('DOMContentLoaded', init);
