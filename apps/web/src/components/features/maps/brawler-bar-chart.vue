<script setup lang="ts">
import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip, VisCrosshair } from "@unovis/vue";

interface DataRecord {
	brawler: string;
	winRate: number;
	useRate: number;
	usageIndex: number;
}

const props = defineProps<{
	data: DataRecord[];
}>();

// const labels = {
// 	brawler: "Brawler",
// 	useRate: "Usage Rate",
// 	winRate: "Win Rate",
// 	usageIndex: "Usage #",
// };

const x = (d: DataRecord) => d.usageIndex;
const y = [(d: DataRecord) => d.winRate, (d: DataRecord) => props.data.length - d.usageIndex + 1];
const tickFormat = (_: any, i: number) => {
	// show tick labels for every 5th brawler
	if (i % 4 === 0) {
		return props.data[i].brawler;
	}

	return "";
};

const template = (d: DataRecord) => `
      <span>${d.brawler}</span>
	  <br>
	  <span>Win Rate: ${d.winRate}%</span>
	  <br>
	  <span>Usage Rate: ${d.useRate}%</span>
	  <br>
	  <span>Usage Rank: ${d.usageIndex}</span>
    `;
</script>

<template>
	<UDashboardCard :ui="{ body: { padding: '!pb-3 !px-4' } as any }">
		<template #header>
			<div>
				<p class="text-xl text-gray-900 dark:text-white font-semibold">Brawler Data</p>
			</div>
		</template>
		<VisXYContainer :data="data">
			<VisStackedBar :x="x" :y="y" :dataStep="0.9" />
			<VisAxis :gridLine="false" :tickFormat="tickFormat" :numTicks="data.length" type="x" />
			<VisAxis type="y" />
			<VisTooltip />
			<VisCrosshair color="rgb(var(--color-primary-DEFAULT))" :template="template" />
		</VisXYContainer>
	</UDashboardCard>
</template>

<style scoped>
.unovis-xy-container {
	--vis-crosshair-line-stroke-color: rgb(var(--color-primary-500));
	--vis-crosshair-circle-stroke-color: #fff;

	--vis-axis-grid-color: rgb(var(--color-gray-200));
	--vis-axis-tick-color: rgb(var(--color-gray-200));
	--vis-axis-tick-label-color: rgb(var(--color-gray-400));

	--vis-tooltip-background-color: #fff;
	--vis-tooltip-border-color: rgb(var(--color-gray-200));
	--vis-tooltip-text-color: rgb(var(--color-gray-900));
}

.dark {
	.unovis-xy-container {
		--vis-crosshair-line-stroke-color: rgb(var(--color-primary-400));
		--vis-crosshair-circle-stroke-color: rgb(var(--color-gray-900));

		--vis-axis-grid-color: rgb(var(--color-gray-800));
		--vis-axis-tick-color: rgb(var(--color-gray-800));
		--vis-axis-tick-label-color: rgb(var(--color-gray-500));

		--vis-tooltip-background-color: rgb(var(--color-gray-900));
		--vis-tooltip-border-color: rgb(var(--color-gray-800));
		--vis-tooltip-text-color: #fff;
	}
}
</style>
