<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import type { CdnBrawler } from "@brawltracker/cdn/v2";
import { useKitAbilityStats } from "./brawler-composables";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	brawlerCdnData: CdnBrawler;
}>();
const { brawlerCdnData } = toRefs(props);
const { basicStats, levelStats } = useKitAbilityStats("attack");
</script>

<template>
	<BrawlerKitCard
		:title="`Attack: ${brawlerCdnData.attack.name}`"
		:description="brawlerCdnData.attack.description"
		:tableData="[...basicStats, ...levelStats]"
		icon="/icons/attack-icon.png"
	/>
</template>
