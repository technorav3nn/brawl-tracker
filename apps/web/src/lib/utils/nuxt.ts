import type { NuxtApp } from "#app";

export function createGetCachedData(nuxtApp: NuxtApp, customKey?: string) {
	return (key: string) => nuxtApp.payload.data[customKey ? customKey : key] || nuxtApp.static.data[customKey ? customKey : key];
}
