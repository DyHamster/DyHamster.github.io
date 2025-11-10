/// <reference types="vite/client" />

const CACHE_NAME = 'personal-homepage-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
]

// 安装事件 - 缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// 获取事件 - 缓存优先策略
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果缓存中有，直接返回缓存
      if (response) {
        return response
      }

      // 否则从网络获取
      return fetch(event.request).then((response) => {
        // 检查是否有效的响应
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        // 克隆响应
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    })
  )
})

// 消息事件 - 更新缓存
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})