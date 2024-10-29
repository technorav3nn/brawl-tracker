import type { BrawlApiMap } from "@brawltracker/brawl-api";

export const useFilteredMapStore = defineStore("filtered-maps", () => {
	const search = ref("");
	const initialMaps = ref<BrawlApiMap[]>([]);
	const filteredMaps = ref<BrawlApiMap[]>([]);
	const filteringEnabled = ref(false);
	const filterOptions = ref<{
		modes: string[];
		environments: string[];
	}>({ modes: [], environments: [] });

	watch(search, () => filterMaps());

	function filterMaps() {
		console.log(filterOptions.value);
		const filtered = initialMaps.value.filter((map) => {
			const modeMatch = filterOptions.value.modes.length === 0 || filterOptions.value.modes.includes(map.gameMode.name);
			const environmentMatch =
				filterOptions.value.environments.length === 0 || filterOptions.value.environments.includes(map.environment.name);
			const searchMatch = search.value === "" || map.name.toLowerCase().includes(search.value.toLowerCase());
			return searchMatch && modeMatch && environmentMatch;
		});
		filteredMaps.value = filtered;
	}

	return {
		setFilteredMaps: (newMaps: BrawlApiMap[]) => (filteredMaps.value = newMaps),
		setInitialMaps: (newMaps: BrawlApiMap[]) => (initialMaps.value = newMaps),
		setFilteringEnabled: (enabled: boolean) => (filteringEnabled.value = enabled),
		setFilterOptions: (options: { modes: string[]; environments: string[] }) => (filterOptions.value = options),
		filterMaps,
		search,
		filteredMaps,
		filterOptions,
		initialMaps,
		filteringEnabled,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useFilteredMapStore, import.meta.hot));
}
