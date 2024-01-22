<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import {
	calculateBrawlerLevelStat,
	convertRangeToTiles,
	determineSpeed,
	type Level,
} from "$lib/util/brawl-stars/brawlers";
import { durationFormatter } from "$lib/util/common";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	level: string;
}>();

const emit = defineEmits<{
	updateLevel: [string];
}>();

// eslint-disable-next-line vue/no-setup-props-destructure
const { data: brawler } = await useFetch(`/api/brawlers/id/${props.brawler.id}/csv`);

const stats = computed(() => {
	const [health, damage] = [brawler.value!.csv.Hitpoints, brawler.value!.attack.Damage].map((value) =>
		calculateBrawlerLevelStat(value!, Number.parseInt(props.level, 10) as Level)
	);
	const { Speed: speed } = brawler.value!.csv;
	const { MaxCharge: maxAmmo, RechargeTime: reloadSpeed, CastingRange: range } = brawler!.value!.attack;
	return {
		Hitpoints: health,
		Speed: `${speed} (${determineSpeed(speed)}) `,
		Range: `${convertRangeToTiles(range)} tiles`,
		"Damage Per Shot": damage,
		"Reload Speed (ms)": durationFormatter.format(reloadSpeed, undefined, { left: " second" }),
		"Max Ammo": `${maxAmmo} shots`,
	};
});

const onLevelChange = (newLevel: string) => {
	emit("updateLevel", newLevel);
};
</script>
``

<template>
	<BrawlerKitStatsCard title="Attack" :data="stats" :level="props.level" @update-level="onLevelChange" />
	<!--
 <div class="flex flex-col gap-4 rounded-lg border border-border p-4 shadow">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-bold tracking-tight">Stats</h1>
			<UiSelect v-model:modelValue="level">
				<UiSelectTrigger class="h-8 max-w-[8rem]">
					<UiSelectValue>Level {{ level }}</UiSelectValue>
				</UiSelectTrigger>
				<UiSelectContent>
					<UiSelectGroup>
						<UiSelectItem v-for="i in 11" :key="i" class="h-7" :value="i.toString()">
							Level {{ i }}
						</UiSelectItem>
					</UiSelectGroup>
				</UiSelectContent>
			</UiSelect>
		</div>

		<div>
			<UiTable>
				<UiTableHeader>
					<UiTableRow class="w-full">
						<UiTableHead> Stat </UiTableHead>
						<UiTableHead> Value </UiTableHead>
					</UiTableRow>
				</UiTableHeader>
				<UiTableBody>
					<UiTableRow v-for="[stat, value] in Object.entries(stats)" :key="stat">
						<UiTableCell class="font-medium">{{ upperFirstCharacter(stat) }}</UiTableCell>
						<UiTableCell>{{ value }}</UiTableCell>
					</UiTableRow>
				</UiTableBody>
			</UiTable>
		</div>
	</div> 
	-->
</template>
