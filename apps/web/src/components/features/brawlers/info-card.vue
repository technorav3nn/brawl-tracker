<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { QuestionMarkIcon } from "@radix-icons/vue";
import { RARITY_COLORS } from "$lib/util/colors";

defineProps<{
	brawler: BrawlApiBrawler;
	hasColor?: boolean;
}>();

const image = ref();
const hasRemovedImage = ref(false);

const onError = () => {
	if (!image.value) return;
	const element = image.value.$el as HTMLImageElement;
	element.remove();
	hasRemovedImage.value = true;
};
</script>

<template>
	<div class="min-h-[105px] w-full rounded border border-border bg-card shadow dark:shadow-none">
		<NuxtImg
			ref="image"
			:src="brawler!.imageUrl2"
			:alt="`Image of ${brawler.name}`"
			height="105"
			width="105"
			class="w-full rounded rounded-b-none border-b object-cover object-top"
			@error="onError"
		/>
		<QuestionMarkIcon v-if="hasRemovedImage" class="h-[105px] w-[105px] text-primary" />
		<div class="flex flex-col justify-start px-1.5 py-1.5">
			<p
				:style="hasColor && { color: RARITY_COLORS[brawler.rarity.name] }"
				class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold"
			>
				{{ brawler?.name }}
			</p>
			<p class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-muted-foreground">
				{{ brawler?.class.name }}
			</p>
			<!-- 
				<p
				class="mb-0.5 mt-1 rounded text-xs font-semibold text-black"
				:style="{ color: brawler.rarity.color }"
			>
				{{ brawler?.rarity.name }}
			</p> 
			-->
		</div>
	</div>
</template>
