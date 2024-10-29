<script setup lang="ts">
import { useFilteredMapStore } from "./filtered-map-store";

const { data: modes } = await useFetch("/api/modes", { query: { names: true } });

const filteredMapStore = useFilteredMapStore();
const { initialMaps, filteringEnabled } = storeToRefs(filteredMapStore);
const { filterMaps, setFilteredMaps, setFilterOptions } = filteredMapStore;

if (!modes.value) {
	throw createError({ statusCode: 404, message: "Modes not found" });
}

const selectedFilters = reactive<
	Record<string, string[]> & {
		modes: string[];
		environments: string[];
	}
>({
	modes: [],
	environments: [],
});

const modeNames = computed(() => modes.value!.map((mode) => mode.name));
const environmentNames = computed(() => {
	const environments = new Set<string>();

	for (const map of initialMaps.value!) {
		environments.add(map.environment.name);
	}

	return [...environments];
});

watch(selectedFilters, () => {
	console.log(selectedFilters);
	if (!filteringEnabled.value) {
		setFilterOptions({ modes: [], environments: [] });
		setFilteredMaps(initialMaps.value!);
		filterMaps();
		return;
	}

	const filters = {
		modes: selectedFilters.modes,
		environments: selectedFilters.environments,
	};

	setFilterOptions(filters);
	filterMaps();
});

const sections = computed(() => [
	{ name: "Modes", data: modeNames.value },
	{ name: "Environments", data: environmentNames.value, multiselect: true },
]);

const attrs = useAttrs();
const toggleFilterSwitchId = useId();
</script>

<template>
	<UPopover :popper="{ placement: 'bottom-start' }" :ui="{ trigger: '!w-auto', base: '!overflow-visible' }">
		<UButton
			color="white"
			label="Filter"
			trailing-icon="i-heroicons-chevron-down-20-solid"
			class="rounded-r-none rounded-l-md"
			v-bind="attrs"
		/>
		<template #panel>
			<div class="px-4 py-3 h-max pb-5 min-w-72 space-y-2">
				<div class="flex gap-2 items-center">
					<UToggle :id="toggleFilterSwitchId" v-model="filteringEnabled" label="Enable Filtering" />
					<label :for="toggleFilterSwitchId" class="text-sm font-medium text-gray-700 dark:text-gray-200">Enable Filtering</label>
				</div>
				<div v-for="section in sections" :key="section.name" class="mb-2">
					<p class="text-sm font-medium mb-0.5">{{ section.name }}</p>
					<UButtonGroup class="w-full">
						<USelectMenu
							v-model="selectedFilters[section.name.toLowerCase()]"
							:options="section.data"
							size="md"
							color="white"
							class="w-full"
							:multiple="section.multiselect"
							searchable
							:placeholder="'Select ' + section.name.toLowerCase() + '...'"
							:disabled="!filteringEnabled"
						/>
						<UTooltip text="Clear Filter" :disabled="!filteringEnabled">
							<UButton
								icon="i-heroicons-x-mark"
								square
								size="md"
								color="gray"
								:disabled="!filteringEnabled"
								@click="selectedFilters[section.name.toLowerCase()] = []"
							/>
						</UTooltip>
					</UButtonGroup>
				</div>
			</div>
		</template>
	</UPopover>
</template>
