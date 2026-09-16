/* 宝贝背单词小助手 — Service Worker（网络优先，离线可用） */
const CACHE = 'pw-v12';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.webmanifest',
  './js/data-l23.js',
  './js/data-l45.js',
  './js/data.js',
  './js/app.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      const scope = self.registration.scope;
      return Promise.all(ASSETS.map(u => {
        const abs = new URL(u, scope).href;
        // cache:'reload' 绕过 HTTP 缓存，确保预缓存拿到最新文件
        return fetch(new Request(abs, { cache: 'reload' }))
          .then(res => { if (res && res.ok) return c.put(abs, res); })
          .catch(() => {});
      }));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  let url;
  try { url = new URL(e.request.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  // 全部资源：网络优先，离线回退缓存
  e.respondWith(
    fetch(e.request).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request).then(hit => {
      if (hit) return hit;
      if (e.request.mode === 'navigate') return caches.match('./index.html');
      return new Response('', { status: 504, statusText: 'offline' });
    }))
  );
});
