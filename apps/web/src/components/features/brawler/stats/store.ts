import type { BrawlApiMap, BrawlApiBrawler } from "@brawltracker/brawl-api";

export const useBrawlerMapStore = defineStore("brawler-stat-maps-store", () => {
	const maps = ref<BrawlApiMap[]>([]);
	const selectedMap = ref<BrawlApiMap | null>(null);
	const brawler = ref<BrawlApiBrawler | null>(null);
	const selectedMapLoading = ref(false);
	const sheetOpen = ref(false);

	async function fetchMaps() {
		const { data: mapRes } = await useFetch("/api/maps");
		maps.value = mapRes.value!;
		await setSelectedMap(maps.value[0]!.id);
	}

	async function setSelectedMap(mapId: number) {
		const map = await $fetch(`/api/maps/${mapId}`);
		selectedMap.value = map;
	}

	function setBrawler(newBrawler: BrawlApiBrawler) {
		brawler.value = newBrawler;
	}

	function setSheetState(state: boolean) {
		sheetOpen.value = state;
	}

	return {
		selectedMap,
		setSelectedMap,
		selectedMapLoading,
		maps,
		fetchMaps,
		sheetOpen,
		setSheetState,
		brawler,
		setBrawler,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useBrawlerMapStore, import.meta.hot));
}
