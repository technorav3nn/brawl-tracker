<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { QuestionMarkIcon } from "@radix-icons/vue";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	hasColor?: boolean;
}>();

const image = ref();
const hasRemovedImage = ref(false);

const rarity = computed(() => props.brawler.rarity.name);

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
			<p class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
				{{ brawler?.name }}
			</p>
			<p class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-muted-foreground">
				{{ brawler?.class.name }}
			</p>

			<p
				v-if="hasColor"
				class="mb-0.5 mt-1.5 w-max rounded-full px-2 text-[0.65rem] font-semibold dark:text-primary-foreground"
				:class="[
					rarity === 'Mythic' && 'bg-red-300',
					rarity === 'Legendary' && 'bg-yellow-300',
					rarity === 'Epic' && 'bg-purple-300',
					rarity === 'Rare' && 'bg-green-300',
					rarity === 'Super Rare' && 'bg-blue-300',
					rarity === 'Common' && 'bg-gray-300',
				]"
			>
				{{ brawler?.rarity.name }}
			</p>
		</div>
	</div>
</template>

<style></style>
