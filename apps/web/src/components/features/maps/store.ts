import type { BrawlApiMap } from "@brawltracker/brawl-api";

export const useBrawlerStatMapsStore = defineStore("brawler-stat-maps-store", () => {
	const maps = ref<BrawlApiMap[]>([]);
	const selectedMap = ref<BrawlApiMap | null>(null);
	const selectedMapLoading = ref(false);
	const dialogOpen = ref(false);

	async function fetchMaps() {
		const { data: mapRes } = await useFetch("/api/maps");
		maps.value = mapRes.value!.list;
		await setSelectedMap(maps.value[0]!.id);
	}

	async function setSelectedMap(mapId: number) {
		const map = await $fetch(`/api/maps/${mapId}`);
		selectedMap.value = map;
	}

	function setDialogState(state: boolean) {
		dialogOpen.value = state;
	}

	return {
		selectedMap,
		setSelectedMap,
		selectedMapLoading,
		maps,
		fetchMaps,
		dialogOpen,
		setDialogState,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
