<script setup lang="ts">
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";
import { createGetCachedData } from "$lib/utils/nuxt";

const route = useRoute("players-tag");
const { tag } = route.params;

const nuxtApp = useNuxtApp();
const { data: meowApiData, status } = await useLazyFetch(`/api/players/${tag}/meow-api`, {
	key: `players-${tag}-meow-api`,
	dedupe: "defer",
	getCachedData: createGetCachedData(nuxtApp),
	server: false,
});

const RANK_TO_COLOR: Record<number, string> = {
	// 1, 2, 3: Bronze I, II, III
	1: "text-orange-500! dark:text-orange-400! text-base",
	2: "text-orange-500! dark:text-orange-400! text-base",
	3: "text-orange-500! dark:text-orange-400! text-base",
	// 4, 5, 6: Silver I, II, III
	4: "text-gray-500! dark:text-gray-400! text-base",
	5: "text-gray-500! dark:text-gray-400! text-base",
	6: "text-gray-500! dark:text-gray-400! text-base",
	// 7, 8, 9: Gold I, II, III
	7: "text-yellow-500! dark:text-yellow-400! text-base",
	8: "text-yellow-500! dark:text-yellow-400! text-base",
	9: "text-yellow-500! dark:text-yellow-400! text-base",
	// 10, 11, 12: Diamond I, II, III
	10: "text-blue-500! dark:text-blue-400! text-base",
	11: "text-blue-500! dark:text-blue-400! text-base",
	12: "text-blue-500! dark:text-blue-400! text-base",
	// Mythic
	13: "text-purple-500! dark:text-purple-400! text-base",
	14: "text-purple-500! dark:text-purple-400! text-base",
	15: "text-purple-500! dark:text-purple-400! text-base",
	// Legendary
	16: "text-red-500! dark:text-red-400! text-base",
	17: "text-red-500! dark:text-red-400! text-base",
	18: "text-red-500! dark:text-red-400! text-base",
	// Masters
	19: "text-amber-500! dark:text-amber-400! text-base",
	20: "text-amber-500! dark:text-amber-400! text-base",
	21: "text-amber-500! dark:text-amber-400! text-base",
	// Pro
	22: "text-green-500! dark:text-green-400! text-base",
};

const rankIcon = computed(() => {
	if (!meowApiData.value) return;
	const { currentRankedRank } = meowApiData.value;
	return `${CDN_URL_V2}/brawlify/ranked/tiered/${58000000 + (currentRankedRank ?? 0)}.png`;
});

const highestRankIcon = computed(() => {
	if (!meowApiData.value) return;
	const { highestRankedRank } = meowApiData.value;
	return `${CDN_URL_V2}/brawlify/ranked/tiered/${58000000 + (highestRankedRank ?? 0)}.png`;
});

const stats = computed(() =>
	meowApiData.value
		? [
				{
					stat: "Current Rank",
					value: "",
					image: { src: "/icons/ranked/ranked-belt-tilted.png", class: "size-[40px] object-scale-down" },
					// valueImage: rankIcon.value,
					// valueImageWidth: 25,
					// valueImageHeight: 25,
					// valueImageClass: "size-[40px] object-scale-down",
					valueImage: {
						src: rankIcon.value,
						width: 25,
						height: 25,
						class: "size-[40px] object-scale-down",
					},
				},
				{
					stat: "Current Elo",
					value: meowApiData.value?.currentRankedElo ?? "N/A",
					color: RANK_TO_COLOR[meowApiData.value?.currentRankedRank ?? 0],
					image: { src: "/icons/ranked/ranked-belt-tilted.png", class: "size-[40px] object-scale-down" },
				},
				{
					stat: "Highest Rank",
					value: "",
					valueImage: {
						src: highestRankIcon.value,
						width: 25,
						height: 25,
						class: "size-[40px] object-scale-down",
					},
					image: { src: "/icons/ranked/ranked-starr-drop.png", class: "size-[40px] object-scale-down" },
					// valueImage: highestRankIcon.value,
					// valueImageWidth: 25,
					// valueImageHeight: 25,
					// valueImageClass: "size-[40px] object-scale-down",
				},
				{
					stat: "Highest Elo",
					value: meowApiData.value?.highestRankedElo ?? "N/A",
					color: RANK_TO_COLOR[meowApiData.value?.highestRankedRank ?? 0],
					image: { src: "/icons/ranked/ranked-starr-drop.png", class: "size-[40px] object-scale-down" },
				},
			]
		: []
);
</script>

<template>
	<PlayersStatTable :loading="status === 'pending'" title="Ranked Stats" :stats />
</template>
