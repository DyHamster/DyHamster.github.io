// Only retire this application's legacy worker and cache.
export async function unregisterSW() {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      const legacyURL = new URL('/sw.js', window.location.origin).href
      await Promise.all(registrations.filter((registration) =>
        [registration.active, registration.waiting, registration.installing]
          .some((worker) => worker?.scriptURL === legacyURL),
      ).map((registration) => registration.unregister()))
    }
    if ('caches' in window) {
      await caches.delete('personal-homepage-v1')
    }
  } catch (error) {
    console.warn('Could not clear the legacy offline cache:', error)
  }
}
