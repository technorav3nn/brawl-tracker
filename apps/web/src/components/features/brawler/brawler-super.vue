<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import type { CdnBrawler } from "@brawltracker/cdn/v2";
import { useKitAbilityStats } from "./brawler-composables";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	brawlerCdnData: CdnBrawler;
}>();
const { brawlerCdnData } = toRefs(props);

const tabItems = [
	{
		label: "1st Super",
	},
	{
		label: "2nd Super",
	},
];

const selectedTab = ref("0");

const superStats = useKitAbilityStats("super");
const altSuperStats = computed(() => (brawlerCdnData.value.altSuper ? useKitAbilityStats("altSuper") : null));
</script>

<template>
	<UCard class="flex" :ui="{ body: '!p-4 !pt-0 !px-0' }">
		<UTabs
			v-if="brawlerCdnData.altSuper"
			v-model="selectedTab"
			:items="tabItems"
			:ui="{ trigger: 'flex-1', indicator: 'h-[2px]!' }"
			variant="link"
			size="lg"
		>
		</UTabs>
		<div class="p-4 !pb-0" :class="[brawlerCdnData.altSuper && 'pt-2']">
			<BrawlerKitCard
				v-if="selectedTab === '0'"
				:title="`Super: ${brawlerCdnData.super.name}`"
				:description="brawlerCdnData.super.description"
				:tableData="[...superStats.basicStats?.value, ...superStats.levelStats?.value]"
				icon="/icons/super-icon.png"
			/>
			<BrawlerKitCard
				v-else
				:title="`Super: ${brawlerCdnData.altSuper.name}`"
				:description="brawlerCdnData.altSuper.description"
				:tableData="[...altSuperStats?.basicStats?.value, ...altSuperStats?.levelStats?.value]"
				icon="/icons/super-icon.png"
			/>
		</div>
	</UCard>
</template>
