<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
const route = useRoute("maps-map");
const { data: map } = await useFetch(`/api/maps/${route.params.map}`);
const { data: events } = await useFetch(`/api/events/rotation`);
const { data: brawlers } = await useFetch(`/api/brawlers`);

const { SORT_OPTIONS, setMap, setBrawlers } = useMapStatFilterStore();
const { search, sort, brawlerStats } = storeToRefs(useMapStatFilterStore());

watchEffect(() => {
	setMap(map.value!);
	setBrawlers(brawlers.value!);
});

const activeEvents = computed(() => events.value?.active);
const mapIsActive = computed(() =>
	Boolean(activeEvents.value?.find((event) => event.map.name === map.value!.name))
);
</script>

<template>
	<div v-if="map">
		<div class="flex flex-col max-lg:items-center lg:flex-row">
			<MapsMapInfo :map="map" :mapIsActive="mapIsActive" />

			<div class="w-full max-lg:mt-10 max-lg:text-center lg:ml-28">
				<h2 class="text-2xl font-bold tracking-tight">Brawler Stats</h2>
				<p class="text-sm font-medium text-muted-foreground">
					See how each brawler performs on this map! Data is from the last 7 days.
				</p>

				<div class="mt-3 flex justify-center gap-3 lg:justify-start">
					<UiInput v-model:modelValue="search" placeholder="Filter Brawlers..." class="h-8 max-w-[15rem]" />
					<UiSelect v-model:modelValue="sort">
						<UiSelectTrigger class="h-8 max-w-[8rem]">
							<UiSelectValue placeholder="Sort..." />
						</UiSelectTrigger>
						<UiSelectContent>
							<UiSelectGroup>
								<UiSelectItem v-for="option in SORT_OPTIONS" :key="option.value" :value="option.value">
									{{ option.label }}
								</UiSelectItem>
							</UiSelectGroup>
						</UiSelectContent>
					</UiSelect>
				</div>

				<div class="mt-5 flex flex-row flex-wrap justify-center gap-3 lg:justify-start">
					<MapsBrawlerStats
						v-for="stats in brawlerStats"
						:key="stats.brawler"
						:brawlerStats="stats"
						:brawler="brawlers?.find((b) => b.id.toString() === stats.brawler.toString())!"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
