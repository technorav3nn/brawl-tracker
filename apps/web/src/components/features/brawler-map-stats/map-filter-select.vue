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

function filter() {
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
}

const modeNames = computed(() => modes.value!.map((mode) => mode.name));
const environmentNames = computed(() => {
	const environments = new Set<string>();

	for (const map of initialMaps.value!) {
		environments.add(map.environment.name);
	}

	return [...environments];
});

watch(filteringEnabled, () => {
	filter();
});

watch(selectedFilters, () => {
	filter();
});

const sections = computed(() => [
	{ name: "Modes", data: modeNames.value },
	{ name: "Environments", data: environmentNames.value, multiselect: true },
]);

const attrs = useAttrs();
const toggleFilterSwitchId = useId();
</script>

<template>
	<UPopover :popper="{ placement: 'bottom-start' }" :ui="{ content: 'overflow-visible!' }">
		<UButton
			color="neutral"
			variant="outline"
			label="Filter"
			trailing-icon="i-heroicons-chevron-down-20-solid"
			class="rounded-l-md rounded-r-none"
			v-bind="attrs"
		/>

		<template #content>
			<div class="h-max min-w-72 space-y-2 px-4 py-3 pb-3">
				<div class="flex items-center gap-2">
					<USwitch :id="toggleFilterSwitchId" v-model="filteringEnabled" />
					<label :for="toggleFilterSwitchId" class="text-sm font-medium text-neutral-700 dark:text-neutral-200"
						>Enable Filtering</label
					>
				</div>
				<div v-for="section in sections" :key="section.name" class="mb-2">
					<p class="mb-0.5 text-sm font-medium">{{ section.name }}</p>
					<UFieldGroup class="w-full">
						<USelectMenu
							v-model="selectedFilters[section.name.toLowerCase()]"
							:items="section.data"
							size="md"
							:ui="{ content: 'animate-none!' }"
							class="w-full animate-none!"
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
								color="neutral"
								variant="subtle"
								:disabled="!filteringEnabled"
								@click="selectedFilters[section.name.toLowerCase()] = []"
							/>
						</UTooltip>
					</UFieldGroup>
				</div>
			</div>
		</template>
	</UPopover>
</template>
