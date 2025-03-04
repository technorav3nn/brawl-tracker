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
		<UPageHero
			:title="`${map!.name}`"
			:description="`View the best brawlers and their stats for ${map!.name}.`"
			:ui="{ wrapper: 'sm:!pt-16 sm:!pb-8 !pt-8 !pb-4' }"
		>
			<template #description>
				<p>View the best brawlers and their stats for {{ map!.name }}.</p>
				<UButton class="mt-4" icon="i-heroicons-arrow-top-right-on-square-20-solid">View Map Info</UButton>
			</template>
		</UPageHero>
		<UDivider />
		<UPage>
			<UPageBody class="!mt-8">
				<div class="flex justify-center items-center"></div>
				<ClientOnly>
					<MapsBrawlerBarChart class="mt-8" :data="chartData as any" />
				</ClientOnly>
				<div class="flex flex-col mt-8 gap-4">
					<div class="flex justify-end items-end w-full gap-2.5">
						<UInput v-model="search" placeholder="Search Brawlers" />
						<UButtonGroup>
							<USelectMenu v-model="selectedSort" class="min-w-28" :options="['Win Rate', 'Use Rate']" />
							<UButton
								:icon="direction === 'asc' ? 'i-uil-sort-amount-up' : 'i-uil-sort-amount-down'"
								square
								size="md"
								color="gray"
								@click="direction = direction === 'asc' ? 'desc' : 'asc'"
							/>
						</UButtonGroup>
					</div>
					<div
						class="grid grid-cols-3 min-[400px]:grid-cols-3 min-[500px]:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 gap-4"
					>
						<UPageCard
							v-for="{ brawler: brawlerId, useRate, winRate } in sortedStats"
							:key="brawlerId"
							:ui="{
								header: { padding: '!p-0' },
								body: { padding: '!p-1.5' },
							}"
							:to="`/brawlers/${brawlerId}`"
						>
							<template #header>
								<NuxtImg
									:src="brawlers?.find((b) => b.id === Number(brawlerId))?.imageUrl2"
									:alt="brawlerId.toString()"
									class="w-full h-full rounded-lg rounded-b-none"
									width="80"
									height="80"
									loading="lazy"
								/>
							</template>
							<div class="flex flex-col items-start justify-center">
								<p class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
									{{ brawlers?.find((b) => b.id === Number(brawlerId))?.name }}
								</p>
								<div class="flex justify-between w-full">
									<p class="text-[0.820rem] font-semibold truncate text-gray-500 dark:text-gray-300">Use Rate</p>
									<p class="text-[0.820rem] text-gray-500 dark:text-gray-300">{{ useRate }}%</p>
								</div>
								<div class="flex justify-between w-full">
									<p class="text-[0.820rem] font-semibold truncate text-gray-500 dark:text-gray-300">Win Rate</p>
									<p class="text-[0.820rem] text-gray-500 dark:text-gray-300">{{ winRate }}%</p>
								</div>
							</div>
						</UPageCard>
					</div>
				</div>
			</UPageBody>
		</UPage>
	</UContainer>
</template>
