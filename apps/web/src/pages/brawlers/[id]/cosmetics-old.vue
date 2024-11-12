<script setup lang="ts">
import { CDN_URL } from "@brawltracker/cdn";
import { Image } from "@unpic/vue";
import emblaCarouselVue from "embla-carousel-vue";
import { useBrawlerStore } from "$components/features/brawler/brawler-store";

const [emblaMainRef, emblaMainApi] = emblaCarouselVue();
const [emblaThumbsRef, emblaThumbsApi] = emblaCarouselVue({ containScroll: "keepSnaps", axis: "y" });

const selectedIndex = ref(0);

const { brawler, brawlerCdnData } = storeToRefs(useBrawlerStore());

watchEffect(() => {
	emblaMainApi.value?.on("select", () => {
		const selected = emblaMainApi.value?.selectedScrollSnap();
		if (!selected) return;
		selectedIndex.value = selected;
		emblaThumbsApi.value!.scrollTo(emblaMainApi.value!.selectedScrollSnap());
	});
});

if (!brawler || !brawlerCdnData) {
	throw createError({ statusCode: 404, message: "Brawler not found" });
}

const unmappedSkins = computed(() => brawlerCdnData.value!.skins);
const carouselItems = computed(() => unmappedSkins.value.map((skin) => ({ ...skin, url: `${CDN_URL}${(skin as any).path}` })));

function onThumbClick(index: number) {
	if (!emblaMainApi || !emblaThumbsApi) return;
	emblaMainApi.value!.scrollTo(index);
}
</script>

<template>
	<UPage v-if="brawler">
		<UDashboardSection
			title="Skins"
			description="Use the carousel to view all the skins available for this brawler."
			orientation="vertical"
		>
			<!--
 <UCarousel v-slot="{ item }" indicators arrows class="!max-w-[300px]" :items="carouselItems" :ui="{ item: 'basis-full' }">
				<Image loading="lazy" :src="item" width="300" height="450" class="!object-scale-down" />
			</UCarousel> 
-->
			<div class="max-w-[350px]">
				<div ref="emblaMainRef" class="overflow-hidden">
					<div class="flex touch-pan-y touch-pinch-zoom ml-[calc(var(--main-slide-spacing)_*_-1)]">
						<div
							v-for="item in carouselItems"
							:key="item.name"
							class="flex-[0_0_var(--main-slide-size)] min-w-0 pl-[var(--main-slide-spacing)] translate-3d-embla"
						>
							<Image loading="lazy" :src="item.url" width="350" height="500" class="!object-scale-down" />
						</div>
					</div>
				</div>
				<div class="mt-[var(--thumbs-slide-spacing)] !h-[100rem]">
					<div ref="emblaThumbsRef" class="overflow-hidden h-full">
						<div class="flex flex-col ml-[calc(var(--thumbs-slide-spacing)_*_-1)]">
							<div
								v-for="(item, index) in carouselItems"
								:key="index"
								class="flex-[0_0_23%] min-w-0 pl-[var(--thumbs-slide-spacing)]"
							>
								<button
									type="button"
									class="rounded inline-flex border-2 border-border w-full h-[180%] text-sm items-center justify-center"
									@click="onThumbClick(index)"
								>
									<div class="px-20">
										{{ item.name }}
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</UDashboardSection>
	</UPage>
</template>

<style>
:root {
	--main-slide-height: 18rem;
	--main-slide-spacing: 1rem;
	--main-slide-size: 100%;
	--thumbs-slide-spacing: 0.4rem;
	--thumbs-slide-height: 6rem;
}
.translate-3d-embla {
	transform: translate3d(0, 0, 0);
}
</style>
