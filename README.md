# Olgways Deutsch 🇩🇪

A personal PWA for daily German learning. Designed for mobile use, installable on iPhone from Safari.

## Project structure

```
olgways-deutsch/
├── index.html        # App structure
├── style.css         # Styling (mauve, mobile-first)
├── app.js            # Main logic
├── videos.js         # 42 curated YouTube videos
├── vocab.js          # 500 most frequent German words
├── canciones.js      # Spotify integration (PKCE)
├── manifest.json     # PWA config
├── sw.js             # Service Worker (offline support)
└── icon.png          # App icon
```

## The 6 daily blocks

| # | Block | Description |
|---|-------|-------------|
| 1 | 🎥 Video | A YouTube video rotating by type (listening, culture, vocabulary, conversation, pronunciation, grammar) |
| 2 | 🎵 Song | A different song each day from your Spotify playlist |
| 3 | 📚 Vocabulary | 5 new words from the 500 most frequent in German |
| 4 | 📖 Quizlet | Reminder to add the words and review previous ones |
| 5 | 🦉 Duolingo | Direct link to your daily lesson |
| 6 | 🎬 DeutschTok | Consume German content on TikTok |

## Installing on iPhone

1. Open the app in Safari
2. Tap the share button (⬆)
3. Select "Add to Home Screen"
4. Installs as a native app with no browser bars

## Spotify setup

The app uses the PKCE flow (secure for browser apps, no credentials exposed).

**Required step in Spotify Developer Dashboard:**
1. Go to https://developer.spotify.com/dashboard
2. Open your app → Edit Settings
3. Under **Redirect URIs** add the URL where you serve the app:
   - Local: `http://localhost:8080/`
   - GitHub Pages: `https://YOUR_USERNAME.github.io/olgways-deutsch/`
4. Save and refresh the app
5. The first time you'll see a "Connect with Spotify" button — authenticate once and you won't need to again

## Deploy to GitHub Pages

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

Enable GitHub Pages in Settings → Pages → Branch: main

## Running locally

```bash
# With Python
python3 -m http.server 8080

# With Node
npx serve .
```

The app requires an HTTP server (opening the file directly won't work) because the Service Worker and Spotify API require HTTP/HTTPS.
