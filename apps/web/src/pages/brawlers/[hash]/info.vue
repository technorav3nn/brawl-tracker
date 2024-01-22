<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";

const levelSelected = ref("1");

const { brawler } = useAttrs() as { brawler: BrawlApiBrawler };

const onLevelChange = (newLevel: string) => {
	levelSelected.value = newLevel;
};
</script>

<template>
	<div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
		<BrawlerKitAttack
			:brawler="brawler"
			class="col-span-1"
			:level="levelSelected"
			@update-level="onLevelChange"
		/>
		<BrawlerKitRating :brawler="brawler" class="col-span-1" />

		<div class="rounded-lg border border-border p-4 shadow">
			<h2 class="text-2xl font-bold tracking-tight">Gadgets</h2>
			<BrawlerPowerCard :powers="brawler.gadgets" />
		</div>
		<div class="rounded-lg border border-border p-4 shadow">
			<h2 class="text-2xl font-bold tracking-tight">Star Powers</h2>
			<BrawlerPowerCard :powers="brawler.starPowers" />
		</div>
	</div>
</template>
