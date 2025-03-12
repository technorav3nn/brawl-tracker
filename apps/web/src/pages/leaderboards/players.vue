<script setup lang="ts">
import { type RankingsPlayer } from "@brawltracker/brawl-stars-api";
import { Image } from "@unpic/vue";
import { type BreadcrumbLink } from "#ui/types";

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
		}));
	},
});

const breadcrumb: BreadcrumbLink[] = [
	{ label: "Leaderboards", to: "/leaderboards" },
	{ label: "Players", to: "/leaderboards/players" },
];

const columns = [
	{ label: "Rank", key: "rank", sortable: true },
	{ label: "Name", key: "name", sortable: true },
	{ label: "Club", key: "club" },
	{ label: "Trophies", key: "trophies" },
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
			class="w-full border border-gray-200 dark:border-gray-800 rounded-sm h-max mb-12"
		>
			<template #rank-data="{ row }">
				<p class="text-gray-900 dark:text-white font-semibold">#{{ row.rank }}</p>
			</template>
			<template #name-data="{ row }">
				<div class="flex flex-row gap-4 items-center">
					<Image
						:src="`https://cdn.brawlify.com/profile-icons/regular/${row.icon.id}.png`"
						:alt="row.name"
						loading="lazy"
						class="rounded-xs"
						provider="none"
						width="35"
						height="35"
					/>
					<NuxtLink
						:to="`/players/${encodeURIComponent(row.tag)}`"
						class="hover:text-(--ui-primary)! transition-colors duration-[90ms] text-base text-gray-900 dark:text-white font-semibold"
					>
						{{ row.name }}
					</NuxtLink>
				</div>
			</template>
			<template #club-data="{ row }">
				<UiColorTagText v-if="row.club" :colorTag="row.club.name" />
				<p v-else>No club</p>
			</template>
			<template #trophies-data="{ row }">
				<p class="text-yellow-500 dark:text-yellow-500 font-semibold">{{ row.trophies === 1 ? "100,000+" : row.trophies }}</p>
			</template>
		</UTable>
	</UContainer>
</template>
