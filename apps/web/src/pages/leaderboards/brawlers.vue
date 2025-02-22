<script setup lang="ts">
import { type RankingsPlayer } from "@brawltracker/brawl-stars-api";
import { Image } from "@unpic/vue";
import { type BreadcrumbLink } from "#ui/types";

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

const breadcrumb: BreadcrumbLink[] = [
	{ label: "Leaderboards", to: "/leaderboards" },
	{ label: "Brawlers", to: "/leaderboards/Brawlers" },
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
		<UPageHeader class="mb-12" title="Brawlers" :description="description">
			<template #headline>
				<UBreadcrumb :links="breadcrumb" />
			</template>
		</UPageHeader>
		<div class="flex mb-4 justify-start gap-2">
			<UInput v-model="search" placeholder="Search for a player..." icon="i-heroicons-magnifying-glass-20-solid" />
			<LeaderboardsLocationSelectMenu />
			<LeaderboardsBrawlerSelectMenu />
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
						:src="`https://cdn.brawlify.com/profile-icons/regular/${row.icon.id}.png`"
						:alt="row.name"
						loading="lazy"
						class="rounded-sm"
						provider="none"
						width="35"
						height="35"
					/>
					<NuxtLink
						:to="`/players/${encodeURIComponent(row.tag)}`"
						class="hover:!text-primary transition-colors duration-[90ms] text-base text-gray-900 dark:text-white font-semibold"
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
