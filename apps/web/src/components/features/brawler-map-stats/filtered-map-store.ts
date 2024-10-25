import type { BrawlApiMap } from "@brawltracker/brawl-api";

export const useFilteredMapStore = defineStore("filtered-maps", () => {
	const search = ref("");
	const initialMaps = ref<BrawlApiMap[]>([]);
	const filteredMaps = ref<BrawlApiMap[]>([]);
	const filteringEnabled = ref(false);

	function filterMaps(filters: { modes: string[]; environments: string[] }) {
		return initialMaps.value.filter((map) => {
			const modeMatch = filters.modes.length === 0 || filters.modes.includes(map.gameMode.name);
			const environmentMatch = filters.environments.length === 0 || filters.environments.includes(map.environment.name);
			return modeMatch && environmentMatch;
		});
	}

	return {
		setFilteredMaps: (newMaps: BrawlApiMap[]) => (filteredMaps.value = newMaps),
		setInitialMaps: (newMaps: BrawlApiMap[]) => (initialMaps.value = newMaps),
		setFilteringEnabled: (enabled: boolean) => (filteringEnabled.value = enabled),
		filterMaps,
		search,
		filteredMaps,
		initialMaps,
		filteringEnabled,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useFilteredMapStore, import.meta.hot));
}
