# Olgways Deutsch 🇩🇪

App personal PWA para aprender alemán cada día. Diseñada para uso móvil, instalable en iPhone desde Safari.

## Estructura del proyecto

```
olgways-deutsch/
├── index.html        # Estructura de la app
├── style.css         # Diseño (malva, mobile-first)
├── app.js            # Lógica principal
├── videos.js         # 42 vídeos de YouTube curados
├── vocab.js          # 500 palabras más frecuentes del alemán
├── canciones.js      # Integración Spotify (PKCE)
├── manifest.json     # Config PWA
├── sw.js             # Service Worker (offline)
├── icon.svg          # Icono de la app
└── icon-maskable.svg # Icono para Android
```

## Los 6 bloques diarios

| # | Bloque | Descripción |
|---|--------|-------------|
| 1 | 🎥 Vídeo | Un vídeo de YouTube que rota por tipo (listening, cultura, vocabulario, conversación, pronunciación, gramática) |
| 2 | 🎵 Canción | Una canción diferente cada día de tu playlist de Spotify |
| 3 | 📚 Vocabulario | 5 palabras nuevas de las 500 más frecuentes del alemán |
| 4 | 📖 Quizlet | Recordatorio para añadir las palabras y repasar |
| 5 | 🦉 Duolingo | Enlace directo a tu lección diaria |
| 6 | 🎬 DeutschTok | Consumir contenido en alemán en TikTok |

## Instalación en iPhone

1. Abre la app en Safari
2. Toca el botón compartir (⬆)
3. Selecciona "Añadir a pantalla de inicio"
4. Se instala como app nativa sin barras del navegador

## Configuración de Spotify

La app usa el flujo PKCE (seguro para apps de navegador, sin exponer credenciales).

**Paso necesario en Spotify Developer Dashboard:**
1. Ve a https://developer.spotify.com/dashboard
2. Abre tu app → Edit Settings
3. En **Redirect URIs** añade la URL donde sirves la app:
   - Local: `http://localhost:8080/`
   - GitHub Pages: `https://TU_USUARIO.github.io/olgways-deutsch/`
4. Guarda y refresca la app
5. La primera vez verás un botón "Conectar con Spotify" — autentica una vez y no volverás a necesitarlo

## Deploy en GitHub Pages

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

Activa GitHub Pages en Settings → Pages → Branch: main

## Cómo servir en local

```bash
# Con Python
python3 -m http.server 8080

# Con Node
npx serve .
```

La app necesita un servidor HTTP (no funciona abriendo el archivo directamente) porque el Service Worker y la API de Spotify requieren HTTP/HTTPS.
