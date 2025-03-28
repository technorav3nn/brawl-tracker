<script setup lang="ts">
import type { BrawlApiMap } from "@brawltracker/brawl-api";
import { LazyBrawlerMapStatsMapSlideover, UiPageSection } from "#components";
import { useBrawlerStore } from "$components/features/brawler/brawler-store";
import { useFilteredMapStore } from "$components/features/brawler-map-stats/filtered-map-store";

const slideover = useOverlay();
const brawlerStore = useBrawlerStore();
const { brawler } = storeToRefs(useBrawlerStore());

if (!brawler) {
	throw createError({ statusCode: 404, message: "Brawler not found" });
}

function openSlideover(map: BrawlApiMap) {
	if (slideover.overlays[0]) slideover.close(slideover.overlays[0].id);
	slideover
		.create(LazyBrawlerMapStatsMapSlideover, {
			props: {
				map,
				brawler: brawlerStore.brawler!,
			},
		})
		.open();
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
		<UiPageSection
			title="Stats"
			description="Click or tap on a card to get a brawlers stats on a certain map."
			orientation="vertical"
		>
			<template #links>
				<div class="flex flex-row gap-4">
					<UButtonGroup class="min-w-40 sm:mt-4">
						<UInput v-model="search" size="md" variant="outline" class="w-full" placeholder="Search..." />
						<UButton icon="i-heroicons-magnifying-glass" size="md" color="neutral" variant="subtle" />
					</UButtonGroup>
					<UButtonGroup class="sm:mt-4">
						<BrawlerMapStatsMapFilterSelect :id="filterButtonId" />
						<UButton
							icon="i-heroicons-funnel"
							size="md"
							variant="subtle"
							color="neutral"
							class="rounded-none rounded-r-md"
							@click="openFilterMenu"
						/>
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
		</UiPageSection>

		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
			<UCard
				v-for="map in filteredMaps"
				:key="map.id"
				:ui="{ body: 'p-0!', header: 'px-4 py-3 sm:px-4' }"
				class="w-full hover:cursor-pointer hover:bg-neutral-100/50 hover:ring-2 hover:ring-primary-500 dark:hover:bg-neutral-800/50 dark:hover:ring-primary-400"
				@click="openSlideover(map)"
			>
				<template #header>
					<div class="flex items-center gap-2">
						<NuxtImg
							:src="map.gameMode.imageUrl"
							:alt="map.name"
							class="h-[30px] w-[30px] object-scale-down"
							width="30"
							height="30"
						/>
						<h1 class="text-md lg:text-md truncate font-semibold">{{ map.name }}</h1>
					</div>
				</template>
				<div class="mx-auto flex h-full items-center justify-center">
					<NuxtImg
						:src="map.imageUrl"
						:alt="map.name"
						class="w-full rounded-b-lg"
						width="200"
						:modifiers="map.gameMode.name === 'Brawl Ball' ? { extract: '85_132_500_785' } : { trim: '{}' }"
						:height="map.gameMode.name.includes('Showdown') ? 300 : 300"
						loading="lazy"
						provider="ipx"
					/>
				</div>
			</UCard>
		</div>
	</UPage>
</template>
