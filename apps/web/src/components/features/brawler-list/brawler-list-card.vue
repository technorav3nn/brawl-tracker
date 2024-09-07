<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";

const props = defineProps<{ brawler: BrawlApiBrawler; showRarity?: boolean }>();

const rarityToColor = /* ui */ {
	Mythic:
		"bg-red-50 dark:bg-red-400 dark:bg-opacity-10 text-red-500 dark:text-red-400 ring-1 ring-inset ring-red-500 dark:ring-red-400 ring-opacity-25 dark:ring-opacity-25",
	Legendary:
		"bg-yellow-50 dark:bg-yellow-400 dark:bg-opacity-10 text-yellow-600/90 dark:text-yellow-400 ring-1 ring-inset ring-yellow-500 dark:ring-yellow-400 ring-opacity-25 dark:ring-opacity-25",
	Epic: "bg-purple-50 dark:bg-purple-400 dark:bg-opacity-10 text-purple-500 dark:text-purple-400 ring-1 ring-inset ring-purple-500 dark:ring-purple-400 ring-opacity-25 dark:ring-opacity-25",
	Rare: "bg-green-50 dark:bg-green-400 dark:bg-opacity-10 text-green-500 dark:text-green-400 ring-1 ring-inset ring-green-500 dark:ring-green-400 ring-opacity-25 dark:ring-opacity-25",
	"Super Rare":
		"bg-blue-50 dark:bg-blue-400 dark:bg-opacity-10 text-blue-500 dark:text-blue-400 ring-1 ring-inset ring-blue-500 dark:ring-blue-400 ring-opacity-25 dark:ring-opacity-25",
	Common:
		"bg-gray-50 dark:bg-gray-400 dark:bg-opacity-10 text-gray-500 dark:text-gray-400 ring-1 ring-inset ring-gray-500 dark:ring-gray-400 ring-opacity-25 dark:ring-opacity-25",
};

const rarity = computed(() => props.brawler.rarity.name);
const color = computed(() => {
	if (!props.showRarity) return;
	return rarityToColor[rarity.value as keyof typeof rarityToColor];
});
</script>

<template>
	<UPageCard
		class="overflow-hidden w-full"
		:ui="{
			// @ts-expect-error - Bug
			header: { padding: '!p-0' },
			// @ts-expect-error - Bug
			body: { padding: '!p-1.5' },
		}"
		:to="`/brawlers/${props.brawler.id}`"
		prefetch
	>
		<template #header>
			<NuxtImg
				:src="props.brawler.imageUrl2"
				class="object-cover object-top"
				:alt="brawler.name"
				width="300"
				height="300"
				format="webp"
				:modifiers="{ pos: 'top' }"
			>
			</NuxtImg>
		</template>

		<template #title>
			<div class="flex flex-col justify-start">
				<p class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
					{{ props.brawler.name }}
				</p>
				<p class="text-xs text-gray-500 dark:text-gray-400 font-medium">{{ props.brawler.class.name }}</p>
				<UBadge
					v-if="showRarity"
					:ui="{ rounded: 'rounded-full' }"
					class="w-max h-5 text-[0.70rem] mt-1"
					:class="color"
				>
					{{ props.brawler.rarity.name }}
				</UBadge>
			</div>
		</template>
	</UPageCard>
</template>
