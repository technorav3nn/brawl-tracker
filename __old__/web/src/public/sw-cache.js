const noErrorAssets = ["https://brawlify.com/ads.txt", "https://brawlify.com/special/ads"];
const cacheStorageName = "cache-brawltrack";
self.addEventListener("activate", (e) => {
	self.skipWaiting();
	e.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== cacheStorageName) {
						return caches.delete(cache);
					}
				})
			);
		})
	);
});
self.addEventListener("fetch", (e) => {
	if (
		e.request.url.startsWith("https://cdn.brawlify.com") ||
		e.request.url.startsWith("https://cdn-old.brawlify.com") ||
		e.request.url.startsWith("https://cdn.brawlapi.com")
	) {
		e.respondWith(
			caches.open(cacheStorageName).then(async (cache) => {
				const response = await cache.match(e.request);
				return (
					response ||
					fetch(e.request).then((res) => {
						cache.put(e.request, res.clone());
						return res;
					})
				);
			})
		);
	} else if (
		e.request.url.startsWith(self.location.origin) ||
		e.request.url.startsWith("https://api.brawlapi.com")
	) {
		e.respondWith(
			fetch(e.request)
				.then((res) => {
					const resClone = res.clone();
					caches.open(cacheStorageName).then((cache) => {
						cache.put(e.request, resClone);
					});
					return res;
				})
				.catch((err) =>
					caches.match(e.request).then((res) => {
						if (res) return res;
						else if (
							!noErrorAssets.includes(e.request.url) ||
							!e.request.url.startsWith("https://api.brawlapi.com")
						)
							return caches.match("/errors/cache-missing");
					})
				)
		);
	}
});
