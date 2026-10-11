// Keeps Skyline Stack playable without a connection.
// The page itself is network-first so updates show up right away; everything else
// (icons, fonts) is served from the cache and refreshed in the background.
// Online high scores always go to the network.
const CACHE = 'skyline-stack-v2';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './apple-touch-icon.png', './favicon-32.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    // Always ask the server for the newest page; GitHub Pages lets browsers reuse it for 10 minutes otherwise.
    const network = fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); }
      return res;
    }).catch(() => caches.match('./index.html'));
    // On a slow connection, don't keep the player waiting: fall back to the saved copy after 3 seconds.
    const slow = new Promise(r => setTimeout(r, 3000)).then(() => caches.match('./index.html')).then(hit => hit || network);
    e.respondWith(Promise.race([network, slow]));
    return;
  }

  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== self.location.origin && !fonts) return;
  e.respondWith(caches.match(req).then(hit => {
    const fresh = fetch(req).then(res => {
      // The font stylesheet comes back opaque (cross-site, no CORS), which is fine to keep.
      if (res.ok || (fonts && res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || fresh;
  }));
});
