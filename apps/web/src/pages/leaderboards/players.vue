<script setup lang="ts">
import { type RankingsPlayer } from "@brawltracker/brawl-stars-api";
import { Image } from "@unpic/vue";
import { NuxtLink, UiColorTagText } from "#components";
import type { BreadcrumbItem, TableColumn } from "#ui/types";
import { createSortingButton } from "$lib/utils/table";

definePageMeta({
	middleware: "loading-indicator-disabled",
});

const title = "Players Leaderboard";
const description = "View the best players in Brawl Stars!";

useSeoMeta({
	title: "Players Leaderboard",
	description: "View the best players in Brawl Stars!",
	ogTitle: title,
	ogDescription: description,
});

const router = useRouter();

const query = computed(() => ({
	location: (router.currentRoute.value.query.location as string) ?? "global",
	type: "players",
}));

const { data: leaderboards, status } = await useLazyFetch<(RankingsPlayer & { rank: number })[]>("/api/leaderboards", {
	query,
	transform: (data) => {
		const items = (data as any).items as RankingsPlayer[];
		return items.map((item, index) => ({
			...item,
			rank: index + 1,
			trophies: item.trophies === 0 ? 100000 : item.trophies,
		}));
	},
});

const breadcrumb: BreadcrumbItem[] = [
	{ label: "Leaderboards", to: "/leaderboards" },
	{ label: "Players", to: "/leaderboards/players" },
];

const formatter = new Intl.NumberFormat("en-US");

const columns: TableColumn<RankingsPlayer & { rank: number }>[] = [
	{
		header: ({ column }) => {
			return createSortingButton(column, "Rank");
		},
		accessorKey: "rank",
		enableSorting: true,
		cell: (d) => h("p", { class: "font-semibold text-gray-900 dark:text-white" }, `#${d.row.original.rank}`),
	},
	{
		header: "Name",
		accessorKey: "name",
		enableSorting: true,
		cell: (d) =>
			h("div", { class: "flex flex row items-center gap-4" }, [
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
						class:
							"text-base font-semibold text-gray-900 transition-colors duration-[90ms] hover:text-(--ui-primary)! dark:text-white",
					},
					d.row.original.name
				),
			]),
	},
	{
		header: "Club",
		accessorKey: "club",
		cell: (d) =>
			h(UiColorTagText, {
				colorTag: d.row.original.club?.name ?? "No club",
			}),
	},
	{
		accessorKey: "trophies",
		enableSorting: true,
		header: ({ column }) => {
			return createSortingButton(column, "Trophies");
		},
		sortingFn: (a, b) => {
			if (a.original.trophies === 1 || b.original.trophies === 1) {
				// 100,000+ trophies, set them equal to 100,000
				return a.original.trophies === b.original.trophies ? 0 : a.original.trophies === 1 ? 1 : -1;
			}

			return a.original.trophies - b.original.trophies;
		},
		cell: (d) => {
			const { trophies } = d.row.original;
			const newTrophies = trophies === 1 ? `${formatter.format(100000)}+` : formatter.format(trophies);
			return h("p", { class: "font-semibold text-yellow-500 dark:text-yellow-500" }, newTrophies);
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
		<UPageHeader class="mb-12" title="Players" description="View the best players in Brawl Stars!">
			<template #headline>
				<UBreadcrumb :links="breadcrumb" />
			</template>
		</UPageHeader>
		<div class="mb-4 flex justify-start gap-2">
			<UInput v-model="search" placeholder="Search for a player..." icon="i-heroicons-magnifying-glass-20-solid" />
			<LeaderboardsLocationSelectMenu />
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
			:ui="{ root: 'divide-neutral-200 dark:divide-neutral-800', td: 'py-2 px-4' }"
			class="mb-12 h-max w-full rounded-sm border border-(--ui-border-accented)"
		/>
	</UContainer>
</template>
