import type { NuxtApp } from "#app";

export function createGetCachedData(nuxtApp: NuxtApp) {
	return (key: string) => nuxtApp.payload.data[key] || nuxtApp.static.data[key];
}
