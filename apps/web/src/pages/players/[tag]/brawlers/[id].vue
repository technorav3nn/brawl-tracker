<script setup lang="ts">
import { createGetCachedData } from "$lib/utils/nuxt";

const nuxtApp = useNuxtApp();
const route = useRoute("players-tag-brawlers-id");

const { data: player, status } = await useLazyFetch("/api/players", {
	getCachedData: createGetCachedData(nuxtApp, `players-${route.params.tag}`),
	query: { tag: route.params.tag },
	key: `players-${route.params.tag}`,
});

const { data: brawler, status: brawlerStatus } = await useLazyFetch("/api/brawlers", {
	getCachedData: createGetCachedData(nuxtApp),
	key: "brawlers",
	transform: (d) => d.list.find((brawler) => brawler.id.toString() === route.params.id),
});
</script>

<template>
	<div v-if="status === 'pending'">Loading...</div>
	<UButton variant="link" icon="i-heroicons-chevron-double-left-20-solid" :to="`/players/${route.params.tag}/brawlers`">
		Go Back
	</UButton>
</template>
