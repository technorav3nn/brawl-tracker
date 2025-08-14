<script setup lang="ts">
import { useBrawlerListStore } from "$components/features/brawler-list/brawler-list-store";

const { data: brawlers, status } = useLazyQuery(brawlersQuery());

const brawlerList = useBrawlerListStore();
const { groupingMode, groupedBrawlers, search } = storeToRefs(brawlerList);

watchEffect(() => {
	if (brawlers.value) {
		brawlerList.setBrawlers(brawlers.value!);
	}
});

const gridClasses =
	"mt-3 grid grid-cols-3 justify-items-center gap-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9";
const rarityColorClasses = {
	"Ultra Legendary": "text-[#9dffd5]",
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
		<UPageHeader
			:ui="{ wrapper: 'pt-10' }"
			title="Brawlers"
			description="Every Brawler in Brawl Stars, select one to get detailed information."
		/>
		<UPage>
			<UPageBody class="space-y-0">
				<div class="flex justify-between gap-1.5">
					<UInput
						v-model="search"
						icon="i-heroicons-magnifying-glass-20-solid"
						size="md"
						:trailing="false"
						placeholder="Search..."
					/>
					<USelect
						v-model="brawlerList.groupingMode"
						:items="['None', 'Class', 'Rarity']"
						icon="i-heroicons-adjustments-horizontal"
						placeholder="Group by"
						class="w-36"
					>
					</USelect>
				</div>
				<UPageGrid v-if="status === 'pending'" :class="gridClasses" class="h-full! w-full!">
					<div v-for="i in 60" :key="i" class="flex h-full! w-full! flex-col gap-1">
						<USkeleton class="h-full! w-full! rounded-b-none">
							<img width="300" height="300" src="" :alt="undefined" class="indent-[-200vw]!" />
						</USkeleton>
						<USkeleton class="h-[76px] w-full rounded-t-none" />
					</div>
				</UPageGrid>
				<UPageGrid
					v-else-if="(groupingMode === 'None' || groupingMode === '') && Array.isArray(groupedBrawlers)"
					:class="gridClasses"
				>
					<BrawlerListCard v-for="brawler in groupedBrawlers" :key="brawler.id" :brawler="brawler" showRarity />
				</UPageGrid>
				<div v-else-if="groupingMode !== 'None' && !Array.isArray(groupedBrawlers)" class="mt-2 flex flex-col gap-3">
					<div v-for="(group, value) in groupedBrawlers" :key="value">
						<div :class="rarityColorClasses[value as keyof typeof rarityColorClasses]" class="text-2xl font-medium">
							{{ value }}
							<span class="text-sm font-medium text-gray-400 dark:text-gray-500">({{ group.length }})</span>
						</div>
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
