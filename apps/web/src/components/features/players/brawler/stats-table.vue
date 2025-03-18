<script setup lang="ts">
import type { PlayerBrawler } from "@brawltracker/brawl-stars-api";
import { getBrawlerTotalLevelPrice } from "$lib/utils/brawl-stars/max-calculator";

const props = defineProps<{
	playerBrawler: PlayerBrawler;
}>();

const playerBrawler = computed(() => props.playerBrawler);

const seasonTrophieContribution = computed(() => {
	if (!playerBrawler.value) return 0;
	const brawlerTrophies = playerBrawler.value.trophies;
	return brawlerTrophies <= 1000 ? 0 : 1000 - brawlerTrophies - 1000;
});

const progressToMax = computed(() => {
	if (!playerBrawler.value) return;

	const value = getBrawlerTotalLevelPrice({
		currentLevel: playerBrawler.value!.power,
		wantedLevel: 11,
		hypercharge: false,
		gadgets: playerBrawler.value!.gadgets.length > 0 ? 0 : 1,
		starPowers: playerBrawler.value!.starPowers.length > 0 ? 0 : 1,
		gears: {
			slot1: playerBrawler.value.gears.length >= 1 ? undefined : { price: 1000, type: "super_rare" },
			slot2:
				playerBrawler.value.gears.length < 1 && playerBrawler.value.gears.length >= 2
					? undefined
					: { price: 1000, type: "super_rare" },
		},
	});
	return { coins: value.coins, powerpoints: value.powerpoints };
});

const playerStats = [
	{
		stat: "Trophies",
		value: playerBrawler.value?.trophies,
		image: { src: "/icons/player/trophy.webp" },
		color: "text-(--ui-primary)! dark:text-(--ui-primary)-400!",
	},
	{
		stat: "Highest Trophies",
		value: playerBrawler.value?.highestTrophies,
		image: { src: "/icons/player/highest-trophies.png" },
		color: "text-blue-500! dark:text-blue-400!",
	},
	{
		stat: "Season Trophy Contribution",
		value: seasonTrophieContribution.value,
		image: { src: "/icons/player/season-trophy.png" },
		color: "text-cyan-500! dark:text-cyan-400!",
	},
	{
		stat: "Power Level",
		value: `Level ${playerBrawler.value?.power}`,
		image: { src: "/icons/player/power-level.svg" },
		color: "text-fuchsia-500! dark:text-fuchsia-400!",
	},
	{
		stat: "Coins to Max",
		value: progressToMax.value?.coins,
		image: { src: "/icons/coins.webp" },
		color: "text-yellow-500! dark:text-yellow-400!",
	},
	{
		stat: "Power Points to Max",
		value: progressToMax.value?.powerpoints,
		image: { src: "/icons/powerpoints.webp" },
		color: "text-pink-500! dark:text-pink-400!",
	},
	{
		stat: "# Of Gadgets",
		value: playerBrawler.value?.gadgets.length,
		image: { src: "/icons/player/brawler-powers/gadget.png" },
		color: "text-green-500! dark:text-green-400!",
	},
	{
		stat: "# Of Star Powers",
		value: playerBrawler.value?.starPowers.length,
		image: { src: "/icons/player/brawler-powers/starpower.png" },
		color: "text-amber-500! dark:text-amber-400!",
	},
	{
		stat: "# Of Gears",
		value: playerBrawler.value?.gears.length,
		image: { src: "/icons/player/brawler-powers/gear.png" },
		color: "text-sky-500! dark:text-sky-400!",
	},
];
</script>

<template>
	<PlayersStatTable title="Brawler Stats" :stats="playerStats" />
</template>
