<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import type { BrawlerData } from "@brawltracker/cdn";
import { useKitAbilityStats } from "./brawler-composables";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	brawlerCdnData: BrawlerData;
}>();
const { brawlerCdnData } = toRefs(props);
const { basicStats, levelStats } = useKitAbilityStats("super");
</script>

<template>
	<BrawlerKitCard
		:title="`Super: ${brawlerCdnData.super.name}`"
		:description="brawlerCdnData.super.description"
		:tableData="[...basicStats, ...levelStats]"
		icon="/icons/super-icon.png"
	/>
</template>
