<script setup lang="ts">
import type { Player } from "@brawltracker/brawl-stars-api";
import { VisXYContainer, VisAxis, VisTooltip, VisCrosshair, VisLine, VisScatter } from "@unovis/vue";
import { createGetCachedData } from "$lib/utils/nuxt";

const props = defineProps<{ player: Player }>();

const route = useRoute("players-tag");
const nuxtApp = useNuxtApp();

const {
	data: battlelog,
	status,
	error,
} = await useLazyFetch("/api/players/battlelog", {
	query: { tag: route.params.tag },
	key: `battlelog-${route.params.tag}`,
	getCachedData: createGetCachedData(nuxtApp),
});

interface DataRecord {
	x: number;
	y: number;
	trophyChange: number;
	brawler: string;
}

const netTrophies = computed(() => {
	if (!battlelog.value) return null;
	return battlelog.value
		.filter((battle) => battle.battle.type !== "soloRanked" && battle.battle.trophyChange)
		.reduce((acc, battle) => acc + (battle.battle.trophyChange ?? 0), 0);
});

const base = ref(props.player.trophies - netTrophies.value!);

const data = computed(() => {
	const arr = [];
	const filtered = battlelog.value?.filter((battle) => battle.battle.type !== "soloRanked").reverse();
	for (const [index, battle] of filtered!.entries()) {
		if (battle.battle.type !== "soloRanked" && battle.battle.trophyChange) {
			arr.push({
				x: index + 1,
				y: base.value + (battle.battle.trophyChange ?? 0),
				trophyChange: battle.battle.trophyChange,
				brawler: "",
			});
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			base.value += battle.battle.trophyChange;
		}
	}

	return arr;
});

const { format } = new Intl.NumberFormat("en-US");

// console.log(data.value, base, netTrophies);
const x = (d: DataRecord) => d.x;
const y = (d: DataRecord) => d.y;

const label = (d: DataRecord) =>
	`${d.trophyChange > 0 ? "+" : d.trophyChange < 0 ? "-" : ""}${d.trophyChange.toString().replace("-", "")}`;

const labelColor = (d: DataRecord) =>
	d.trophyChange > 0 ? "rgb(34, 197, 94)" : d.trophyChange < 0 ? "rgb(239, 68, 68)" : "rgb(96, 165, 250)";

const template = (d: DataRecord) => `
	<p class="font-medium">Battle #${d.x}</p>
	<hr class="my-1 border border-(--ui-border)" />
	<p class="text-sm text-neutral-500 dark:text-neutral-400">Trophies: <span class="text-yellow-500 dark:text-yellow-400 font-semibold">${format(d.y)}</span></p>
`;
</script>

<template>
	<UCard :ui="{ body: 'px-2! py-2!' }">
		<template v-if="status === 'pending'">
			<USkeleton class="h-[300px] w-full" />
		</template>
		<template v-else-if="status === 'error' && error">
			<UAlert
				variant="subtle"
				color="error"
				icon="i-heroicons-exclamation-triangle"
				title="An error occured when loading the graph"
				:description="error.message"
			/>
		</template>
		<template v-else-if="data.length === 0">
			<UAlert
				variant="subtle"
				color="primary"
				icon="i-heroicons-exclamation-triangle"
				title="No data to display"
				description="The player has no battle log data to display. Only games with trophies earned are displayed."
			/>
		</template>
		<template v-else-if="status === 'success' && battlelog">
			<ClientOnly>
				<VisXYContainer scale-by-domain :data="data">
					<VisLine color="var(--ui-primary)" curve-type="linear" :x="x" :y="y" />
					<VisScatter :label-color="labelColor" :label="label" color="var(--ui-primary)" :x="x" :y="y" />
					<VisAxis :grid-line="false" type="x" />
					<VisAxis type="y" />
					<VisTooltip />
					<VisCrosshair color="var(--ui-primary)" :template="template" />
				</VisXYContainer>
			</ClientOnly>
		</template>
	</UCard>
</template>

<style scoped>
.unovis-xy-container {
	--vis-scatter-point-label-text-font-size: 14.5px;
}
</style>
