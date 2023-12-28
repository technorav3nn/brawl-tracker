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
		<NuxtLink :to="`/brawlers/${brawler.hash}/kit`">
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
					class="mb-0.5 mt-1.5 w-max rounded-full px-2 text-[0.70rem] font-semibold dark:text-primary-foreground"
					:class="[
						rarity === 'Mythic' && 'bg-red-400',
						rarity === 'Legendary' && 'bg-yellow-400',
						rarity === 'Epic' && 'bg-purple-400',
						rarity === 'Rare' && 'bg-green-400',
						rarity === 'Super Rare' && 'bg-blue-400',
						rarity === 'Common' && 'bg-gray-400',
					]"
				>
					{{ brawler?.rarity.name }}
				</p>
			</div>
		</NuxtLink>
	</div>
</template>

<style></style>
