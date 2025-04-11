<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/types";
import { createGetCachedData } from "$lib/utils/nuxt";

definePageMeta({
	middleware: (to, from) => {
		if (from && from.path === to.path) {
			return;
		}

		const query = to.query as Record<string, string>;
		if (!query.tab) {
			return navigateTo({ query: { tab: "Active" }, name: "events" });
		}
	},
});

const router = useRouter();
const route = useRoute();

const items: NavigationMenuItem[] = [
	{
		label: "Active",
		icon: "i-heroicons-calendar-20-solid",
		to: "/events?tab=Active",
		exact: true,
		exactQuery: true,
	},
	{
		label: "Upcoming",
		icon: "i-heroicons-clock-20-solid",
		to: "/events?tab=Upcoming",
		exact: true,
		exactQuery: true,
	},
	{
		label: "Ranked",
		icon: "i-heroicons-fire-20-solid",
		to: "/events?tab=Ranked",
		exact: true,
		exactQuery: true,
	},
];

// Tab selection handling
const selected = computed({
	get() {
		const index = items.findIndex((item) => item.label === route.query.tab);
		return index === -1 ? "0" : index.toString();
	},
	set(value) {
		router.replace({ query: { tab: items[Number(value)]!.label } });
	},
});

if (!selected.value) {
	selected.value = "0";
}

const item = computed(() => items[Number(selected.value)]!.label!.toLowerCase());
const type = computed<"active" | "upcoming">(() => item.value as "active" | "upcoming");

const nuxtApp = useNuxtApp();
const { data, status } = await useLazyAsyncData(
	`events-${item.value}`,
	async () => {
		const [events, brawlers] = await Promise.all([
			$fetch("/api/events", {
				query: { type: item.value },
			}),
			$fetch("/api/brawlers"),
		]);
		return { events, brawlers };
	},
	{
		getCachedData: createGetCachedData(nuxtApp),
		watch: [item],
		transform: ({ events, brawlers }) => {
			const newImages = brawlers.list.reduce(
				(acc, brawler) => {
					acc[brawler.id] = {
						id: brawler.id,
						imageUrl: brawler.imageUrl2,
					};
					return acc;
				},
				{} as Record<string, { id: number; imageUrl: string }>
			);
			// sort events if their showdown to the top, then the rest doesn't matter, solo showdown first, then duo showdown, then trio showdown
			const newEvents = events.sort((a, b) => {
				const aIsShowdown = a.map.gameMode.name.includes("Showdown");
				const bIsShowdown = b.map.gameMode.name.includes("Showdown");
				if (aIsShowdown && !bIsShowdown) {
					return -1;
				}

				if (!aIsShowdown && bIsShowdown) {
					return 1;
				}

				if (aIsShowdown && bIsShowdown) {
					const aIsSolo = a.map.gameMode.name.includes("Solo");
					const bIsSolo = b.map.gameMode.name.includes("Solo");
					if (aIsSolo && !bIsSolo) {
						return -1;
					}

					if (!aIsSolo && bIsSolo) {
						return 1;
					}

					const aIsDuo = a.map.gameMode.name.includes("Duo");
					const bIsDuo = b.map.gameMode.name.includes("Duo");
					if (aIsDuo && !bIsDuo) {
						return -1;
					}

					if (!aIsDuo && bIsDuo) {
						return 1;
					}
				}

				return 0;
			});
			return { events: newEvents, images: newImages };
		},
	}
);
</script>

<template>
	<UContainer>
		<UPageHeader
			:ui="{ wrapper: 'pt-10', root: 'border-0 pt-8 pb-4' }"
			title="Events"
			description="View the modes and maps happening now, or later!"
		/>
		<UPage>
			<UPageBody class="mt-4!">
				<!-- Navigation tabs -->
				<UNavigationMenu
					variant="pill"
					highlight
					:ui="{
						link: 'after:h-[2px] after:absolute after:-bottom-2 after:inset-x-0 ',
						linkLabel: 'overflow-clip text-wrap',
						linkLeadingIcon: 'size-[15px] sm:size-5',
					}"
					class="border-b border-neutral-200 data-[orientation=vertical]:w-48 dark:border-neutral-800"
					:items="items"
				/>

				<!-- Content grid -->
				<UPageGrid class="mt-8 gap-5!">
					<!-- Loading state -->
					<template v-if="status === 'pending'">
						<UCard v-for="index in 10" :key="index" variant="outline" class="!p-0" :ui="{ body: '!p-0' }">
							<USkeleton class="h-[176px] w-full" />
						</UCard>
					</template>

					<!-- Events display -->
					<template v-else>
						<EventsEventCard
							v-for="(event, index) in data?.events"
							:key="event.map.id"
							:event="event"
							:type="type"
							:images="data!.images"
							:index="index"
						/>
					</template>
				</UPageGrid>
			</UPageBody>
		</UPage>
	</UContainer>
</template>
