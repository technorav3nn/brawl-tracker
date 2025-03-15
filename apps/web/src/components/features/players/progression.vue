<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import type { Gear, Player } from "@brawltracker/brawl-stars-api";
import { getBrawlerTotalLevelPrice, type GearSlot } from "$lib/utils/brawl-stars/max-calculator";

const props = defineProps<{
	brawlers: BrawlApiBrawler[];
	player: Player;
}>();

const { data: gears, status } = await useFetch("/api/brawlers/gears");

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

const valuesToMax = computed(() => {
	let coins = 0;
	let powerpoints = 0;
	for (const _ of props.brawlers) {
		const price = getBrawlerTotalLevelPrice({
			starPowers: 2,
			gadgets: 2,
			currentLevel: 1,
			wantedLevel: 11,
			gears: {
				slot1: { type: "super_rare", price: 1000 },
				slot2: { type: "super_rare", price: 1000 },
			},
		});
		coins += price.coins;
		powerpoints += price.powerpoints;
	}

	return { coins, powerpoints };
});

function isSuperRareGear(gear: Gear) {
	return (
		gear.name === "DAMAGE" ||
		gear.name === "HEALTH" ||
		gear.name === "SPEED" ||
		gear.name === "VISION" ||
		gear.name === "GADGET COOLDOWN" ||
		gear.name === "SHIELD"
	);
}

const ownedValues = computed(() => {
	let coins = 0;
	let powerpoints = 0;
	for (const brawler of props.player.brawlers) {
		const gears = brawler.gears.filter(isSuperRareGear).map(() => ({ type: "super_rare", price: 1000 }) satisfies GearSlot);
		const price = getBrawlerTotalLevelPrice({
			starPowers: brawler.starPowers.length,
			gadgets: brawler.gadgets.length,
			currentLevel: brawler.power,
			wantedLevel: 11,
			gears: { slot1: gears[0], slot2: gears[1] },
		});
		coins += price.coins;
		powerpoints += price.powerpoints;
	}

	return { coins, powerpoints };
});
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
		<PlayersProgressionCard title="Coins To Max" image="/icons/coins.webp" :value="ownedValues.coins" :max="valuesToMax.coins" />
		<PlayersProgressionCard
			title="Power Points To Max"
			image="/icons/powerpoints.webp"
			:value="ownedValues.powerpoints"
			:max="valuesToMax.powerpoints"
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
