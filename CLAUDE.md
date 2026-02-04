# Bookmark Manager - Projekt-Dokumentation

## Übersicht

Bookmark Manager ist eine Anwendung zur intelligenten Verwaltung von Browser-Lesezeichen. Das Projekt besteht aus zwei Komponenten:

1. **Desktop-App** (Electron) - Multi-Browser-Verwaltung mit Live-Sync
2. **Browser-Extension** (Chrome/Edge) - Native Bookmark-Integration

## Projektstruktur

```
BookmarkManager/
├── backend/                 # Node.js/Express Backend
│   ├── src/
│   │   ├── server.js       # Express Server (Port 4001)
│   │   ├── routes/
│   │   │   ├── bookmarks.js
│   │   │   └── live.js     # Live-Sync API
│   │   └── utils/
│   │       ├── ai.js       # Hugging Face Integration
│   │       ├── browserDetector.js
│   │       └── chromiumBookmarks.js
│   └── prisma/
│       └── schema.prisma   # SQLite Schema
│
├── frontend/               # React/Vite Frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── store/
│   │   │   └── live.js     # Zustand Store
│   │   └── components/
│   │       ├── SplashScreen.jsx
│   │       ├── BrowserSelector.jsx
│   │       ├── LiveBookmarkList.jsx
│   │       ├── LiveSearchBar.jsx
│   │       ├── LiveLinkChecker.jsx
│   │       └── EditLiveBookmarkModal.jsx
│   └── dist/               # Production Build
│
├── electron/               # Electron Main Process
│   ├── main.js
│   └── preload.js
│
├── extension/              # Browser Extension
│   ├── src/                # React Source
│   ├── public/
│   │   ├── manifest.json
│   │   └── background.js
│   ├── dist/               # Extension Build
│   └── store/              # Chrome Web Store Assets
│       ├── extension.zip
│       ├── PRIVACY_POLICY.md
│       ├── STORE_LISTING.md
│       └── screenshots/
│
└── dist-electron/          # Desktop App Build
    └── win-unpacked/
        └── Bookmark Manager.exe
```

## Technologie-Stack

### Desktop-App
- **Frontend:** React 18, Vite, Tailwind CSS, Zustand
- **Backend:** Node.js, Express, Prisma, SQLite
- **Desktop:** Electron 28
- **KI:** Hugging Face Inference API (Mistral-7B)

### Browser-Extension
- **UI:** React 18, Vite, Tailwind CSS
- **Storage:** chrome.storage API
- **Bookmarks:** chrome.bookmarks API
- **Background:** Service Worker (Manifest V3)

## Datenbank-Schema (Prisma)

```prisma
model BookmarkTag {
  id        Int      @id @default(autoincrement())
  url       String   @unique
  tags      String   // JSON array
  updatedAt DateTime @updatedAt
}

model BookmarkMeta {
  id        Int      @id @default(autoincrement())
  url       String   @unique
  notes     String?
  reason    String?  // "Warum gespeichert?"
  savedAt   DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## API-Endpunkte (Backend)

| Methode | Pfad | Beschreibung |
|---------|------|--------------|
| GET | /api/live/browsers | Erkannte Browser |
| POST | /api/live/select | Browser auswählen |
| GET | /api/live/bookmarks | Lesezeichen laden |
| POST | /api/live/bookmarks | Lesezeichen hinzufügen |
| PUT | /api/live/bookmarks/:id | Lesezeichen bearbeiten |
| DELETE | /api/live/bookmarks/:id | Lesezeichen löschen |
| GET | /api/live/tags | Alle Tags laden |
| POST | /api/live/tags | Tags speichern |
| GET | /api/live/meta | Metadaten laden |
| POST | /api/live/meta | Metadaten speichern |
| POST | /api/live/generate-tags | KI-Tags generieren |
| POST | /api/live/check-url | URL prüfen |

## Entwicklung

### Desktop-App starten
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

# Oder alles zusammen
npm run dev
```

### Extension bauen
```bash
cd extension
npm install
npm run build
# Ergebnis in extension/dist/
```

### Desktop-App bauen
```bash
npm run build:frontend
npm run build:electron
# Ergebnis in dist-electron/win-unpacked/
```

## Konfiguration

### Umgebungsvariablen (backend/.env)
```
DATABASE_URL="file:./dev.db"
HUGGINGFACE_API_KEY="hf_xxxxx"
```

## Kontakt

**Stefan Büll**
stefan.buell@buell-hamburg.de

## GitHub

https://github.com/stefanbuell-wq/bookmark-manager-pro
