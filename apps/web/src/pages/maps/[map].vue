<script setup lang="ts">
const {
	params: { map: mapId },
} = useRoute("maps-map");

const { data: map } = await useFetch(`/api/maps/${mapId}`);
const { data: brawlers } = await useFetch("/api/brawlers", { transform: (s) => s.list, key: "brawlers" });

const brawlerSortedUsage = computed(() => {
	return map.value!.stats.sort((a, b) => b.useRate - a.useRate);
});

const chartData = computed(() => {
	return map
		.value!.stats.map((s) => {
			if (Number(s.brawler) === 0) return null;
			const brawler = brawlers.value!.find((b) => b.id === Number(s.brawler));
			return {
				brawler: brawler!.name,
				winRate: s.winRate,
				useRate: s.useRate,
				usageIndex: brawlerSortedUsage.value.findIndex((b) => b.brawler === s.brawler) + 1,
			};
		})
		.filter(Boolean);
});

const selectedSort = ref("Win Rate");
const direction = ref<"asc" | "desc">("asc");
const search = ref("");

const sortedStats = computed(() => {
	if (selectedSort.value === "None") return map.value!.stats;
	const property = selectedSort.value === "Win Rate" ? "winRate" : "useRate";
	const filteredSearch = map.value!.stats.filter((s) =>
		brawlers
			.value!.find((b) => b.id === Number(s.brawler))
			?.name.toLowerCase()
			.includes(search.value.toLowerCase())
	);
	const sortedRates = filteredSearch.sort((a, b) => b[property] - a[property]);
	return direction.value === "asc" ? sortedRates : sortedRates.slice().reverse();
});
</script>

<template>
	<UContainer>
		<UPageHeader
			:title="`${map!.name}`"
			:description="`View the best brawlers and their stats for ${map!.name}.`"
			:ui="{ wrapper: 'pt-10', root: 'border-0 pt-8 pb-6' }"
		>
			<template #description>
				<p>View the best brawlers and their stats for {{ map!.name }}.</p>
				<UButton class="mt-4" icon="i-heroicons-arrow-top-right-on-square-20-solid">View Map Info</UButton>
			</template>
		</UPageHeader>
		<USeparator />
		<UPage>
			<UPageBody class="mt-8 space-y-0">
				<div class="flex items-center justify-center"/>
				<ClientOnly>
					<MapsBrawlerBarChart class="mt-8" :data="chartData as any" />
				</ClientOnly>
				<div class="mt-8 flex flex-col gap-4">
					<div class="flex w-full items-end justify-end gap-2.5">
						<UInput v-model="search" placeholder="Search Brawlers" icon="i-heroicons-magnifying-glass-20-solid" />
						<UFieldGroup>
							<USelect v-model="selectedSort" class="min-w-28" :items="['Win Rate', 'Use Rate']" />
							<UButton
								:icon="direction === 'asc' ? 'i-uil-sort-amount-up' : 'i-uil-sort-amount-down'"
								square
								size="md"
								color="neutral"
								variant="subtle"
								@click="direction = direction === 'asc' ? 'desc' : 'asc'"
							/>
						</UFieldGroup>
					</div>
					<div
						class="grid grid-cols-3 gap-4 min-[400px]:grid-cols-3 min-[500px]:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9"
					>
						<NuxtLink
							v-for="{ brawler: brawlerId, useRate, winRate } in sortedStats"
							:key="brawlerId"
							:to="`/brawlers/${brawlerId}`"
						>
							<UCard
								:ui="{
									header: 'p-0!',
									body: 'p-1.5!',
								}"
								class="cursor-pointer hover:bg-neutral-100/50 hover:ring-2 hover:ring-primary-500 dark:hover:bg-neutral-800/50 dark:hover:ring-primary-400"
							>
								<template #header>
									<NuxtImg
										:src="brawlers?.find((b) => b.id === Number(brawlerId))?.imageUrl2"
										:alt="brawlerId.toString()"
										class="h-full w-full rounded-lg rounded-b-none"
										width="80"
										height="80"
										loading="lazy"
									/>
								</template>
								<div class="flex flex-col items-start justify-center">
									<p class="overflow-hidden text-sm font-semibold text-ellipsis whitespace-nowrap">
										{{ brawlers?.find((b) => b.id === Number(brawlerId))?.name }}
									</p>
									<div class="flex w-full justify-between">
										<p class="truncate text-[0.820rem] font-semibold text-neutral-500 dark:text-neutral-300">Use Rate</p>
										<p class="text-[0.820rem] text-neutral-500 dark:text-neutral-300">{{ useRate }}%</p>
									</div>
									<div class="flex w-full justify-between">
										<p class="truncate text-[0.820rem] font-semibold text-neutral-500 dark:text-neutral-300">Win Rate</p>
										<p class="text-[0.820rem] text-neutral-500 dark:text-neutral-300">{{ winRate }}%</p>
									</div>
								</div>
							</UCard>
						</NuxtLink>
					</div>
				</div>
			</UPageBody>
		</UPage>
	</UContainer>
</template>
