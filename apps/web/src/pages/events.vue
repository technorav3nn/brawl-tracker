<script setup lang="ts">
import type { BrawlApiEvent } from "@brawltracker/brawl-api";
import { upperFirstCharacter } from "$lib/util/common";

const route = useRoute("events");
const tab = ref<"current" | "upcoming" | "league" | (string & {})>(route.path.split("/")[2]!);

watchEffect(() => {
	if (tab.value === "") {
		navigateTo("/events/current");
	}

	tab.value = "";

	tab.value = route.path.split("/")[2]!;
});

/**
 * Sorts the events so that the challenge evenst are always last.
 *
 * @param evts The events to sort.
 */
function sortEventRotation(evts: BrawlApiEvent[]) {
	return evts.sort((a, b) => {
		if (a.slot.name !== "Challenge") {
			return -1;
		}

		if (b.slot.name === "Challenge") {
			return 1;
		}

		return 0;
	});
}

const { data: events } = await useFetch("/api/events/rotation", {
	transform: ({ active, upcoming, league, images }) => {
		return {
			active: sortEventRotation(active.reverse()),
			upcoming: sortEventRotation(upcoming.reverse()),
			league: sortEventRotation(league.upcoming.reverse()),
			images,
		};
	},
});
</script>

<template>
	<div>
		<h1 class="text-4xl font-bold leading-normal tracking-tight">{{ upperFirstCharacter(tab) }} Events</h1>
		<p class="text-md mb-5 text-muted-foreground">
			{{
				tab === "current"
					? "Find out what gamemodes and maps are coming next!"
					: "See what gamemodes are live and see the meta!"
			}}
		</p>
		<UiTabs v-model:modelValue="tab">
			<UiTabsList>
				<UiTabsTrigger value="current" asChild>
					<NuxtLink to="/events/current">Current</NuxtLink>
				</UiTabsTrigger>
				<UiTabsTrigger value="upcoming" asChild>
					<NuxtLink to="/events/upcoming">Upcoming</NuxtLink>
				</UiTabsTrigger>
				<UiTabsTrigger value="league" asChild>
					<NuxtLink to="/events/league">Power League</NuxtLink>
				</UiTabsTrigger>
			</UiTabsList>
		</UiTabs>
		<div class="px-1 pt-4">
			<div class="grid-media-cols grid gap-4">
				<NuxtPage :events="events" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.grid-media-cols {
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 1205px) {
	.grid-media-cols {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}
@media (max-width: 768px) {
	.grid-media-cols {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
}
</style>
