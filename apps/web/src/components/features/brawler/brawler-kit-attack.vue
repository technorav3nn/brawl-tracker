<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { normalizeNameToCdnName } from "@brawltracker/cdn";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	level: string;
}>();

const emit = defineEmits<{
	updateLevel: [string];
}>();

// eslint-disable-next-line vue/no-setup-props-destructure
const { data } = await useFetch(`/api/brawlers/name/${normalizeNameToCdnName(props.brawler.name)}/data`);

const nameConversions = {
	attackrange: "Attack Range",
	attacksupercharge: "Super Charge Per Hit",
	attackspeed: "Attack Speed",
	attackwidth: "Attack Width",
};

const stats = computed(() => {
	return Object.fromEntries(
		Object.entries(data.value!.attack.stats).map(([key, value]) => [
			nameConversions[key as keyof typeof nameConversions] ?? key,
			value,
		])
	);
});

const onLevelChange = (newLevel: string) => {
	emit("updateLevel", newLevel);
};
</script>
``

<template>
	<BrawlerKitStatsCard title="Attack" :data="stats" :level="props.level" @update-level="onLevelChange" />
</template>
