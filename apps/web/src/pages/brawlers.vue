<script setup lang="ts">
import { RARITY_COLORS } from "$lib/util/colors";

const { fetchBrawlers, GROUPING_MODES } = useBrawlersStore();
const { brawlers, groupingMode, search } = storeToRefs(useBrawlersStore());

await fetchBrawlers();

const hasSelectedAnyMode = ref(false);
watch(groupingMode, () => {
	hasSelectedAnyMode.value = true;
});

const selectValue = computed(() => {
	const option = GROUPING_MODES.find((opt) => opt.value === groupingMode.value);
	if (option?.value === "none" && !hasSelectedAnyMode.value) {
		return "Group By...";
	}

	return option?.label;
});
</script>

<template>
	<div>
		<h1 class="text-4xl font-bold leading-normal tracking-tight">Brawlers</h1>
		<p class="text-sm font-medium text-muted-foreground">
			All brawlers in Brawl Stars, explore their stats, kit, and more!
		</p>
		<div class="mt-2.5 flex flex-row gap-2.5">
			<UiInput v-model:modelValue="search" placeholder="Filter Brawlers..." class="h-8 max-w-[15rem]" />
			<UiSelect v-model:modelValue="groupingMode">
				<UiSelectTrigger class="h-8 max-w-[8rem]">
					<UiSelectValue>
						{{ selectValue }}
					</UiSelectValue>
				</UiSelectTrigger>
				<UiSelectContent>
					<UiSelectGroup>
						<UiSelectItem v-for="option in GROUPING_MODES" :key="option.value" :value="option.value">
							{{ option.label }}
						</UiSelectItem>
					</UiSelectGroup>
				</UiSelectContent>
			</UiSelect>
		</div>
		<div v-if="groupingMode === 'none' && Array.isArray(brawlers)">
			<div
				class="mt-3 grid grid-cols-3 justify-items-center gap-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10"
			>
				<BrawlersInfoCard v-for="brawler in brawlers" :key="brawler.id" :brawler="brawler" />
			</div>
		</div>
		<div v-else-if="!Array.isArray(brawlers) && groupingMode !== 'none'" class="mt-3 flex flex-col gap-3">
			<div v-for="(group, rarity) in brawlers" :key="rarity">
				<h2
					:style="groupingMode === 'rarity' && { color: RARITY_COLORS[group[0]!.rarity.name] }"
					class="text-2xl font-bold leading-normal tracking-tight"
				>
					{{ rarity }}
				</h2>
				<div
					class="mt-1 grid grid-cols-3 justify-items-center gap-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10"
				>
					<BrawlersInfoCard v-for="brawler in group" :key="brawler.id" hasColor :brawler="brawler" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.grid-auto-fit-cols {
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
</style>
