<script setup lang="ts">
import { getSkinsIdsToNames } from "@brawltracker/cdn";
import { formatDistance } from "date-fns";

const { data: unfixedOffers } = useFetch("/api/shop/offers");
const { data: skinIdsToNames } = useAsyncData("skin-ids-to-names", async () => getSkinsIdsToNames());

const offers = computed(() => {
	return unfixedOffers.value!.map((offer) => ({
		...offer,
		items: offer.items.map((item) =>
			item.skinId
				? {
						...item,
						skinName: skinIdsToNames.value![item.skinId],
						name: fixName(item.name!),
					}
				: { ...item, name: fixName(item.name!) }
		),
	}));
});

const NAME_MAPPINGS: Record<string, string> = {
	RecruitToken: "Credits",
	UpgradeMaterial: "Coins",
};
function fixName(name: string) {
	console.log(name);
	return NAME_MAPPINGS[name] ?? name;
}
</script>

<template>
	<UContainer>
		<UPageHero title="Shop" :ui="{ wrapper: 'sm:!pt-16 sm:!pb-8 !pt-8 !pb-4' }">
			<template #description>
				<p>Get the latest offers and deals in the shop.</p>
				<p class="text-sm">Note: Offers like LEVEL UP offers aren't shown, since they're exclusive to some players.</p>
			</template>
		</UPageHero>
		<UPage>
			<UPageBody v-if="offers">
				<UPageGrid class="grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					<UCard v-for="(offer, index) in offers" :key="index">
						<template #header>
							<div class="flex items-center justify-between">
								<div class="text-lg font-semibold">{{ offer.title }}</div>
								<p class="text-sm text-gray-500">
									Ends
									{{
										formatDistance(new Date(offer.endDate), new Date(), {
											addSuffix: true,
										})
									}}
								</p>
							</div>
						</template>
						<template #default>
							<div class="flex flex-wrap gap-x-5">
								<ShopCardItem v-for="item in offer.items" :key="item.typeId" :item />
							</div>
						</template>
					</UCard>
				</UPageGrid>
			</UPageBody>
		</UPage>
	</UContainer>
</template>
