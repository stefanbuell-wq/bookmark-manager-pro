# Bookmark Manager - Backlog

## Abgeschlossen ✅

### Desktop-App
- [x] Browser-Erkennung (Vivaldi, Chrome, Edge, Brave, Opera)
- [x] Live-Sync mit Browser-Bookmark-Dateien
- [x] Lesezeichen anzeigen, bearbeiten, löschen
- [x] Batch-Operationen (Mehrfachauswahl, Batch-Delete)
- [x] Ordner-Filter mit Unterordner-Support
- [x] Tag-System mit Speicherung in SQLite
- [x] KI-Tag-Generierung (Hugging Face API)
- [x] Tag-Filter und Sortierung
- [x] Volltextsuche (Titel, URL, Notizen, Tags)
- [x] Erweiterte Filter (Domain, Datum, Regex)
- [x] Tote-Links-Finder mit Batch-Delete
- [x] Notizen & "Warum gespeichert?" Feld
- [x] Zeitstempel (Erstellt/Geändert)
- [x] Splash-Screen mit Animation
- [x] Browser-Präferenz für Link-Öffnung
- [x] Kontakt-Info (Email)
- [x] Electron Desktop-Build (Portable)
- [x] Anleitung (ANLEITUNG.txt)

### Browser-Extension
- [x] Manifest V3 kompatibel
- [x] Popup mit Lesezeichen-Liste
- [x] Suche über alle Felder
- [x] Tag-Verwaltung
- [x] KI-Tag-Generierung
- [x] Notizen & Reason-Feld
- [x] Tote-Links-Finder
- [x] Einstellungsseite (API-Key)
- [x] Chrome Web Store Assets
- [x] Datenschutzerklärung
- [x] GitHub Repository

---

## Offen / Ideen 💡

### Hohe Priorität
- [ ] Chrome Web Store Veröffentlichung (wartet auf Kreditkarte)
- [ ] Firefox Extension (manifest v2/v3 kompatibel)
- [ ] Edge Add-ons Store Veröffentlichung

### Features
- [ ] Lesezeichen-Export (JSON, HTML, CSV)
- [ ] Lesezeichen-Import aus Datei
- [ ] Duplikat-Finder (gleiche URLs)
- [ ] Favicon-Anzeige
- [ ] Lesezeichen-Vorschau (Screenshot/Meta)
- [ ] Ordner erstellen/umbenennen/verschieben
- [ ] Drag & Drop Sortierung
- [ ] Tastenkürzel (Keyboard Shortcuts)
- [ ] Dark Mode
- [ ] Mehrsprachigkeit (i18n)

### Sync & Backup
- [ ] Cloud-Sync (optional)
- [ ] Automatische Backups
- [ ] Backup-Wiederherstellung
- [ ] Export/Import der Tags & Notizen

### KI-Erweiterungen
- [ ] Automatische Kategorisierung
- [ ] Ähnliche Lesezeichen finden
- [ ] Zusammenfassungen generieren
- [ ] Verbesserter lokaler Fallback

### Performance
- [ ] Virtualisierte Liste für viele Lesezeichen
- [ ] Lazy Loading für große Sammlungen
- [ ] Caching für schnellere Suche

### UI/UX
- [ ] Kompaktansicht / Listenansicht
- [ ] Benutzerdefinierte Farbcodes für Tags
- [ ] Statistiken Dashboard
- [ ] Onboarding-Tour für neue Nutzer

---

## Bekannte Einschränkungen

- Desktop-App: Browser muss geschlossen sein für konfliktfreies Schreiben
- Extension: Nur der aktuelle Browser (kein Multi-Browser)
- KI-Tags: Benötigt Internet & API-Key
- Tote-Links: Manche Sites blockieren HEAD-Requests (false positives)

---

## Versionsverlauf

### v1.0.0 (2024-02)
- Initiale Version
- Desktop-App + Browser-Extension
- Alle Kernfunktionen implementiert
