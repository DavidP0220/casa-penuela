// Casa Peñuela · cuenta del inquilino. Primero internet, y si no hay, lo último que se abrió (solo páginas e imágenes de este mismo sitio; nunca datos de nadie).
const V = 'cp-cuenta-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => { for (const k of await caches.keys()) if (k !== V) await caches.delete(k); await self.clients.claim(); })()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith((async () => {
    try { const res = await fetch(r); if (res.ok) { const copia = res.clone(); caches.open(V).then(c => c.put(r, copia)); } return res; }
    catch (err) { const m = await caches.match(r, { ignoreSearch: true }); if (m) return m; throw err; }
  })());
});
