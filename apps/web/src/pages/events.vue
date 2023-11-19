<script setup lang="ts">
import { upperFirstCharacter } from "$lib/util/common";

const route = useRoute("events");
const tab = ref<"current" | "upcoming" | (string & {})>(route.path.split("/")[2]!);

watchEffect(() => {
	if (tab.value === "") {
		navigateTo("/events/current");
	}

	tab.value = "";

	tab.value = route.path.split("/")[2]!;
});

const { data: events } = await useFetch("/api/events/rotation");
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
			</UiTabsList>
		</UiTabs>
		<div class="px-1 pt-4">
			<NuxtPage :events="events" />
		</div>
	</div>
</template>
