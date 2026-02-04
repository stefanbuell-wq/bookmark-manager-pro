# Datenschutzerklärung - Bookmark Manager Pro

**Letzte Aktualisierung:** Februar 2024

## Überblick

Bookmark Manager Pro ist eine Browser-Erweiterung zur Verwaltung von Lesezeichen. Der Schutz Ihrer Daten hat für uns höchste Priorität.

## Welche Daten werden erhoben?

### Lokale Daten (auf Ihrem Gerät)
- **Lesezeichen-Tags:** Von Ihnen erstellte oder generierte Tags werden lokal im Browser gespeichert (chrome.storage)
- **Notizen:** Ihre persönlichen Notizen zu Lesezeichen werden lokal gespeichert
- **Einstellungen:** Ihre API-Schlüssel und Präferenzen werden lokal gespeichert

### Externe Dienste (optional)
- **Hugging Face API:** Wenn Sie die KI-Tag-Generierung nutzen, werden URL und Titel des Lesezeichens an die Hugging Face API gesendet. Dies geschieht nur, wenn Sie einen eigenen API-Schlüssel hinterlegt haben.

## Welche Daten werden NICHT erhoben?

- Wir sammeln **keine** persönlichen Daten
- Wir haben **keinen** eigenen Server
- Wir nutzen **keine** Tracking- oder Analyse-Dienste
- Wir verkaufen **keine** Daten an Dritte

## Berechtigungen

Die Erweiterung benötigt folgende Berechtigungen:

- **bookmarks:** Zugriff auf Ihre Browser-Lesezeichen zum Anzeigen und Verwalten
- **storage:** Lokales Speichern von Tags, Notizen und Einstellungen
- **tabs:** Zum Öffnen von Links
- **contextMenus:** Kontextmenü-Integration (optional)

## Datenspeicherung

Alle Daten werden ausschließlich lokal in Ihrem Browser gespeichert:
- Tags und Notizen: `chrome.storage.local`
- Einstellungen: `chrome.storage.sync` (kann über Chrome-Sync synchronisiert werden)

## Ihre Rechte

Sie können jederzeit:
- Alle gespeicherten Daten über die Browser-Einstellungen löschen
- Die Erweiterung deinstallieren (alle lokalen Daten werden gelöscht)
- Die KI-Funktion deaktivieren, indem Sie keinen API-Key eingeben

## Kontakt

Bei Fragen zum Datenschutz kontaktieren Sie uns unter:
**stefan.buell@buell-hamburg.de**

## Änderungen

Wir behalten uns vor, diese Datenschutzerklärung zu aktualisieren. Änderungen werden in der Erweiterung bekannt gegeben.
