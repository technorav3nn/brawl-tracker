<script setup lang="ts">
import { type RankingsPlayer } from "@brawltracker/brawl-stars-api";
import { Image } from "@unpic/vue";
import { NuxtLink, UiColorTagText } from "#components";
import type { BreadcrumbItem, TableColumn } from "#ui/types";

definePageMeta({
	middleware: "loading-indicator-disabled",
});

const title = "Brawler Leaderboard";
const description = "View the brawlers and the players with their highest trophies in Brawl Stars!";

useSeoMeta({
	title,
	description,
	ogTitle: title,
	ogDescription: description,
});

const router = useRouter();

const query = computed(() => ({
	location: (router.currentRoute.value.query.location as string) ?? "global",
	type: "brawlers",
	brawler: (router.currentRoute.value.query.brawler as string) ?? 16000000,
}));

const { data: leaderboards, status } = await useLazyFetch<RankingsPlayer[]>("/api/leaderboards", {
	query,
	transform: (data) => {
		return (data as any).items as RankingsPlayer[];
	},
});

const breadcrumb: BreadcrumbItem[] = [
	{ label: "Leaderboards", to: "/leaderboards" },
	{ label: "Brawlers", to: "/leaderboards/Brawlers" },
];

const columns: TableColumn<RankingsPlayer>[] = [
	{
		header: "Rank",
		accessorKey: "rank",
		enableSorting: true,
		cell: (d) => h("p", { class: "font-semibold text-neutral-900 dark:text-white" }, `#${d.row.original.rank}`),
	},
	{
		header: "Name",
		accessorKey: "name",
		enableSorting: true,
		cell: (d) =>
			h("div", { class: "flex flex-row items-center gap-4" }, [
				h(Image, {
					src: `https://cdn.brawlify.com/profile-icons/regular/${d.row.original.icon.id}.png`,
					alt: d.row.original.name,
					loading: "lazy",
					class: "rounded-xs",
					provider: "none",
					width: 35,
					height: 35,
				}),
				h(
					NuxtLink,
					{
						to: `/players/${encodeURIComponent(d.row.original.tag)}`,
						class: "text-base font-semibold text-neutral-900 transition-colors duration-90 hover:text-ui-primary dark:text-white",
					},
					d.row.original.name
				),
			]),
	},
	{
		header: "Club",
		accessorKey: "club",
		cell: (d) => {
			if (d.row.original.club) {
				return h(UiColorTagText, { colorTag: d.row.original.club.name });
			}

			return h("p", "No club");
		},
	},
	{
		header: "Trophies",
		accessorKey: "trophies",

		cell: (d) => {
			return h(
				"p",
				{ class: "font-semibold text-yellow-500 dark:text-yellow-500" },
				d.row.original.trophies === 1 ? "100,000+" : d.row.original.trophies
			);
		},
	},
];

const search = ref("");
const filteredRows = computed(() => {
	if (!leaderboards.value) return [];
	return leaderboards.value.filter((row) => row.name.toLowerCase().includes(search.value.toLowerCase()));
});
</script>

<template>
	<UContainer>
		<UPageHeader class="mb-12" title="Brawlers" :description="description">
			<template #headline>
				<UBreadcrumb :links="breadcrumb" />
			</template>
		</UPageHeader>
		<div class="mb-4 flex justify-start gap-2">
			<UInput v-model="search" placeholder="Search for a player..." icon="i-heroicons-magnifying-glass-20-solid" />
			<LeaderboardsLocationSelectMenu />
			<LeaderboardsBrawlerSelectMenu />
		</div>
		<UTable
			:loading="status === 'pending'"
			:data="status === 'pending' ? [] : filteredRows"
			:columns="columns"
			:loading-state="{
				icon: 'i-heroicons-arrow-path-20-solid',
				label: 'Loading...',
			}"
			:progress="{
				color: 'primary',
				animation: 'carousel',
			}"
			:ui="{ td: 'py-2 px-4' }"
			class="mb-12 h-max w-full rounded-sm border border-(--ui-border-accented)"
		/>
	</UContainer>
</template>
