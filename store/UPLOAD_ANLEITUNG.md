# Chrome Web Store - Upload Anleitung

## Voraussetzungen

1. **Google Developer Account**
   - Einmalige Registrierungsgebühr: $5 USD
   - Registrierung: https://chrome.google.com/webstore/devconsole/

2. **Benötigte Dateien** (alle im `store/` Ordner):
   - ✅ `extension.zip` - Die Erweiterung
   - ✅ `PRIVACY_POLICY.md` - Datenschutzerklärung
   - ✅ `STORE_LISTING.md` - Store-Beschreibung

3. **Benötigte Bilder** (müssen noch erstellt werden):
   - 📷 Icon 128x128 px (PNG)
   - 📷 Screenshot 1280x800 oder 640x400 px (mind. 1, max. 5)
   - 📷 Promotional Tile 440x280 px (optional)

---

## Schritt-für-Schritt Anleitung

### 1. Developer Console öffnen
https://chrome.google.com/webstore/devconsole/

### 2. Neue Erweiterung hinzufügen
- Klicke auf **"+ Neues Element"**
- Lade `store/extension.zip` hoch

### 3. Store-Eintrag ausfüllen

**Produkt-Details:**
- Name: `Bookmark Manager Pro`
- Beschreibung: (siehe STORE_LISTING.md)
- Kategorie: `Produktivität`
- Sprache: `Deutsch`

**Grafiken:**
- Lade Screenshots hoch (mindestens 1)
- Lade das 128x128 Icon hoch

**Datenschutz:**
- Datenschutzrichtlinie URL eingeben
  (Oder Text aus PRIVACY_POLICY.md auf einer Website hosten)
- "Single Purpose" beschreiben:
  "Verwaltung und Organisation von Browser-Lesezeichen mit Tags und Notizen"

### 4. Berechtigungen begründen

| Berechtigung | Begründung |
|--------------|------------|
| bookmarks | Kernfunktion: Lesezeichen anzeigen und verwalten |
| storage | Tags, Notizen und Einstellungen lokal speichern |
| tabs | Links in neuen Tabs öffnen |
| contextMenus | Rechtsklick-Menü für schnelles Taggen |
| host_permissions | KI-Tag-Generierung via Hugging Face API |

### 5. Einreichen
- Klicke auf **"Zur Überprüfung einreichen"**
- Überprüfung dauert normalerweise 1-3 Werktage

---

## Wichtige Hinweise

### Datenschutz-URL
Du brauchst eine öffentlich zugängliche URL für die Datenschutzerklärung.
Optionen:
- GitHub Gist
- GitHub Repository (README)
- Eigene Website

### Screenshots erstellen
1. Öffne die Erweiterung in Chrome
2. Mache Screenshots (Windows: Win+Shift+S)
3. Empfohlene Screenshots:
   - Hauptansicht mit Lesezeichen
   - Tag-Bearbeitung
   - Tote-Links-Finder
   - Einstellungsseite

### Nach der Veröffentlichung
- Nutzer-Feedback beobachten
- Bei Problemen schnell Updates bereitstellen
- Version in manifest.json erhöhen bei Updates

---

## Dateien

```
extension/store/
├── extension.zip        ← Hochladen in Chrome Web Store
├── PRIVACY_POLICY.md    ← Auf Website/GitHub hosten
├── DATENSCHUTZ.md       ← Deutsche Version
├── STORE_LISTING.md     ← Texte für Store-Eintrag
└── UPLOAD_ANLEITUNG.md  ← Diese Datei
```

---

## Support

Bei Fragen: stefan.buell@buell-hamburg.de
