<script setup lang="ts">
import { CDN_URL } from "@brawltracker/cdn";
import { Image } from "@unpic/vue";
import type { EmblaCarouselVueType } from "embla-carousel-vue";
import { useBrawlerStore } from "$components/features/brawler/brawler-store";

interface EmblaRef {
	emblaApi: EmblaCarouselVueType[1]["value"];
}

const selectedIndex = ref(0);
const mainCarouselRef = useTemplateRef<EmblaRef>("main-carousel-ref");
const thumbsCarouselRef = useTemplateRef<EmblaRef>("thumbs-carousel-ref");

const { brawler, brawlerCdnData } = storeToRefs(useBrawlerStore());

watchEffect(() => {
	mainCarouselRef.value?.emblaApi?.on("select", () => {
		console.log("select");
		const { emblaApi: mainEmblaApi } = mainCarouselRef.value!;
		const selected = mainEmblaApi!.selectedScrollSnap();
		if (!selected) return;
		selectedIndex.value = selected;
		thumbsCarouselRef.value?.emblaApi!.scrollTo(mainEmblaApi!.selectedScrollSnap());
	});
});

if (!brawler || !brawlerCdnData) {
	throw createError({ statusCode: 404, message: "Brawler not found" });
}

const unmappedSkins = computed(() => brawlerCdnData.value!.skins);
const carouselItems = computed(() =>
	unmappedSkins.value.map((skin, index) => ({ ...skin, url: `${CDN_URL}${(skin as any).path}`, index }))
);

function onThumbClick(index: number) {
	if (!mainCarouselRef.value?.emblaApi) return;
	mainCarouselRef.value.emblaApi.scrollTo(index);
}
</script>

<template>
	<UPage>
		<div class="flex flex-col sm:flex-row gap-20 justify-start items-start mt-20 ml-12">
			<UiCarousel
				v-slot="{ item }"
				ref="main-carousel-ref"
				dots
				class-names
				arrows
				:items="carouselItems"
				:ui="{
					item: 'basis-[100%]',
					container: 'transition-[height] max-w-[265px]',
				}"
				class="w-min"
			>
				<div class="w-[220px]">
					<p class="text-white text-md font-medium text-center">{{ item.name }}</p>
					<Image loading="lazy" :src="item.url" width="220" height="410" class="!object-scale-down" />
				</div>
			</UiCarousel>
			<div>
				<UiCarousel
					v-slot="{ item }"
					ref="thumbs-carousel-ref"
					class-names
					arrows
					:items="carouselItems"
					class="w-full h-[420px] hidden sm:block"
					:ui="{ container: 'h-[420px] -mt-2', item: 'basis-[1%] pt-2 w-28' }"
					orientation="vertical"
				>
					<div
						class="flex flex-col items-center cursor-pointer border border-border rounded-md px-2 py-1"
						@click="onThumbClick(item.index)"
					>
						<Image loading="lazy" :src="item.url" width="50" height="50" class="!object-scale-down" />
						<p class="text-white text-sm text-center">{{ item.name }}</p>
					</div>
				</UiCarousel>
				<UiCarousel
					v-slot="{ item }"
					ref="thumbs-carousel-ref"
					class-names
					arrows
					:items="carouselItems"
					class="w-[250px] sm:hidden"
					:ui="{ container: 'h-full -mt-2', item: 'basis-[26%] pt-2 w-28' }"
					orientation="horizontal"
				>
					<div
						class="flex flex-col items-center cursor-pointer border border-border rounded-md px-2 py-1 h-full"
						@click="onThumbClick(item.index)"
					>
						<Image loading="lazy" :src="item.url" width="50" height="50" class="!object-scale-down" />
						<p class="text-white text-sm text-center">{{ item.name }}</p>
					</div>
				</UiCarousel>
			</div>
		</div>
	</UPage>
</template>
