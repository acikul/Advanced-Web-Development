import {
    del,
    entries
} from "https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm";

const filesToCache = [
    "/",
    "/404",
    "/offline",
    "manifest.json",
    "stylesheets/style.css",
    "assets/android-chrome-192x192.png",
    "assets/android-chrome-512x512.png",
    "assets/apple-touch-icon.png",
    "assets/favicon-16x16.png",
    "assets/favicon-32x32.png",
    "assets/favicon.ico",
    "js/geo.js",
    "js/add.js",
    "js/index.js",
    "js/push.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
];

const staticCache = "static-cache-p5";

self.addEventListener("install", (event) => {
    console.log("Attempting to install service worker and cache static assets");
    event.waitUntil(
        caches.open(staticCache).then((cache) => {
            return cache.addAll(filesToCache);
        }).catch((error) => {console.log("Error while caching: ", error)}) 
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activating…');

    var cacheKeeplist = ['static-cache-p5'];
  
    event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
});

self.addEventListener('fetch', (event) => {
    //cache then network
    event.respondWith(
        // Try the cache
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            // Try the network
            return fetch(event.request).then(function (response) {
                    if (response.status === 404) {
                        return caches.match('404');
                    }
                    return response
                })
                .catch(error => {
                    throw Error(error)
                });
        }).catch(function () {
            // If both fail, show a generic fallback:
            return caches.match('/offline');
        })
    );
});

self.addEventListener('sync', (event) => {
    console.log('Background sync!', event)
    if (event.tag == "sync-geocaches") {
        event.waitUntil(syncCaches())
    }
});

async function syncCaches() {
    entries().then((allEntries) => {
        allEntries.forEach((entry) => {
            let geocache = entry[1];
            let fData = {
                "latitude": geocache.lat,
                "longitude": geocache.long,
                "desc": geocache.desc
            }

            fetch("/geocaches", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fData)
            }).then(res => {
                if (res.ok) {
                    del(geocache.id)
                    console.log("Background sync completed successfully!")
                } else {
                    console.log(res)
                }
            }).catch((error) => {
                console.log(error)
            })
        })
    })
}

self.addEventListener("push", function (event) {
    console.log("push event", event);

    var data = { title: "title", body: "body", redirectUrl: "/" };

    if (event.data) {
        data = JSON.parse(event.data.text());
    }

    var options = {
        body: data.body,
        icon: "assets/android-chrome-192x192.png",
        badge: "assets/android-chrome-192x192.png",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        data: {
            redirectUrl: data.redirectUrl,
        },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});
