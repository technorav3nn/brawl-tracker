<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import type { BrawlerData } from "@brawltracker/cdn";
import { useBrawlerStore } from "./brawler-store";
import { getNameConversions, STAT_NAME_CONVERSIONS } from "./brawler-utils";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	cdnInfo: BrawlerData;
}>();
const { cdnInfo } = toRefs(props);
const { level } = storeToRefs(useBrawlerStore());

const basicStats = computed(() => getNameConversions(STAT_NAME_CONVERSIONS, cdnInfo.value!.attack.stats));
const levelStats = computed(() =>
	cdnInfo.value.attack.statsByLevel.map((s) => ({
		title: s.name,
		value: s.list[level.value - 1],
	}))
);
</script>

<template>
	<BrawlerKitCard
		title="Attack"
		:description="cdnInfo.attack.description"
		:tableData="[...basicStats, ...levelStats]"
		icon="/icons/attack-icon.png"
	/>
</template>
