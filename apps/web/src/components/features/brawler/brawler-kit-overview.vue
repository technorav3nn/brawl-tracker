<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { normalizeNameToCdnName, getBrawlerModelUrl } from "@brawltracker/cdn";
import { upperFirstCharacter } from "$lib/util/common";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	level: string;
}>();
const emit = defineEmits<{
	updateLevel: [level: string];
}>();

const { brawler } = toRefs(props);

const cdnName = computed(() => normalizeNameToCdnName(brawler.value.name));
const modelImage = computed(() => getBrawlerModelUrl(cdnName.value));

const { data } = await useFetch(`/api/brawlers/name/${cdnName.value}/data`);

const stats = computed(() => {
	const { healthByLevel, stats: brawlerStats } = data.value!;

	return {
		Health: healthByLevel[Number.parseInt(props.level, 10) - 1],
		"Movement Speed": brawlerStats.movementspeed,
		Rarity: brawlerStats.rarity,
		Class: brawlerStats.class,
		"Voice Actor": brawlerStats.voiceactor ?? "Unknown",
		"In-game ID": brawler.value.id,
	};
});
</script>

<template>
	<div class="rounded-lg border border-border p-4 shadow">
		<div class="flex h-full w-full flex-col justify-between">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-bold tracking-tight">Overview</h1>
				<UiSelect :modelValue="level" @update:model-value="(level) => emit('updateLevel', level)">
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
			<div class="flex flex-col justify-between gap-3 sm:flex-row md:flex-col xl:flex-row">
				<NuxtImg
					priority
					class="mt-2 aspect-square max-h-[200px] w-full max-w-[200px] self-center object-scale-down"
					:src="modelImage"
					height="200"
					width="200"
					loading="eager"
					fit="contain"
				/>
				<UiTable class="mt-2">
					<UiTableBody>
						<UiTableRow
							v-for="[stat, value] in Object.entries(stats)"
							:key="stat"
							class="hover:bg-transparent"
						>
							<UiTableCell class="font-medium">{{ upperFirstCharacter(stat) }}</UiTableCell>
							<UiTableCell>{{ value }}</UiTableCell>
						</UiTableRow>
					</UiTableBody>
				</UiTable>
			</div>
		</div>
	</div>
</template>
