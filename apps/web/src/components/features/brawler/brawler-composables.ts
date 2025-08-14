import { useBrawlerStore } from "./brawler-store";

export function useKitAbilityStats(ability: MaybeRefOrGetter<"altAttack" | "altSuper" | "attack" | "hypercharge" | "super">) {
	// eslint-disable-next-line no-param-reassign
	ability = toValue(ability);
	const { brawlerCdnData, level } = storeToRefs(useBrawlerStore());
	const hasHypercharge = computed(() => Boolean(brawlerCdnData.value!.hypercharge));
	if (ability === "hypercharge" && !hasHypercharge) {
		throw new Error("Brawler does not have hypercharge ability");
	}

	if (!brawlerCdnData.value) return { basicStats: null, levelStats: null };

	const basicStats = computed(() => brawlerCdnData.value![ability]!.stats);
	const levelStats = computed(() => {
		if (ability === "hypercharge") return null;
		return brawlerCdnData.value![ability]!.statsByLevel!.map((s) => ({
			label: s.name,
			value: s.values[level.value - 1],
			isLevelStat: true,
		}));
	});

	return { basicStats, levelStats };
}
