<script setup lang="ts">
import type { BasicPlayer } from "@brawltracker/brawl-stars-api";
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";
import { formatTag } from "@brawltracker/supercell-api-utils";
import { Image } from "@unpic/vue";

const props = defineProps<{
	player: BasicPlayer;
	isStarPlayer?: boolean;
	isRanked?: boolean;
}>();

const tag = useRoute("players-tag-battles").params.tag;

const rankImageUrl = computed(() => {
	return `${CDN_URL_V2}/brawlify/ranked/tiered/${58000000 + (props.player.brawler.trophies ?? 0)}.png`;
});
</script>

<template>
	<NuxtLink :to="`/players/${encodeURIComponent(player.tag.replace('#', ''))}`" class="flex flex-col items-center gap-1.5">
		<div
			class="relative border-4 border-black"
			:class="[
				formatTag(player.tag) === formatTag(tag)
					? ' ring-2 ring-sky-500 ring-offset-2 ring-offset-(--ui-bg) dark:ring-sky-400'
					: 'border-black',
			]"
		>
			<Image
				class="object-scale-down"
				:src="`${CDN_URL_V2}/brawlify/brawlers/borderless/${player.brawler.id}.png`"
				width="100"
				height="100"
			/>
			<div
				v-if="!isRanked"
				class="polygon-clip-trophies absolute -top-[0.2px] left-0 flex items-center gap-px bg-black p-0.5 pr-1.5 font-brawlstars leading-0 text-yellow-400 dark:text-yellow-400"
			>
				<Image src="/icons/player/trophy.webp" class="object-contain" width="15" height="15" />
				<p>{{ player.brawler.trophies }}</p>
			</div>
			<div v-else>
				<Image
					v-if="rankImageUrl"
					:src="rankImageUrl"
					class="absolute -top-3 -left-4 size-[40px] object-contain"
					width="40"
					height="40"
				/>
			</div>
			<div
				class="polygon-clip-level absolute right-0 -bottom-[0.2px] flex h-5 items-center gap-0.5 bg-black p-0.5 pl-1 font-brawlstars"
			>
				<p class="text-sm leading-0 text-(--ui-text-muted)">LVL</p>
				<p class="leading-0 font-semibold">{{ player.brawler.power }}</p>
			</div>
		</div>
		<div class="flex w-[110%] items-center justify-center gap-0.5">
			<UIcon
				v-if="props.isStarPlayer"
				name="i-heroicons-star-20-solid"
				class="size-4 -translate-y-[0.6px] text-amber-500 dark:text-amber-400"
			/>
			<p :class="props.isStarPlayer && 'text-amber-500 dark:text-amber-400'" class="truncate text-center text-sm font-semibold">
				{{ player.name }}
			</p>
		</div>
	</NuxtLink>
</template>

<style scoped></style>
