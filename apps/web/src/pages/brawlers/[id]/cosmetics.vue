<script setup lang="ts">
import { CDN_URL_V2, type Skin } from "@brawltracker/cdn/v2";
import { Image } from "@unpic/vue";
import { useBrawlerStore } from "$components/features/brawler/brawler-store";
import { useBrawlerCosmeticsStore } from "$components/features/brawler-cosmetics/brawler-cosmetics-store";
import { normalCaseToKebabCase } from "$lib/utils/common";

const { brawler, brawlerCdnData } = storeToRefs(useBrawlerStore());
const { setSkins, setSelectedSkin } = useBrawlerCosmeticsStore();

if (!brawler || !brawlerCdnData) {
	throw createError({ statusCode: 404, message: "Brawler not found" });
}

const unmappedSkins = computed<Skin[]>(() => brawlerCdnData.value!.skins);
const skins = computed<Skin[]>(() =>
	unmappedSkins.value.map((skin) => ({
		...skin,
		url: `${CDN_URL_V2}/brawlers/${brawler.value!.id}/skins/${skin.name}/model.webp`,
	}))
);

watchEffect(() => {
	setSkins(skins.value);
});
setSelectedSkin(skins.value[0]);

const replacements: Record<string, () => VNode> = {
	Gems: () =>
		h(Image, {
			src: "/icons/cosmetics/gems-icon.png",
			width: 20,
			height: 20,
			class: "inline-block !object-scale-down",
		}),
	Bling: () =>
		h(Image, {
			src: "/icons/cosmetics/bling-icon.png",
			width: 20,
			height: 20,
			class: "inline-block align-middle -translate-y-[1.2px]",
		}),
	Coins: () =>
		h(Image, {
			src: "/icons/single-coin-icon.png",
			width: 20,
			height: 20,
			class: "inline-block align-middle -translate-y-[1px]",
		}),
};

function splitStringBySeperators(string: string, seperators: string[]) {
	const regex = new RegExp(`(${seperators.join("|")})`, "g");
	return string.split(regex);
}

function render(cost: string) {
	const seperators = Object.keys(replacements);
	const parts = splitStringBySeperators(cost, seperators);

	return () =>
		parts.map((part) => {
			if (seperators.includes(part)) {
				return replacements[part]();
			}

			return part;
		});
}
</script>

<template>
	<UPage v-if="brawler" class="pb-20">
		<section>
			<UDashboardSection
				class="mb-4"
				title="Skins"
				:description="`View all of the skins for ${brawler.name}`"
				orientation="vertical"
			/>
			<UCarousel v-slot="{ item }" arrows class="w-[105%] !h-96" :items="skins" :ui="{ container: 'gap-1' }">
				<UCard
					:ui="{ body: { base: '!p-2' }, header: { padding: 'px-4 py-3 sm:px-4', footer: 'px-4 py-3 sm:px-4' } }"
					class="w-64 mt-2 ml-1 mr-1 mb-0.5 h-[520px]"
				>
					<template #header>
						<div class="flex justify-between items-center">
							<h2 class="text-lg font-bold truncate">{{ item.name }}</h2>
							<UTooltip :text="item.rarity ?? 'No Rarity'" :popper="{ placement: 'top' }">
								<Image
									:src="`/icons/cosmetics/${normalCaseToKebabCase(item.rarity ?? 'none').toLowerCase()}-skin-icon.png`"
									width="35"
									height="35"
									class="!object-scale-down"
								/>
							</UTooltip>
						</div>
					</template>
					<div class="flex flex-col items-center justify-center">
						<Image :src="item.url" width="180" height="180" loading="lazy" class="!object-scale-down h-80" />
						<Image
							v-if="item.cost?.includes('• S')"
							class="self-start absolute bottom-[28%] -translate-x-2"
							src="/icons/cosmetics/skin-seasonal.png"
							width="50"
							height="50"
						/>
						<Image
							v-else-if="item.cost?.includes('• E')"
							class="self-start absolute bottom-[28%] -translate-x-2"
							src="/icons/cosmetics/skin-exclusive.png"
							width="50"
							height="50"
						/>
					</div>
					<template #footer>
						<div class="flex flex-row gap-2">
							<div class="flex gap-1">
								<div>
									<component :is="render((item.cost as string).replaceAll('• S', '').replaceAll('• E', ''))" v-if="item.cost" />
									<p v-else>Default Skin</p>
								</div>
							</div>
						</div>
					</template>
				</UCard>
			</UCarousel>
		</section>
	</UPage>
</template>
