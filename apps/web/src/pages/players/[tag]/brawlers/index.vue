<script setup lang="ts">
import { USkeleton } from "#components";
import { createGetCachedData } from "$lib/utils/nuxt";

const route = useRoute("players-tag-brawlers");
const nuxtApp = useNuxtApp();

const { data: player, status } = await useLazyFetch("/api/players", {
	getCachedData: createGetCachedData(nuxtApp, `players-${route.params.tag}`),
	query: { tag: route.params.tag },
	key: `players-${route.params.tag}`,
});
const { data: brawlers, status: brawlerStatus } = await useLazyFetch("/api/brawlers", {
	getCachedData: createGetCachedData(nuxtApp),
	key: "brawlers",
	transform: (d) => d.list.filter((brawler) => brawler.released),
});

const sort = ref<"Level" | "Name" | "Rank" | "Trophies">("Trophies");
const sortDirection = ref<"ascending" | "descending">("descending");
const resolvedBrawlers = computed(() => (player.value ? player.value.brawlers : []));
const sortedBrawlers = useSorted(resolvedBrawlers, (a, b) => {
	if (sort.value === "Name") {
		if (sortDirection.value === "ascending") return b.name.localeCompare(a.name);
		if (sortDirection.value === "descending") return a.name.localeCompare(b.name);
	} else if (sort.value === "Level") {
		if (sortDirection.value === "ascending") return a.power - b.power;
		if (sortDirection.value === "descending") return b.power - a.power;
	} else if (sort.value === "Trophies") {
		if (sortDirection.value === "ascending") return a.trophies - b.trophies;
		if (sortDirection.value === "descending") return b.trophies - a.trophies;
	} else if (sort.value === "Rank") {
		if (sortDirection.value === "ascending") return a.rank - b.rank;
		if (sortDirection.value === "descending") return b.rank - a.rank;
	}

	return 0;
});
const search = ref("");
const searchedAndSortedBrawlers = useArrayFilter(sortedBrawlers, (b) =>
	b.name.toLowerCase().includes(search.value.toLowerCase())
);

const ownedBrawlers = computed(() => {
	if (!player.value || !brawlers.value) return [];
	return brawlers.value.filter((brawler) => player.value!.brawlers.some((owned) => owned.id === brawler.id));
});
</script>

<template>
	<UDashboardSection
		class="divide-y-0"
		title="Brawlers"
		description="Select one of the players brawlers to view their stats"
		orientation="vertical"
		:ui="{ inner: 'w-full [&>div]:!w-full ' }"
	>
		<template #title>
			<div class="flex items-center gap-1.5">
				<p>Brawlers</p>
				<span>
					<div class="flex items-center flex-row gap-2">
						<p
							v-if="status === 'success' && brawlerStatus === 'success'"
							class="text-gray-800 dark:text-white dark:text-opacity-80 text-opacity-80"
						>
							({{ ownedBrawlers.length }} / {{ brawlers!.length }})
						</p>
						<USkeleton v-else class="h-6 w-20" />
					</div>
				</span>
			</div>
		</template>
		<template #description>
			<div class="flex justify-between w-full items-start">
				<p class="text-gray-400 text-sm">Select one of the players brawlers to view their stats</p>
				<div class="flex gap-3">
					<UButtonGroup size="sm" class="min-w-30">
						<UInput v-model="search" size="sm" color="white" class="w-full" placeholder="Search..." />
						<UButton icon="i-heroicons-magnifying-glass" color="gray" />
					</UButtonGroup>
					<UButtonGroup size="sm" class="min-w-20">
						<USelectMenu v-model="sort" :options="['Trophies', 'Level', 'Rank', 'Name']" size="sm" color="white" />
						<UButton
							:icon="
								sortDirection === 'ascending' ? 'i-heroicons-bars-arrow-up-20-solid' : 'i-heroicons-bars-arrow-down-20-solid'
							"
							color="gray"
							@click="sortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending'"
						/>
					</UButtonGroup>
				</div>
			</div>
		</template>

		<UPageGrid
			class="!pt-7"
			:ui="{ wrapper: 'xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-y-12' }"
		>
			<template v-if="status === 'pending' || brawlerStatus === 'pending'">
				<USkeleton v-for="i in 20" :key="i" class="h-[145px] w-full" />
			</template>
			<template v-else>
				<NuxtLink
					v-for="brawler in searchedAndSortedBrawlers"
					:key="brawler.id"
					:to="`/players/${encodeURIComponent(route.params.tag)}/brawlers/${brawler.id}`"
				>
					<PlayersPlayerBrawler :brawler="brawlers?.find((b) => b.id === brawler.id)!" :playerBrawler="brawler" />
				</NuxtLink>
			</template>
		</UPageGrid>
	</UDashboardSection>
</template>
