

//https://codelabs.developers.google.com/codelabs/offline/#6 
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('cache-test').then(function(cache) {
        return cache.addAll([
           '/',
          // '/img/5.svg',
          // '/img/7.svg',
          // '/img/11.svg',
          // '/img/13.svg',
          // '/img/17.svg',
          // '/img/19.svg',
          // '/img/21.svg',
          // '/img/22.svg',
          // '/img/24.svg',
          // '/img/26.svg',
          //  '/img/icon-512x512.png',
           '/index.html',
          // '/css/bootstrap.min.css',
          // '/css/fullpage.min.css',
          // '/css/style.css',
          // '/js/jquery-3.5.1.min.js',
          // '/js/fullpage.min.js',
          // '/js/scripts.js',
           '/manifest.webmanifest'
        ]);
      })
    );
   });
  
  //https://codelabs.developers.google.com/codelabs/offline/#7
  self.addEventListener('fetch', function(event) {
     console.log(event.request.url);
    event.respondWith(
    caches.match(event.request).then(function(response) {
    return response || fetch(event.request);
        })
        );
        });
  
  