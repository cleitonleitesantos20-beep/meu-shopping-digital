const CACHE_NAME = 'atibaia-shop-v1';
const assets = [
  '/',
  '/index.html',
  '/painel.html',
  '/loja.html'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Resposta às requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Escuta notificações push
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nova oferta em Atibaia!',
    icon: 'https://cdn-icons-png.flaticon.com/512/2331/2331970.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/2331/2331970.png'
  };
  event.waitUntil(
    self.registration.showNotification('Shopping Atibaia', options)
  );
});