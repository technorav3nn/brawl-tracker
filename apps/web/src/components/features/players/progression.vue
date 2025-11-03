<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import type { Player } from "@brawltracker/brawl-stars-api";

const props = defineProps<{
	brawlers: BrawlApiBrawler[];
	player: Player;
}>();

const { data: gears, status } = await useLazyFetch("/api/brawlers/gears");

const totalGears = computed(() => {
	if (!gears.value) return null;
	let total = props.brawlers.length * 6;
	for (const [_, gear] of Object.entries(gears.value!)) {
		if (!gear.brawlersAvaliableTo) continue;
		total += gear.brawlersAvaliableTo.length;
	}

	return total;
});

const ownedGears = computed(() => {
	if (!gears.value) return null;
	let total = 0;
	for (const brawler of props.player.brawlers) {
		total += brawler.gears.length;
	}

	return total;
});

const totalGadgetsAndStarPowers = computed(() => props.brawlers.length * 2);
const ownedGadgets = computed(() =>
	props.player.brawlers.reduce((acc, brawler) => {
		if (brawler.gadgets.length) {
			return acc + brawler.gadgets.length;
		}

		return acc;
	}, 0)
);
const ownedStarPowers = computed(() =>
	props.player.brawlers.reduce((acc, brawler) => {
		if (brawler.starPowers.length) {
			return acc + brawler.starPowers.length;
		}

		return acc;
	}, 0)
);
</script>

<template>
	<UPageGrid v-if="status === 'pending'">
		<USkeleton v-for="i in 5" :key="i" class="h-28 w-full" />
	</UPageGrid>
	<UPageGrid v-if="status === 'success'" class="gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
		<PlayersProgressionCard
			title="Brawlers Unlocked"
			image="/icons/player/unlocked.png"
			:value="player.brawlers.length"
			:max="brawlers.length!"
		/>

		<PlayersProgressionCard title="Gears" image="/icons/super-rare-gear.png" :value="ownedGears!" :max="totalGears!" />
		<PlayersProgressionCard
			title="Gadgets"
			image="/icons/powers/gadgets-fully-empty.png"
			:value="ownedGadgets!"
			:max="totalGadgetsAndStarPowers"
		/>
		<PlayersProgressionCard
			title="Star Powers"
			image="/icons/powers/starpowers-fully-empty.png"
			:value="ownedStarPowers!"
			:max="totalGadgetsAndStarPowers"
		/>
	</UPageGrid>
</template>
