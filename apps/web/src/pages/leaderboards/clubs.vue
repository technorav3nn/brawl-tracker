<script setup lang="ts">
import { type RankingClub } from "@brawltracker/brawl-stars-api";
import { Image } from "@unpic/vue";
import { type BreadcrumbLink } from "#ui/types";

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

const breadcrumb: BreadcrumbLink[] = [
	{ label: "Leaderboards", to: "/leaderboards" },
	{ label: "Clubs", to: "/leaderboards/clubs" },
];

const columns = [
	{ label: "Rank", key: "rank", sortable: true },
	{ label: "Name", key: "name", sortable: true },
	{ label: "Trophies", key: "trophies", sortable: true },
];

const search = ref("");
const filteredRows = computed(() => {
	if (!leaderboards.value) return [];
	return leaderboards.value.filter((row) => row.name.toLowerCase().includes(search.value.toLowerCase()));
});

const numberFormatter = new Intl.NumberFormat("en-US");
</script>

<template>
	<UContainer>
		<UPageHeader class="mb-12" title="Clubs" description="View the best clubs in Brawl Stars!">
			<template #headline>
				<UBreadcrumb :links="breadcrumb" />
			</template>
		</UPageHeader>
		<div class="flex mb-4 justify-start gap-2">
			<UInput v-model="search" placeholder="Search for a player..." icon="i-heroicons-magnifying-glass-20-solid" />
			<LeaderboardsLocationSelectMenu />
		</div>
		<UTable
			:loading="status === 'pending'"
			:rows="status === 'pending' ? [] : filteredRows"
			:columns="columns"
			:loading-state="{
				icon: 'i-heroicons-arrow-path-20-solid',
				label: 'Loading...',
			}"
			:progress="{
				color: 'primary',
				animation: 'carousel',
			}"
			:ui="{ divide: 'divide-gray-200 dark:divide-gray-800', td: { padding: 'py-2 px-4' } }"
			class="w-full border border-gray-200 dark:border-gray-800 rounded h-max mb-12"
		>
			<template #rank-data="{ row }">
				<p class="text-gray-900 dark:text-white font-semibold">#{{ row.rank }}</p>
			</template>
			<template #name-data="{ row }">
				<div class="flex flex-row gap-4 items-center">
					<Image
						:src="`https://cdn.brawlify.com/club-badges/regular/${row.badgeId}.png`"
						:alt="row.name"
						loading="lazy"
						class="rounded-sm"
						provider="none"
						width="30"
						height="30"
					/>
					<NuxtLink
						:to="`/clubs/${encodeURIComponent(row.tag)}`"
						class="hover:!text-primary transition-colors duration-[90ms] text-base text-gray-900 dark:text-white font-semibold"
					>
						{{ row.name }}
					</NuxtLink>
				</div>
			</template>
			<template #trophies-data="{ row }">
				<p class="text-yellow-500 dark:text-yellow-500 font-semibold">{{ numberFormatter.format(row.trophies) }}</p>
			</template>
		</UTable>
	</UContainer>
</template>
