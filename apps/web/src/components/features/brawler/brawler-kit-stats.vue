<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { calculateBrawlerLevelStat, determineSpeed, type Level } from "$lib/util/brawl-stars/brawlers";
import { upperFirstCharacter } from "$lib/util/common";

const props = defineProps<{
	brawler: BrawlApiBrawler;
}>();
// eslint-disable-next-line vue/no-setup-props-destructure
const { data: brawler } = await useFetch(`/api/brawlers/id/${props.brawler.id}/csv`);

const level = ref("1");
const levelStats = computed(() => {
	const [health, damage] = [brawler.value!.csv.Hitpoints, brawler.value!.skills.Damage].map((value) =>
		calculateBrawlerLevelStat(value!, Number.parseInt(level.value, 10) as Level)
	);
	return {
		Hitpoints: health,
		"Damage Per Shot": damage,
		// "Damage Per Second": damage * brawler.value!.csv.AttackSpeed,
		Speed: `${brawler.value!.csv.Speed} (${determineSpeed(brawler.value!.csv.Speed)})	`,
	};
});
</script>

<template>
	<div class="flex flex-col justify-between gap-4 rounded-lg border border-border p-4 shadow">
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
					<UiTableRow v-for="[stat, value] in Object.entries(levelStats)" :key="stat">
						<UiTableCell class="font-medium">{{ upperFirstCharacter(stat) }}</UiTableCell>
						<UiTableCell>{{ value }}</UiTableCell>
					</UiTableRow>
				</UiTableBody>
			</UiTable>
		</div>
	</div>
</template>
