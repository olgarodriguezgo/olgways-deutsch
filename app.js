// ===== CONSTANTS =====
const TYPE_ROTATION = ['listening', 'cultura', 'vocabulario', 'conversación', 'pronunciación', 'gramática práctica'];
const STORAGE_KEY   = 'olgways_deutsch';
const WORDS_PER_DAY = 5;

// ===== DATE UTILS =====
function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDayOfYear() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
}

// ===== VIDEO OF THE DAY =====
function getTodayVideo() {
  const day  = getDayOfYear();
  const type = TYPE_ROTATION[day % TYPE_ROTATION.length];
  const pool = VIDEOS.filter(v => v.tipo === type);
  // Fallback to all videos if none found for this type (shouldn't happen)
  const list = pool.length ? pool : VIDEOS;
  return { video: list[day % list.length], type };
}

// ===== VOCABULARY OF THE DAY =====
function getTodayVocab() {
  const day   = getDayOfYear();
  const start = (day * WORDS_PER_DAY) % VOCAB.length;
  return { words: VOCAB.slice(start, start + WORDS_PER_DAY), startNum: start + 1 };
}

// ===== STREAK =====
function getStreak() {
  const data     = getStorage();
  const today    = new Date();
  const todayKey = getTodayKey();
  // If today has no entries yet, start counting from yesterday
  const startOffset = (data.days[todayKey]?.length > 0) ? 0 : 1;
  let streak = 0;
  for (let i = startOffset; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (data.days[key]?.length > 0) streak++;
    else break;
  }
  return streak;
}

function getBestStreak() {
  const data = getStorage();
  const keys = Object.keys(data.days)
    .filter(k => data.days[k].length > 0)
    .sort();
  if (!keys.length) return 0;
  let best = 1, current = 1;
  for (let i = 1; i < keys.length; i++) {
    const diff = Math.round((new Date(keys[i]) - new Date(keys[i-1])) / 86400000);
    if (diff === 1) { current++; best = Math.max(best, current); }
    else current = 1;
  }
  return best;
}

// ===== CELEBRATION =====
function celebrate() {
  const items = ['🎉','⭐','🇩🇪','🔥','✨','🏆','🌟','🎊'];
  for (let i = 0; i < 22; i++) {
    const el = document.createElement('span');
    el.className = 'confetti-piece';
    el.textContent = items[i % items.length];
    const rot = (Math.random() * 720 - 360).toFixed(0) + 'deg';
    el.style.cssText = `font-size:${20+Math.random()*18}px;left:${(Math.random()*96).toFixed(1)}vw;bottom:-40px;--rot:${rot};animation:floatUp ${(1.6+Math.random()*1.2).toFixed(2)}s ease-out forwards;animation-delay:${(Math.random()*.6).toFixed(2)}s`;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
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

// Exposed globally for the HTML onclick buttons
function completeBlock(num) {
  const data = getStorage();
  const key  = getTodayKey();
  if (!data.days[key]) data.days[key] = [];
  const idx = data.days[key].indexOf(num);
  if (idx === -1) {
    data.days[key].push(num);
    if (navigator.vibrate) navigator.vibrate(50);
    if (data.days[key].length === 6) celebrate();
  } else {
    data.days[key].splice(idx, 1);
  }
  saveStorage(data);
  renderAll();
}

// ===== RENDER: HEADER & PROGRESS =====
function renderHeader() {
  const completed = getTodayCompleted();
  const count     = completed.length;

  // Formatted date
  document.getElementById('todayDate').innerHTML =
    new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  // Progress text and emoji
  document.getElementById('progressText').textContent = `${count}/6 bloques completados hoy`;
  const emojis = ['💪', '🌱', '⚡', '🔥', '🚀', '🌟', '🏆'];
  document.getElementById('progressEmoji').textContent = emojis[Math.min(count, 6)];

  // Progress dots
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`dot-${i}`).classList.toggle('done', completed.includes(i));
  }

  // Progress bar
  document.getElementById('progressBar').style.width = `${(count / 6) * 100}%`;

  // Streak badge
  const streak = getStreak();
  const sb = document.getElementById('streakBadge');
  if (sb) {
    if (streak > 0) {
      const label = streak === 1 ? 'día seguido' : 'días seguidos';
      sb.textContent = `🔥 ${streak} ${label}`;
      sb.style.display = 'block';
    } else {
      sb.style.display = 'none';
    }
  }

  // Block button and card state
  for (let i = 1; i <= 6; i++) {
    const block = document.getElementById(`block-${i}`);
    const btn   = document.getElementById(`btn-${i}`);
    if (!block || !btn) continue;
    if (completed.includes(i)) {
      block.classList.add('completed');
      btn.textContent = '✅ Completado · deshacer';
      btn.classList.add('done');
      btn.onclick = () => completeBlock(i);
    } else {
      block.classList.remove('completed');
      btn.textContent = '✅ Marcar como completado';
      btn.classList.remove('done');
      btn.onclick = () => completeBlock(i);
    }
  }
}

// ===== RENDER: BLOCK 1 — VIDEO =====
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

// ===== RENDER: BLOCK 2 — SONG (Spotify) =====
async function renderSongBlock() {
  const container = document.getElementById('songContent');
  container.innerHTML = `<p style="color:var(--t3);font-size:14px;text-align:center;padding:12px 0;">Conectando con Spotify...</p>`;

  // Handle Spotify OAuth callback if redirected back
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

// ===== RENDER: BLOCK 3 — VOCABULARY =====
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

// ===== RENDER: STATS =====
function renderStats() {
  const el = document.getElementById('statsContent');
  if (!el) return;
  const data          = getStorage();
  const allDays       = Object.values(data.days);
  const totalDays     = allDays.filter(d => d.length > 0).length;
  if (!totalDays) { el.innerHTML = ''; return; }
  const perfectDays   = allDays.filter(d => d.length === 6).length;
  const bestStreak    = getBestStreak();
  const currentStreak = getStreak();
  el.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">🔥 ${currentStreak}</div>
        <div class="stat-label">Racha actual</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">🏆 ${bestStreak}</div>
        <div class="stat-label">Mejor racha</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">⭐ ${perfectDays}</div>
        <div class="stat-label">Días perfectos</div>
      </div>
    </div>
  `;
}

// ===== RENDER: HISTORY =====
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

// ===== GLOBAL RENDER =====
function renderAll() {
  renderHeader();
  renderStats();
  renderHistory();
}

// ===== INIT =====
async function init() {
  renderAll();
  renderVideoBlock();
  renderVocabBlock();
  renderSongBlock(); // async, non-blocking
}

// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

document.addEventListener('DOMContentLoaded', init);
