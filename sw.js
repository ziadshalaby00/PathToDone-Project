const CACHE_NAME = "path-to-done-v13";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./index.css",
  "./index.js",

  "./secondpage.html",
  "./secondpage.css",
  "./secondpage.js",

  "./thirdpage.html",
  "./thirdpage.css",
  "./thirdpage.js",

  "./site.webmanifest",
  "./theme.js",

  "./favicon/android-chrome-192x192.png",
  "./favicon/android-chrome-512x512.png",
  "./favicon/favicon.ico",

  "./material-symbols-outlined.woff2"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(
        FILES_TO_CACHE.map(url =>
          fetch(url).then(res => {
            if (res.ok && !res.redirected) {
              return cache.put(url, res);
            }
            console.warn("Skipped caching (redirected or failed):", url);
          }).catch(err => console.warn("Failed to fetch:", url, err))
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached && !(event.request.mode === "navigate" && cached.redirected)) {
        return cached;
      }
      return fetch(event.request)
        .then(response => {
          if ((response.ok || response.type === "opaque") && !response.redirected) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached || caches.match("./index.html"));
    })
  );
});