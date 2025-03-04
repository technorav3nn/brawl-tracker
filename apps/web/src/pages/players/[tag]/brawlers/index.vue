<script setup lang="ts">
import { createGetCachedData } from "$lib/utils/nuxt";

const route = useRoute("players-tag-brawlers");
const nuxtApp = useNuxtApp();

const { data: player, status } = await useLazyFetch("/api/players", {
	getCachedData: createGetCachedData(nuxtApp, `players-${route.params.tag}`),
	query: { tag: route.params.tag },
	key: `players-${route.params.tag}`,
});
const { data: brawlers, status: brawlerStatus } = await useLazyFetch("/api/brawlers", {
	getCachedData: createGetCachedData(nuxtApp),
	key: "brawlers",
	transform: (d) => d.list.filter((brawler) => brawler.released),
});

const ownedBrawlers = computed(() => {
	if (!player.value || !brawlers.value) return [];
	return brawlers.value.filter((brawler) => player.value!.brawlers.some((owned) => owned.id === brawler.id));
});
</script>

<template>
	<div v-if="status === 'pending' || brawlerStatus === 'pending'">Loading...</div>
	<UDashboardSection
		v-if="status === 'success' && brawlerStatus === 'success'"
		class="divide-y-0"
		title="Brawlers"
		description="Select one of the players brawlers to view their stats"
		orientation="vertical"
	>
		<template #title>
			<div class="flex items-center flex-row gap-2">
				<p class="font-bold text-xl text-gray-800 dark:text-white">Brawlers</p>
				<p class="text-xl text-gray-800 dark:text-white dark:text-opacity-80 text-opacity-80">
					{{ ownedBrawlers.length }} / {{ brawlers!.length }}
				</p>
			</div>
		</template>
		<UPageGrid
			class="!pt-7"
			:ui="{ wrapper: 'xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-y-12' }"
		>
			<NuxtLink
				v-for="brawler in ownedBrawlers"
				:key="brawler.id"
				:to="`/players/${encodeURIComponent(route.params.tag)}/brawlers/${brawler.id}`"
			>
				<PlayersPlayerBrawler :brawler :playerBrawler="player!.brawlers.find((b) => b.id === brawler.id)!" />
			</NuxtLink>
		</UPageGrid>
	</UDashboardSection>
</template>
