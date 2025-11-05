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
		label: "1st Attack",
	},
	{
		label: "2nd Attack",
	},
];

const selectedTab = ref("0");

const attackStats = useKitAbilityStats("attack");
const altAttackStats = computed(() => (brawlerCdnData.value.altAttack ? useKitAbilityStats("altAttack") : null));
</script>

<template>
	<UCard class="flex" :ui="{ body: '!p-4 !pt-0 !px-0' }">
		<UTabs
			v-if="brawlerCdnData.altAttack"
			v-model="selectedTab"
			size="lg"
			:items="tabItems"
			:ui="{ trigger: 'flex-1', indicator: 'h-[2px]!' }"
			variant="link"
		/>
		<div class="p-4 !pb-0" :class="[brawlerCdnData.altAttack && 'pt-2']">
			<BrawlerKitCard
				v-if="selectedTab === '0'"
				:title="`Attack: ${brawlerCdnData.attack.name}`"
				:description="brawlerCdnData.attack.description"
				:table-data="[...attackStats.basicStats?.value, ...attackStats.levelStats?.value]"
				icon="/icons/attack-icon.png"
			/>
			<BrawlerKitCard
				v-else
				:title="`Attack: ${brawlerCdnData.altAttack.name}`"
				:description="brawlerCdnData.altAttack.description"
				:table-data="[...altAttackStats?.basicStats?.value, ...altAttackStats?.levelStats?.value]"
				icon="/icons/attack-icon.png"
			/>
		</div>
	</UCard>
</template>
