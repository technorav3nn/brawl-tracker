import { createGetCachedData } from "$lib/utils/nuxt";

export function useMeowApiPlayer() {
	const route = useRoute("players-tag");
	const nuxtApp = useNuxtApp();

	return useLazyFetch(`/api/players/${route.params.tag}/meow-api`, {
		key: `players-${route.params.tag}-meow-api`,
		dedupe: "defer",
		getCachedData: createGetCachedData(nuxtApp),
		server: false,
		timeout: 3500,
	});
}
