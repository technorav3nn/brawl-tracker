<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import type { PlayerBrawler } from "@brawltracker/brawl-stars-api";
import { CDN_URL_V2, getBrawlerModelUrl } from "@brawltracker/cdn/v2";
import { Image } from "@unpic/vue";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	playerBrawler: PlayerBrawler;
}>();

const isMaxTier = computed(() => props.playerBrawler.rank === 51);
const rankUrl = computed(() => `${CDN_URL_V2}/brawlify/tiers/regular/${props.playerBrawler.rank}.png`);
const model = computed(() => getBrawlerModelUrl(props.brawler.id.toString()));
</script>

<template>
	<UCard
		:ui="{
			footer: isMaxTier
				? 'sm:pl-3! sm:pr-0! py-1! px-32! max-[450px]:px-20! max-[380px]:px-10! max-[200px]:px-4!'
				: 'sm:px-3! py-1! sm:pr-1.5! px-24!',

			body: 'flex justify-center ',
			header: 'px-4! py-2!',
		}"
	>
		<template #header>
			<h3 class="text-foreground text-lg font-semibold">{{ brawler!.name }}</h3>
		</template>
		<NuxtImg loading="eager" :src="model" width="200" height="200" fit="outside" format="webp" class="h-[280px] object-contain" />
		<template #footer>
			<div class="mt-3 flex items-center justify-center gap-0">
				<Image
					loading="eager"
					:width="playerBrawler!.rank === 51 ? 50 : 40"
					:height="playerBrawler!.rank === 51 ? 70 : 50"
					:src="rankUrl"
					class="z-10 size-[50px] object-contain"
				/>
				<div class="relative -mr-5 w-full -translate-x-[26px]">
					<NuxtImg
						v-if="!isMaxTier"
						loading="eager"
						class="h-8 w-full"
						fit="inside"
						width="150"
						height="40"
						src="/icons/player/trophy-bars/normal-tier.png"
					/>
					<NuxtImg
						v-else
						loading="eager"
						class="h-8 w-full"
						fit="inside"
						width="150"
						height="40"
						src="/icons/player/trophy-bars/max-tier-full.png"
					/>
					<p
						:class="[isMaxTier ? 'top-[48.9%]  text-white' : 'top-[50%] text-yellow-400 ']"
						class="brawlstars-text absolute left-[50%] flex w-[120px] translate-x-[calc(-50%-0.4rem)] translate-y-[-50%] items-center justify-center gap-0.5 text-center font-brawlstars text-[16px]"
					>
						<span>
							<Image
								:src="`/icons/player/${isMaxTier ? 'season-trophy' : 'trophy'}.${isMaxTier ? 'png' : 'webp'}`"
								width="20"
								height="20"
							/>
						</span>
						{{ playerBrawler!.trophies }}
					</p>
				</div>
			</div>
		</template>
	</UCard>
</template>
