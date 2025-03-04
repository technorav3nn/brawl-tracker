<script setup lang="ts">
import type { Player } from "@brawltracker/brawl-stars-api";
import { VisXYContainer, VisAxis, VisTooltip, VisCrosshair, VisLine, VisScatter } from "@unovis/vue";

const props = defineProps<{ player: Player }>();

const route = useRoute("players-tag");

const {
	data: battlelog,
	status,
	error,
} = await useLazyFetch("/api/players/battlelog", {
	query: { tag: route.params.tag },
});

interface DataRecord {
	x: number;
	y: number;
	trophyChange: number;
}

const netTrophies = computed(() => {
	if (!battlelog.value) return null;
	return battlelog.value
		.filter((battle) => battle.battle.type !== "soloRanked" && battle.battle.trophyChange)
		.reduce((acc, battle) => acc + battle.battle.trophyChange! ?? 0, 0);
});
// eslint-disable-next-line vue/no-setup-props-destructure
const base = ref(props.player.trophies - netTrophies.value!);

const data = computed(() => {
	const arr = [];
	const filtered = battlelog.value?.filter((battle) => battle.battle.type !== "soloRanked").reverse();
	for (const [index, battle] of filtered!.entries()) {
		if (battle.battle.type !== "soloRanked" && battle.battle.trophyChange) {
			arr.push({
				x: index + 1,
				y: base.value + battle.battle.trophyChange ?? 0,
				trophyChange: battle.battle.trophyChange,
			});
			base.value += battle.battle.trophyChange;
		}
	}

	return arr;
});

// eslint-disable-next-line @typescript-eslint/unbound-method
const { format } = new Intl.NumberFormat("en-US");

// console.log(data.value, base, netTrophies);
const x = (d: DataRecord) => d.x;
const y = (d: DataRecord) => d.y;

const label = (d: DataRecord) => `${d.trophyChange > 0 ? "+" : "-"}${d.trophyChange.toString().replace("-", "")}`;

const labelColor = (d: DataRecord) => (d.trophyChange > 0 ? "green" : "red");

const template = (d: DataRecord) => `
	<p class="font-medium">Battle #${d.x}</p>
	<hr class="my-1 border border-border" />
	<p class="text-sm text-gray-500 dark:text-gray-400">Trophies: <span class="text-yellow-500 dark:text-yellow-400 font-semibold">${format(d.y)}</span></p>
`;
</script>

<template>
	<UDashboardCard :ui="{ body: { padding: '!px-2 !py-2' } as any }">
		<template v-if="status === 'pending'">
			<USkeleton class="w-full h-[300px]" />
		</template>
		<template v-else-if="status === 'error' && error">
			<UAlert
				variant="subtle"
				color="red"
				icon="i-heroicons-exclamation-triangle"
				title="An error occured when loading the graph"
				:description="error.message"
			>
			</UAlert>
		</template>
		<template v-else-if="data.length === 0">
			<UAlert
				variant="subtle"
				color="primary"
				icon="i-heroicons-exclamation-triangle"
				title="No data to display"
				description="The player has no battle log data to display"
			>
			</UAlert>
		</template>
		<template v-else-if="status === 'success' && battlelog">
			<ClientOnly>
				<VisXYContainer scaleByDomain :data="data">
					<VisLine color="rgb(var(--color-primary-DEFAULT))" curveType="linear" :x="x" :y="y" />
					<VisScatter :labelColor="labelColor" :label="label" color="rgb(var(--color-primary-DEFAULT))" :x="x" :y="y" />
					<VisAxis :gridLine="false" type="x" />
					<VisAxis type="y" />
					<VisTooltip />
					<VisCrosshair color="rgb(var(--color-primary-DEFAULT))" :template="template" />
				</VisXYContainer>
			</ClientOnly>
		</template>
	</UDashboardCard>
</template>

<style scoped lang="postcss">
:root {
	@apply text-red-500;
}
</style>
