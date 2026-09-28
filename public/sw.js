// Retire the old cache-first worker, including for visitors whose cached HTML
// cannot load the current application. Keep this URL available for updates.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await caches.delete('personal-homepage-v1')
    await self.registration.unregister()
    // Existing pages use the network on their next request: no fetch handler.
  })())
})
