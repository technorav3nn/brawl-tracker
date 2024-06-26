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
			<BrawlerInfoKitOverview
				class="col-span-1"
				:brawler="brawler"
				:level="levelSelected"
				@update-level="onLevelChange"
			/>
			<BrawlerInfoKitRating :brawler="brawler" class="col-span-1" />
			<BrawlerInfoKitAttack
				:brawler="brawler"
				class="col-span-1"
				:level="levelSelected"
				@update-level="onLevelChange"
			/>
			<BrawlerInfoKitSuper
				:brawler="brawler"
				class="col-span-1"
				:level="levelSelected"
				@update-level="onLevelChange"
			/>
			<BrawlerInfoKitHypercharge v-if="!!cdnData?.hypercharge" :brawler="brawler" />
		</div>

		<!-- divider with text in the middle -->
		<div class="mt-8 flex items-center gap-2">
			<div class="flex-1 border-t border-border" />
			<div class="text-sm text-muted-foreground">Gadgets, Star Powers & Gears</div>
			<div class="flex-1 border-t border-border" />
		</div>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<div class="rounded-lg border border-border p-4 shadow md:flex-1">
				<h2 class="text-2xl font-bold tracking-tight">Gadgets</h2>
				<BrawlerInfoPowerCard :powers="brawler.gadgets" type="gadgets" />
			</div>
			<div class="w-full rounded-lg border border-border p-4 shadow md:flex-1">
				<h2 class="text-2xl font-bold tracking-tight">Star Powers</h2>
				<BrawlerInfoPowerCard :powers="brawler.starPowers" type="starpowers" />
			</div>
			<BrawlerInfoGearsCard :brawlerId="brawler.id" />
		</div>
	</div>
</template>
