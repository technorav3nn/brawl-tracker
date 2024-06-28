<script setup lang="ts">
import { useBrawlerListStore } from "$components/features/brawler-list/brawler-list-store";

const { data: brawlers } = await useFetch("/api/brawlers", { transform: (r) => r.list });

const brawlerList = useBrawlerListStore();
const { groupingMode, groupedBrawlers, search } = storeToRefs(brawlerList);

watchEffect(() => {
	if (brawlers) {
		brawlerList.setBrawlers(brawlers.value!);
	}
});

const gridClasses =
	"mt-3 grid grid-cols-3 justify-items-center gap-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10";
const rarityColorClasses = {
	Legendary: "text-yellow-400",
	Mythic: "text-red-400",
	Epic: "text-purple-400",
	"Super Rare": "text-blue-400",
	Rare: "text-green-400",
	Common: "text-gray-400",
};
</script>

<template>
	<UContainer>
		<UPageHero
			title="Brawlers"
			description="Every Brawler in Brawl Stars, select one to get detailed information."
			:ui="{ wrapper: 'sm:!pt-16 sm:!pb-8 !pt-8 !pb-4' }"
		/>
		<UPage>
			<UPageBody v-if="brawlers">
				<div class="flex justify-between">
					<UInput
						v-model="search"
						icon="i-heroicons-magnifying-glass-20-solid"
						size="sm"
						color="white"
						:trailing="false"
						placeholder="Search..."
					/>
					<USelectMenu
						v-model="brawlerList.groupingMode"
						:options="['None', 'Class', 'Rarity']"
						icon="i-heroicons-adjustments-horizontal"
						placeholder="Group by"
						class="w-36"
					>
					</USelectMenu>
				</div>
				<UPageGrid
					v-if="(groupingMode === 'None' || groupingMode === '') && Array.isArray(groupedBrawlers)"
					:class="gridClasses"
				>
					<BrawlerListCard
						v-for="brawler in groupedBrawlers"
						:key="brawler.id"
						:brawler="brawler"
						showRarity
					/>
				</UPageGrid>
				<div
					v-else-if="groupingMode !== 'None' && !Array.isArray(groupedBrawlers)"
					class="flex flex-col gap-3 mt-2"
				>
					<div v-for="(group, value) in groupedBrawlers" :key="value">
						<h2
							:class="rarityColorClasses[value as keyof typeof rarityColorClasses]"
							class="text-2xl font-medium"
						>
							{{ value }}
							<span class="text-sm font-medium text-gray-400 dark:text-gray-500">({{ group.length }})</span>
						</h2>
						<UPageGrid :class="gridClasses">
							<BrawlerListCard
								v-for="brawler in group"
								:key="brawler.id"
								:brawler="brawler"
								:showRarity="groupingMode === 'Class'"
							/>
						</UPageGrid>
					</div>
				</div>
			</UPageBody>
		</UPage>
	</UContainer>
</template>
