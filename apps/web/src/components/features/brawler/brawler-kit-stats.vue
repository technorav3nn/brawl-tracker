<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { getCalculatedBrawlerStats } from "$lib/util/brawl-stars/brawlers";

const props = defineProps<{
	brawler: BrawlApiBrawler;
}>();
// eslint-disable-next-line vue/no-setup-props-destructure
const { data: brawler } = await useFetch(`/api/brawlers/id/${props.brawler.id}/csv`);

const level = ref("1");
const levelStats = computed(() => {
	const [health, damage] = [brawler.value!.csv.Hitpoints, brawler.value!.skills.Damage].map((value) =>
		getCalculatedBrawlerStats(value!)
	);
	return {
		health,
		damage,
	};
});
</script>

<template>
	<div class="rounded-lg border border-border p-4 shadow">
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
			<div v-for="[stat, value] in Object.entries(levelStats)" :key="stat">{{ stat }}: {{ value }}</div>
		</div>
	</div>
</template>
