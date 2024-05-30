<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { useBrawlerMapStore } from "$components/features/brawler/stats/store";

const { brawler } = useAttrs() as { brawler: BrawlApiBrawler };

const { selectedMap, maps, sheetOpen } = storeToRefs(useBrawlerMapStore());
const { fetchMaps, setBrawler } = useBrawlerMapStore();

watchEffect(() => {
	setBrawler(brawler);
});

await fetchMaps();
</script>

<template>
	<div>
		<BrawlerStatsMobileSelectedSheet v-model:open="sheetOpen" />
		<div class="flex flex-row justify-between gap-4">
			<div class="flex flex-col gap-3">
				<UiInput placeholder="Search Maps..." class="w-min" />
				<div class="flex flex-wrap justify-center gap-3 sm:justify-start">
					<BrawlerStatsMapCard
						v-for="map in maps!.slice(0, 10)"
						:key="map.id"
						class="flex-grow lg:flex-grow-0"
						:map="map"
					/>
				</div>
			</div>
			<div class="hidden lg:sticky lg:top-24 lg:block">
				<BrawlerStatsSelectedMap
					:imageSize="300"
					class="lg:sticky lg:top-24"
					:selectedMap="selectedMap!"
					:brawler="brawler"
				/>
			</div>
		</div>
	</div>
</template>
