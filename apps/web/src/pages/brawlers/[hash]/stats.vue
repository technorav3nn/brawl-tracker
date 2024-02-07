<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { useBrawlerStatMapsStore } from "$components/features/maps/store";

const { brawler } = useAttrs() as { brawler: BrawlApiBrawler };

const { selectedMap, maps } = storeToRefs(useBrawlerStatMapsStore());
const { fetchMaps } = useBrawlerStatMapsStore();

await fetchMaps();
</script>

<template>
	<div>
		<div class="flex flex-row justify-between gap-4">
			<div class="flex flex-col gap-3">
				<UiInput placeholder="Search Maps..." class="w-min" />
				<div class="flex flex-wrap justify-center gap-3 sm:justify-start">
					<BrawlerStatsMapCard
						v-for="map in maps!.slice(0, 10)"
						:key="map.id"
						class="xs:flex-grow lg:flex-grow-0"
						:map="map"
					/>
				</div>
			</div>
			<div class="hidden lg:sticky lg:top-24 lg:block">
				<BrawlerStatsSelectedMapDesktop
					class="lg:sticky lg:top-24"
					:selectedMap="selectedMap!"
					:brawler="brawler"
				/>
			</div>
		</div>
	</div>
</template>
