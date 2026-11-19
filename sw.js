// Offline-Speicher für den Angelschein Trainer.
// Alle App-Dateien werden beim ersten Öffnen gespeichert. Danach startet die App
// sofort aus dem Speicher und holt neue Fassungen im Hintergrund nach.
// Bei Änderungen an der Dateiliste VERSION erhöhen.
const VERSION = 'angelschein-v1';
const DATEIEN = [
  './', 'index.html', 'fragen.js', 'manifest.webmanifest',
  'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png',
  'bilder/SFk_001.jpg',
  'bilder/SFk_002.jpg',
  'bilder/SFk_003.jpg',
  'bilder/SFk_004.jpg',
  'bilder/SFk_005.jpg',
  'bilder/SFk_006.jpg',
  'bilder/SFk_007.jpg',
  'bilder/SFk_008.jpg',
  'bilder/SFk_009.jpg',
  'bilder/SFk_010.jpg',
  'bilder/SFk_011.jpg',
  'bilder/SFk_012.jpg',
  'bilder/SFk_013.jpg',
  'bilder/SFk_014.jpg',
  'bilder/SFk_015.jpg',
  'bilder/SFk_016.jpg',
  'bilder/SFk_017.jpg',
  'bilder/SFk_018.jpg',
  'bilder/SFk_019.jpg',
  'bilder/SFk_020.jpg',
  'bilder/SFk_021.jpg',
  'bilder/SFk_022.jpg',
  'bilder/SFk_023.jpg',
  'bilder/SFk_024.jpg',
  'bilder/SFk_025.jpg',
  'bilder/SFk_026.jpg',
  'bilder/SFk_027.jpg',
  'bilder/SFk_028.jpg',
  'bilder/SFk_029.jpg',
  'bilder/SFk_030.jpg',
  'bilder/SFk_031.jpg',
  'bilder/SFk_032.jpg',
  'bilder/SFk_033.jpg',
  'bilder/SFk_034.jpg',
  'bilder/SFk_035.jpg',
  'bilder/SFk_036.jpg',
  'bilder/SFk_037.jpg',
  'bilder/SFk_038.jpg',
  'bilder/SFk_039.jpg',
  'bilder/SFk_040.jpg',
  'bilder/SFk_041.jpg',
  'bilder/SFk_042.jpg',
  'bilder/SFk_043.jpg',
  'bilder/SFk_044.jpg',
  'bilder/SFk_045.jpg',
  'bilder/SFk_046.jpg',
  'bilder/SFk_047.jpg',
  'bilder/SFk_048.jpg',
  'bilder/SFk_049.jpg',
  'bilder/SFk_050.jpg',
  'bilder/SFk_SH_051.jpg',
  'bilder/SFk_SH_052.jpg',
  'bilder/SFk_SH_053.jpg',
  'bilder/SFk_SH_054.jpg',
  'bilder/SFk_SH_055.jpg',
  'bilder/SFk_SH_056.jpg',
  'bilder/SFk_SH_057.jpg',
  'bilder/SFk_SH_058.jpg',
  'bilder/SFk_SH_059.jpg',
  'bilder/SFk_SH_060.jpg',
  'bilder/SFk_SH_061.jpg',
  'bilder/SFk_SH_062.jpg',
  'bilder/SFk_SH_063.jpg',
  'bilder/SFk_SH_064.jpg',
  'bilder/SFk_SH_065.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Aus dem Speicher antworten, gleichzeitig im Netz nach einer neueren Fassung fragen.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const eigen = url.origin === self.location.origin;
  const schrift = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!eigen && !schrift) return;
  const key = req.mode === 'navigate' ? 'index.html' : req;
  e.respondWith(
    caches.open(VERSION).then((c) =>
      c.match(key, { ignoreSearch: true }).then((cached) => {
        const netz = fetch(req).then((res) => {
          if (res && (res.ok || res.type === 'opaque')) c.put(key, res.clone());
          return res;
        }).catch(() => cached);
        if (cached) { e.waitUntil(netz); return cached; }
        return netz;
      })
    )
  );
});
