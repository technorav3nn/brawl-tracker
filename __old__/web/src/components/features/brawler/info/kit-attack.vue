<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { normalizeNameToCdnName } from "@brawltracker/cdn";
import { STAT_NAME_CONVERSIONS, getNameConversions } from "../util";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	level: string;
}>();

const emit = defineEmits<{
	updateLevel: [string];
}>();

// eslint-disable-next-line vue/no-setup-props-destructure
const { data } = await useFetch(`/api/brawlers/name/${normalizeNameToCdnName(props.brawler.name)}/data`);

const basicStats = computed(() => getNameConversions(STAT_NAME_CONVERSIONS, data.value!.attack.stats));
const levelStats = computed(() =>
	data.value!.attack.statsByLevel.reduce(
		(_, curr) => ({
			[curr.name]: curr.list[Number.parseInt(props.level, 10) - 1],
		}),
		{} as Record<string, any>
	)
);

const onLevelChange = (newLevel: string) => {
	emit("updateLevel", newLevel);
};
</script>
``

<template>
	<BrawlerInfoKitStatsCard
		:title="`Attack: ${data?.attack.name}`"
		:description="data!.attack.description"
		type="attack"
		:data="{
			...basicStats,
			...levelStats,
		}"
		:level="props.level"
		@update-level="onLevelChange"
	/>
</template>
