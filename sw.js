/**
 * Service worker — makes NBackWeb an offline-capable PWA.
 * Precaches all static assets on install; navigations are network-first
 * (so updates arrive when online) with an offline cache fallback,
 * everything else is cache-first with runtime caching of anything missed.
 * Relative URLs keep it working under the GitHub Pages project subpath.
 */
const CACHE = 'nback-web-v1';

const ASSETS = [
  './',
  'index.html',
  'ux-lab.html',
  'manifest.webmanifest',
  'css/styles.css',
  'js/app.js',
  'js/pwa.js',
  'js/model/Round.js',
  'js/model/StimulusGenerator.js',
  'js/model/Storage.js',
  'js/model/Score.js',
  'js/viewmodel/GameViewModel.js',
  'js/viewmodel/SettingsViewModel.js',
  'js/viewmodel/HighScoreViewModel.js',
  'js/view/SettingsScreen.js',
  'js/view/GameScreen.js',
  'js/view/GridView.js',
  'js/view/SummaryScreen.js',
  'js/view/HomeScreen.js',
  'js/view/AudioView.js',
  'js/view/ScoresScreen.js',
  'js/ux-lab/themes.js',
  'js/ux-lab/gallery.js',
  'js/ux-lab/render.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) => cached || caches.match('index.html'))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
    )
  );
});
