<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { normalizeNameToCdnName } from "@brawltracker/cdn";

const levelSelected = ref("1");

const { brawler } = useAttrs() as { brawler: BrawlApiBrawler };

const cdnName = computed(() => normalizeNameToCdnName(brawler.name));
const { data: cdnData } = await useFetch(`/api/brawlers/name/${cdnName.value}/data`);

const onLevelChange = (newLevel: string) => {
	levelSelected.value = newLevel;
};
</script>

<template>
	<div>
		<div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
			<BrawlerKitOverview
				class="col-span-1"
				:brawler="brawler"
				:level="levelSelected"
				@update-level="onLevelChange"
			/>
			<BrawlerKitRating :brawler="brawler" class="col-span-1" />
			<BrawlerKitAttack
				:brawler="brawler"
				class="col-span-1"
				:level="levelSelected"
				@update-level="onLevelChange"
			/>
			<BrawlerKitSuper
				:brawler="brawler"
				class="col-span-1"
				:level="levelSelected"
				@update-level="onLevelChange"
			/>
			<BrawlerKitHypercharge v-if="!!cdnData?.hypercharge" :brawler="brawler" />
		</div>

		<!-- divider with text in the middle -->
		<div class="mt-8 flex items-center gap-2">
			<div class="flex-1 border-t border-border"></div>
			<div class="text-sm text-muted-foreground">Gadgets, Star Powers & Gears</div>
			<div class="flex-1 border-t border-border"></div>
		</div>
		<div class="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2">
			<div class="rounded-lg border border-border p-4 shadow">
				<h2 class="text-2xl font-bold tracking-tight">Gadgets</h2>
				<BrawlerPowerCard :powers="brawler.gadgets" />
			</div>
			<div class="rounded-lg border border-border p-4 shadow">
				<h2 class="text-2xl font-bold tracking-tight">Star Powers</h2>
				<BrawlerPowerCard :powers="brawler.starPowers" />
			</div>
		</div>
	</div>
</template>
