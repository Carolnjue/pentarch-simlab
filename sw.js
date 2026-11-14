/* Pentarch SimLab service worker: works offline after a page has been visited once, and can save every lab
   for offline use on request (for students on limited data). */
const VERSION = 'simlab-v11';
const CORE = ['./', 'index.html', 'assets/css/simlab.css?v=23', 'assets/js/simlab.js?v=23',
  'https://cdn.jsdelivr.net/npm/lucide@0.460.0/dist/umd/lucide.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Pages: network first (fresh content), fall back to cache offline. Assets/libs/fonts: cache first, refresh in background.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isPage = req.mode === 'navigate' || (url.origin === location.origin && url.pathname.endsWith('.html'));
  const cacheable = url.origin === location.origin || /cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com|pentarchcommunications\.com\/wp-content/.test(url.host + url.pathname);
  if (!cacheable) return;
  if (isPage) {
    // Patchy data: if the network is slow (>3.5 s) and we have a saved copy, show the saved copy; the fresh one still updates the cache.
    const net = fetch(req).then(r => { if (r && r.ok) { const c = r.clone(); caches.open(VERSION).then(ca => ca.put(req, c)); } return r; });
    const cached = caches.match(req, { ignoreSearch: true });
    e.respondWith(new Promise(resolve => {
      let done = false; const fin = r => { if (!done && r) { done = true; resolve(r); } };
      const t = setTimeout(() => cached.then(fin), 3500);
      net.then(r => { clearTimeout(t); fin(r); }).catch(() => { clearTimeout(t); cached.then(r => fin(r || caches.match('index.html'))); });
    }));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) { const c = r.clone(); caches.open(VERSION).then(ca => ca.put(req, c)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});

// "Save all labs for offline": page sends {type:'save-all', urls:[...]}; we report progress back.
self.addEventListener('message', async e => {
  if (!e.data || e.data.type !== 'save-all') return;
  const urls = e.data.urls || [], c = await caches.open(VERSION);
  let done = 0;
  for (const u of urls) {
    try { await c.add(u); } catch (err) {}
    done++;
    e.source && e.source.postMessage({ type: 'save-progress', done, total: urls.length });
  }
});
