import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { groupBy } from "$lib/util/common";

type Mode = "class" | "none" | "rarity";

type GroupingMode = {
	label: string;
	value: Mode;
};

const GROUPING_MODES: GroupingMode[] = [
	{
		label: "None",
		value: "none",
	},
	{
		label: "Rarity",
		value: "rarity",
	},
	{
		label: "Class",
		value: "class",
	},
];

export const useBrawlersStore = defineStore("brawlers-store", () => {
	const ungroupedBrawlers = ref<BrawlApiBrawler[]>([]);
	const groupingMode = ref<Mode>("none");
	const search = ref<string>("");

	const brawlers = computed(() => {
		const brawlers = ungroupedBrawlers.value.filter((brawler) =>
			brawler.name.toLowerCase().includes(search.value.toLowerCase())
		);
		if (groupingMode.value === "none") return brawlers;
		if (groupingMode.value === "rarity") {
			return groupBy(brawlers, (brawler) => brawler.rarity.name);
		}

		if (groupingMode.value === "class") {
			return groupBy(brawlers, (brawler) => brawler.class.name);
		}
	});

	async function fetchBrawlers() {
		const { data } = await useFetch("/api/brawlers", { server: true });
		ungroupedBrawlers.value = data.value!;
	}

	return {
		brawlers,
		groupingMode,
		search,
		fetchBrawlers,
		GROUPING_MODES,
	};
});
