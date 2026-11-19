# Angelschein Trainer SH – Web-Version

Web-Version der App mit dem amtlichen Fragenkatalog Schleswig-Holstein (549 Fragen, 65 Bildfragen).
Öffentliche Adresse (GitHub Pages): https://felixrein5046.github.io/
Zusätzlich als Claude-Artifact: https://claude.ai/artifact/692sATKtyjb9HKLYe7YyC4

- `index.html` – Oberfläche und Logik (lädt `fragen.js`), lokal im Browser lauffähig
- `fragen.js` – ERZEUGT von `../expo-app/tools/katalog_bauen.py --web ../web-sh` (nicht von Hand ändern)
- `bilder/` – 65 Fischabbildungen der Bildfragen (Bildnachweis laut Katalog: © DÄNEKAS GRAFIK. ILLUSTRATION)
- `dist/index.html` – Veröffentlichungsfassung mit eingebettetem `fragen.js` (wird zusammen mit `bilder/` als Artifact veröffentlicht)

Nach Änderungen an Lösungen oder Fragen (siehe `../expo-app/README.md`, Abschnitt 5) im Ordner `expo-app` ausführen:

```bash
python3 tools/katalog_bauen.py --web ../web-sh
```

und anschließend im Ordner `web-sh` die Änderung hochladen:

```bash
git add -A && git commit -m "Fragen aktualisiert" && git push
```

GitHub Pages veröffentlicht die neue Fassung nach wenigen Minuten automatisch.

## Auf dem iPhone wie eine App nutzen

1. https://felixrein5046.github.io/ in Safari öffnen.
2. Teilen-Symbol → „Zum Home-Bildschirm“.
3. Die App startet dann vom Home-Bildschirm; der Lernstand wird auf dem Gerät gespeichert.
