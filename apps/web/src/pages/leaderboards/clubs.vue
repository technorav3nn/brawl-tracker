<script setup lang="ts">
import { type RankingClub } from "@brawltracker/brawl-stars-api";
import { Image } from "@unpic/vue";
import { NuxtLink } from "#components";
import type { BreadcrumbItem, TableColumn } from "#ui/types";
import { createSortingButton } from "$lib/utils/table";

definePageMeta({
	middleware: "loading-indicator-disabled",
});

const title = "Clubs Leaderboard";
const description = "View the best clubs in Brawl Stars!";

useSeoMeta({
	title: "Clubs Leaderboard",
	description: "View the best clubs in Brawl Stars!",
	ogTitle: title,
	ogDescription: description,
});

const router = useRouter();

const query = computed(() => ({
	location: (router.currentRoute.value.query.location as string) ?? "global",
	type: "clubs",
}));

const { data: leaderboards, status } = await useLazyFetch<RankingClub[]>("/api/leaderboards", {
	query,
	transform: (d) => (d as any).items as RankingClub[],
});

const breadcrumb: BreadcrumbItem[] = [
	{ label: "Leaderboards", to: "/leaderboards" },
	{ label: "Clubs", to: "/leaderboards/clubs" },
];

const formatter = new Intl.NumberFormat("en-US");

const columns: TableColumn<RankingClub>[] = [
	{
		header: ({ column }) => {
			return createSortingButton(column, "Rank");
		},
		accessorKey: "rank",
		enableSorting: true,
		cell: ({ row }) => {
			return h("p", { class: "font-semibold text-gray-900 dark:text-white" }, `#${row.original.rank}`);
		},
	},
	{
		header: "Name",
		accessorKey: "name",
		enableSorting: true,
		cell: ({ row }) => {
			return h("div", { class: "flex flex-row items-center gap-4" }, [
				h(Image, {
					src: `https://cdn.brawlify.com/club-badges/regular/${row.original.badgeId}.png`,
					alt: row.original.name,
					loading: "lazy",
					class: "rounded-xs",
					provider: "none",
					width: "30",
					height: "30",
				}),
				h(
					NuxtLink,
					{
						to: `/clubs/${encodeURIComponent(row.original.tag)}`,
						class:
							"text-base font-semibold text-gray-900 transition-colors duration-[90ms] hover:text-(--ui-primary)! dark:text-white",
					},
					row.original.name
				),
			]);
		},
	},
	{
		header: ({ column }) => {
			return createSortingButton(column, "Rank");
		},
		accessorKey: "trophies",
		enableSorting: true,
		cell: ({ row }) => {
			return h("p", { class: "font-semibold text-yellow-500 dark:text-yellow-500" }, formatter.format(row.original.trophies));
		},
	},
];

const globalFilter = ref("");
</script>

<template>
	<UContainer>
		<UPageHeader class="mb-12" title="Clubs" description="View the best clubs in Brawl Stars!">
			<template #headline>
				<UBreadcrumb :links="breadcrumb" />
			</template>
		</UPageHeader>
		<div class="mb-4 flex justify-start gap-2">
			<UInput v-model="globalFilter" placeholder="Search for a player..." icon="i-heroicons-magnifying-glass-20-solid" />
			<LeaderboardsLocationSelectMenu />
		</div>
		<UTable
			v-model:globalFilter="globalFilter"
			:loading="status === 'pending'"
			:data="status === 'pending' ? [] : leaderboards!"
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
