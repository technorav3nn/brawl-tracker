<script setup lang="ts">
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";

const route = useRoute("players-tag");
const { data: player, status } = useLazyQuery(playersRntApiDetailQuery(route.params.tag));

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

const currentRankedRank = computed(() => {
	if (!player.value) return 0;
	const { stats } = player.value;
	return stats.find((s) => s.name === "CurrentRanked")?.value ?? 0;
});
const currentRankedElo = computed(() => {
	if (!player.value) return 0;
	const { stats } = player.value;
	return stats.find((s) => s.name === "CurrentRankedPoints")?.value ?? "N/A";
});
const highestRankedRank = computed(() => {
	if (!player.value) return 0;
	const { stats } = player.value;
	return stats.find((s) => s.name === "HighestRanked")?.value ?? 0;
});
const highestRankedElo = computed(() => {
	if (!player.value) return 0;
	const { stats } = player.value;
	return stats.find((s) => s.name === "HighestRankedPoints")?.value ?? "N/A";
});

const rankIcon = computed(() => {
	if (!player.value) return;
	return `${CDN_URL_V2}/brawlify/ranked/tiered/${58000000 + (currentRankedRank.value ?? 0)}.png`;
});

const highestRankIcon = computed(() => {
	if (!player.value) return;
	return `${CDN_URL_V2}/brawlify/ranked/tiered/${58000000 + (highestRankedRank.value ?? 0)}.png`;
});

const stats = computed(() => [
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
		value: currentRankedElo.value,
		color: RANK_TO_COLOR[currentRankedRank.value],
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
		value: highestRankedElo.value ?? "N/A",
		color: RANK_TO_COLOR[highestRankedRank.value],
		image: { src: "/icons/ranked/ranked-starr-drop.png", class: "size-[40px] object-scale-down" },
	},
]);
</script>

<template>
	<PlayersStatTable :loading="status === 'pending'" title="Ranked Stats" :stats />
</template>
