<script setup lang="ts">
import type { BrawlApiMap } from "@brawltracker/brawl-api";
import { BrawlerMapStatsMapSlideover } from "#components";
import { useBrawlerStore } from "$components/features/brawler/brawler-store";
import { useFilteredMapStore } from "$components/features/brawler-map-stats/filtered-map-store";

const slideover = useSlideover();
const brawlerStore = useBrawlerStore();

if (!brawlerStore.brawler) {
	throw createError({ statusCode: 404, message: "Brawler not found" });
}

function openSlideover(map: BrawlApiMap) {
	slideover.close();
	slideover.open(BrawlerMapStatsMapSlideover, { map, brawler: brawlerStore.brawler! });
}

const { brawler } = storeToRefs(useBrawlerStore());
const filteredMapStore = useFilteredMapStore();
const { filteredMaps } = storeToRefs(filteredMapStore);
const { data: maps } = await useFetch("/api/maps");

watchEffect(() => console.log("filtered: ", filteredMaps.value));

if (!maps.value) {
	throw createError({ statusCode: 404, message: "Maps not found" });
}

filteredMapStore.setInitialMaps(maps.value);
filteredMapStore.setFilteredMaps(maps.value);
</script>

<template>
	<UPage v-if="brawler">
		<UDashboardSection
			title="Stats"
			description="Click or tap on a card to get a brawlers stats on a certain map."
			orientation="vertical"
		>
			<template #links>
				<div class="space-x-4">
					<UButtonGroup class="sm:mt-4 min-w-40">
						<UInput size="md" color="white" class="w-full" placeholder="Search..." />
						<UButton icon="i-heroicons-magnifying-glass" size="md" color="gray" />
					</UButtonGroup>
					<BrawlerMapStatsMapFilterSelectNew class="inline-block" />
					<!--
 <UButtonGroup class="sm:mt-4 min-w-40">
						<USelectMenu
							v-model="selectedSort"
							:options="SORT_OPTIONS"
							size="md"
							color="white"
							class="w-full"
							placeholder="Sort Maps..."
						/>
						<UButton
							:icon="sortDirectionIcon"
							size="md"
							color="gray"
							@click="sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'"
						/>
					</UButtonGroup> 
-->
				</div>
			</template>
		</UDashboardSection>

		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
			<UCard
				v-for="map in filteredMapStore.filteredMaps"
				:key="map.id"
				v-memo="[map]"
				:ui="{ body: { base: '!p-0  ' }, header: { padding: 'px-4 py-3 sm:px-4' } }"
				class="w-full hover:cursor-pointer hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
				@click="openSlideover(map)"
			>
				<template #header>
					<div class="flex gap-2 items-center">
						<NuxtImg :src="map.gameMode.imageUrl" :alt="map.name" class="object-scale-down" width="30" height="30" />
						<h1 class="text-md lg:text-md font-semibold truncate">{{ map.name }}</h1>
					</div>
				</template>
				<div class="flex items-center justify-center h-full mx-auto">
					<NuxtImg
						:src="map.imageUrl"
						:alt="map.name"
						class="w-full rounded-b-lg"
						width="200"
						:modifiers="map.gameMode.name === 'Brawl Ball' ? { extract: '85_132_500_785' } : { trim: '{}' }"
						:height="map.gameMode.name.includes('Showdown') ? 300 : 300"
						loading="lazy"
					/>
				</div>
			</UCard>
		</div>
	</UPage>
</template>
