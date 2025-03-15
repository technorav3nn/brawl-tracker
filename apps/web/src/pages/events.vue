<script setup lang="ts">
import { createGetCachedData } from "$lib/utils/nuxt";

const items = [
	{
		label: "Active",
		icon: "i-heroicons-calendar-20-solid",
	},
	{
		label: "Upcoming",
		icon: "i-heroicons-clock-20-solid",
	},
	{
		label: "Ranked",
		icon: "i-heroicons-fire-20-solid",
	},
];

const router = useRouter();
const route = useRoute();

const selected = computed({
	get() {
		const index = items.findIndex((item) => item.label === route.query.tab);
		if (index === -1) {
			return "0";
		}

		return index.toString();
	},
	set(value) {
		// Hash is specified here to prevent the page from scrolling to the top
		router.replace({ query: { tab: items[Number(value)].label } });
	},
});

const item = computed(() => items[Number(selected.value)].label.toLowerCase());

const { data: events } = await useFetch(() => "/api/events", {
	query: {
		type: item,
	},
});

const nuxtApp = useNuxtApp();
const { data: images } = await useFetch("/api/brawlers", {
	getCachedData: createGetCachedData(nuxtApp),
	transform: (brawlers) =>
		brawlers.list.reduce(
			(acc, brawler) => {
				acc[brawler.id] = {
					id: brawler.id,
					imageUrl: brawler.imageUrl2,
				};
				return acc;
			},
			{} as Record<string, { id: number; imageUrl: string }>
		),
});

if (!selected.value) {
	selected.value = "0";
}

if (!images) {
	throw createError({
		status: 500,
		statusMessage: "Couldn't get images",
	});
}

const type = computed<"active" | "upcoming">(() => items[Number(selected.value)].label.toLowerCase() as "active" | "upcoming");
</script>

<template>
	<UContainer>
		<UPageHeader
			:ui="{ wrapper: 'pt-10', root: 'border-0 pt-8 pb-4' }"
			title="Brawlers"
			description="View the modes and maps happening now, or later!"
		/>
		<UPage>
			<UPageBody class="mt-4!">
				<UTabs v-model="selected" variant="link" :content="false" class="w-full" :items />
				<UPageGrid class="mt-8 gap-5!">
					<EventsEventCard v-for="(event, index) in events" :key="event.map.name" :event :type :images="images!" :index />
				</UPageGrid>
			</UPageBody>
		</UPage>
	</UContainer>
</template>
