<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";

const props = defineProps<{ brawler: BrawlApiBrawler; showRarity?: boolean }>();

const rarityToColor = /* ui */ {
	Mythic: "ring-1 ring-inset dark:ring-red-400/40! ring-red-400/60 text-red-400! bg-red-400/10",
	Legendary:
		"ring-1 ring-inset dark:ring-yellow-400/40 ring-yellow-400/60 dark:text-yellow-400 text-yellow-600/85 bg-yellow-400/10",
	Epic: "ring-1 ring-inset dark:ring-purple-400/40 ring-purple-400/60 text-purple-400 bg-purple-400/10",
	Rare: "ring-1 ring-inset dark:ring-green-400/40 ring-green-400/60 dark:text-green-400 text-green-600/80 bg-green-400/10",
	"Super Rare": "ring-1 ring-inset dark:ring-blue-400/40 ring-blue-400/60 text-blue-400 bg-blue-400/10",
	Common: "ring-1 ring-inset dark:ring-neutral-400/40 ring-neutral-400/60 text-neutral-400 bg-neutral-400/10",
};

const rarity = computed(() => props.brawler.rarity.name);
const color = computed(() => {
	if (!props.showRarity) return;
	return rarityToColor[rarity.value as keyof typeof rarityToColor];
});
</script>

<template>
	<UPageCard
		class="w-full overflow-hidden"
		:ui="{
			container: 'p-0!',
			header: 'mb-0',
		}"
		:to="`/brawlers/${props.brawler.id}`"
		variant="outline"
	>
		<template #header>
			<NuxtImg
				:src="props.brawler.imageUrl2"
				loading="lazy"
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
			<div class="flex flex-col justify-start px-2 py-2">
				<p class="overflow-hidden text-sm font-semibold text-ellipsis whitespace-nowrap">
					{{ props.brawler.name }}
				</p>
				<p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">{{ props.brawler.class.name }}</p>
				<UBadge :class="color" class="mt-1 h-5 w-max rounded-full text-[0.70rem]">
					{{ props.brawler.rarity.name }}
				</UBadge>
			</div>
		</template>
	</UPageCard>
</template>
