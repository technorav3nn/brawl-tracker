<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";

const props = defineProps<{
	brawler: BrawlApiBrawler;
}>();

const { brawler: propsBrawler } = toRefs(props);
const { data } = await useFetch(`/api/brawlers/id/${propsBrawler.value.id}/csv`);

const ratings = computed(() => {
	const {
		csv: { DefenseRating: defense, OffenseRating: offense, UtilityRating: utility },
	} = data.value!;
	return {
		defense,
		offense,
		utility,
	};
});
</script>

<template>
	<div class="rounded-lg border border-border p-4 shadow">
		<h1 class="text-2xl font-bold tracking-tight">Rating</h1>

		<div class="flex h-[95%] flex-col justify-between">
			<div class="mt-4 flex h-[95%] flex-col gap-5 md:justify-evenly">
				<div class="flex items-center justify-between gap-2">
					<div class="flex flex-col gap-1">
						<p class="font-medium">Offense</p>
						<p class="text-sm font-medium text-muted-foreground">
							How good the brawler is at dealing damage to other players
						</p>
					</div>

					<UiRating :count="5" :value="ratings.offense" />
				</div>
				<div class="flex items-center justify-between gap-2">
					<div class="flex flex-col gap-1">
						<p class="font-medium">Defense</p>
						<p class="text-sm font-medium text-muted-foreground">
							How good the brawler is at surviving damage from other players
						</p>
					</div>

					<UiRating :count="5" :value="ratings.defense" />
				</div>
				<div class="flex items-center justify-between gap-2">
					<div class="flex flex-col gap-1">
						<p class="font-medium">Utility</p>
						<p class="text-sm font-medium text-muted-foreground">
							How good the brawler is at supporting their team
						</p>
					</div>

					<UiRating :count="5" :value="ratings.utility" />
				</div>
			</div>
			<p class="mb-3 mt-4 text-xs text-muted-foreground xs:mb-3 md:mb-3 lg:mb-0 xl:mb-3">
				These ratings do not reflect the current meta.
			</p>
		</div>
	</div>
</template>
