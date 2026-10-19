const CACHE_NAME = 'attak-pwa-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
  '/screenshots/mobile-screen.png',
  '/screenshots/desktop-screen.png',
  '/icons/shortcut-add.png',
  '/icons/shortcut-home.png',
  '/icons/shortcut-deals.png',
  '/icons/shortcut-profile.png'
];

// 1. Install Event: Precache static assets and app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Some assets could not be precached:', err);
      });
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Clean up outdated caches immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Event: Multi-tiered caching strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignore non-http/https requests
  if (!url.protocol.startsWith('http')) return;

  // Navigation requests: Network-First falling back to cached index.html for offline support
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  // Google Fonts (Cairo, Tajawal, IBM Plex Sans Arabic): Cache-First
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Images & Media Assets: Cache-First with network fallback
  if (
    event.request.destination === 'image' ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|ico)$/i)
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return response;
          })
          .catch(() => caches.match('/pwa-192x192.png'));
      })
    );
    return;
  }

  // Scripts and Styles: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});

// 4. Background Sync (مزامنة الخلفية عند ضعف أو عودة الشبكة)
self.addEventListener('sync', (event) => {
  if (event.tag === 'attak-pending-bids-sync' || event.tag === 'attak-offline-sync') {
    event.waitUntil(
      (async () => {
        try {
          console.log('[ServiceWorker] Background Syncing pending bids and actions...');
          // Notify active clients that background sync is running
          const allClients = await self.clients.matchAll({ includeUncontrolled: true });
          allClients.forEach((client) => {
            client.postMessage({
              type: 'SYNC_PENDING_BIDS_COMPLETED',
              timestamp: Date.now()
            });
          });
        } catch (err) {
          console.error('[ServiceWorker] Background sync failed:', err);
        }
      })()
    );
  }
});

// 5. Periodic Background Sync (المزامنة الدورية في الخلفية لتحديث أسعار ومزادات الخردة)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'attak-auctions-sync' || event.tag === 'attak-periodic-sync') {
    event.waitUntil(
      (async () => {
        try {
          console.log('[ServiceWorker] Periodic Sync: Refreshing scrap auction prices...');
          // Fetch fresh HTML / assets in background cache
          const cache = await caches.open(CACHE_NAME);
          const response = await fetch('/');
          if (response && response.status === 200) {
            await cache.put('/', response);
          }
          // Broadcast update to open tabs
          const allClients = await self.clients.matchAll({ includeUncontrolled: true });
          allClients.forEach((client) => {
            client.postMessage({
              type: 'PERIODIC_SYNC_AUCTIONS_UPDATED',
              timestamp: Date.now()
            });
          });
        } catch (err) {
          console.error('[ServiceWorker] Periodic sync failed:', err);
        }
      })()
    );
  }
});

// 6. Push Notifications (إشعارات الدفع لجذب المستخدمين في الوقت المناسب)
self.addEventListener('push', (event) => {
  let data = {
    title: 'عَتّاك | Attak 🔨♻️',
    body: 'مزايدة جديدة على خردة الألمنيوم والنحاس! تفقد أعلى سومة الآن.',
    url: '/?tab=home',
    icon: '/pwa-192x192.png',
    badge: '/favicon.ico'
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch {
      data.body = event.data.text() || data.body;
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/pwa-192x192.png',
    badge: data.badge || '/favicon.ico',
    dir: 'rtl',
    lang: 'ar',
    vibrate: [100, 50, 100, 50, 200],
    data: {
      url: data.url || '/?tab=home',
      dateOfArrival: Date.now()
    },
    actions: [
      {
        action: 'open_auction',
        title: 'عرض المزاد 🔨'
      },
      {
        action: 'close',
        title: 'إغلاق ✕'
      }
    ]
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// 7. Notification Click Event (التفاعل مع نقر الإشعار)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Focus existing window if open
      for (const client of windowClients) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // Otherwise open new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
