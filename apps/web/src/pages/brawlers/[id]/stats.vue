<script setup lang="ts">
import type { BrawlApiMap } from "@brawltracker/brawl-api";
import { LazyBrawlerMapStatsMapSlideover } from "#components";
import { useBrawlerStore } from "$components/features/brawler/brawler-store";
import { useFilteredMapStore } from "$components/features/brawler-map-stats/filtered-map-store";

const slideover = useSlideover();
const brawlerStore = useBrawlerStore();
const { brawler } = storeToRefs(useBrawlerStore());

if (!brawler) {
	throw createError({ statusCode: 404, message: "Brawler not found" });
}

function openSlideover(map: BrawlApiMap) {
	slideover.close();
	slideover.open(LazyBrawlerMapStatsMapSlideover, { map, brawler: brawlerStore.brawler! });
}

const filterButtonId = useId();

const filteredMapStore = useFilteredMapStore();
const { filteredMaps, search } = storeToRefs(filteredMapStore);
const { data: maps } = await useFetch("/api/maps");

if (!maps.value) {
	throw createError({ statusCode: 404, message: "Maps not found" });
}

function openFilterMenu() {
	if (!document || import.meta.server) return;
	(document.querySelectorAll(`#${filterButtonId}`)[1] as HTMLButtonElement).click();
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
				<div class="flex gap-4 flex-row">
					<UButtonGroup class="sm:mt-4 min-w-40">
						<UInput v-model="search" size="md" color="white" class="w-full" placeholder="Search..." />
						<UButton icon="i-heroicons-magnifying-glass" size="md" color="gray" />
					</UButtonGroup>
					<UButtonGroup class="sm:mt-4">
						<BrawlerMapStatsMapFilterSelect :id="filterButtonId" />
						<UButton icon="i-heroicons-funnel" size="md" color="gray" class="rounded-none rounded-r-md" @click="openFilterMenu" />
					</UButtonGroup>
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
				v-for="map in filteredMaps"
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
