import { useBrawlerStore } from "./brawler-store";
import { STAT_NAME_CONVERSIONS, getNameConversions } from "./brawler-utils";

export function useKitAbilityStats(ability: "attack" | "hypercharge" | "super") {
	const { brawlerCdnData, level } = storeToRefs(useBrawlerStore());
	const hasHypercharge = computed(() => Boolean(brawlerCdnData.value!.hypercharge));
	if (ability === "hypercharge" && !hasHypercharge) {
		throw new Error("Brawler does not have hypercharge ability");
	}

	if (!brawlerCdnData.value) return { basicStats: null, levelStats: null };

	const basicStats = computed(() => getNameConversions(STAT_NAME_CONVERSIONS, brawlerCdnData.value![ability]!.stats));
	const levelStats = computed(() => {
		if (ability === "hypercharge") return null;
		return brawlerCdnData.value![ability]!.statsByLevel.map((s) => ({
			title: s.name,
			value: s.list[level.value - 1],
			isLevelStat: true,
		}));
	});

	return { basicStats, levelStats };
}
