<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import type { PlayerBrawler } from "@brawltracker/brawl-stars-api";
import { CDN_URL_V2, getBrawlerPortraitUrl } from "@brawltracker/cdn/v2";
import { Image } from "@unpic/vue";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	playerBrawler: PlayerBrawler;
}>();

const rarityColorMap: Record<string, string> = {
	Common: "bg-sky-200 hover:bg-sky-300",
	Rare: "bg-[#2DDD1B] hover:bg-[#2DDD1B]/90",
	"Super Rare": "bg-blue-500  hover:bg-blue-600",
	Epic: "bg-purple-600 hover:bg-purple-800 ",
	Mythic: "bg-red-600  hover:bg-red-700",
	Legendary: "bg-yellow-400 hover:bg-yellow-500",
	"Ultra Legendary": "ultra-legendary-gradient-bg",
};

const isMaxTier = computed(() => props.playerBrawler.rank === 52);

const getRankUrl = (rank: number) => `${CDN_URL_V2}/brawlify/tiers/regular/${rank - 1}.png`;
</script>

<template>
	<div
		:style="{ '--__ul__start': 'to left bottom', backgroundSize: '300% 300% !important' }"
		class="group relative cursor-pointer rounded-md border-[1.45px] border-[#1E263A] shadow-xl"
		:class="[brawler.rarity.name in rarityColorMap ? rarityColorMap[brawler.rarity.name] : 'bg-gray-200']"
	>
		<Image
			class="relative block h-[145px] rounded-md group-hover:brightness-75 max-sm:object-cover"
			:src="getBrawlerPortraitUrl(brawler.id.toString())"
			:height="180"
		/>
		<p class="brawlstars-text absolute right-1 bottom-0 font-brawlstars text-lg font-normal tracking-wide text-white uppercase">
			{{ brawler.name }}
		</p>

		<!-- Powers -->
		<div class="absolute top-[2px] right-[2px] flex flex-col gap-y-[2px]">
			<Image v-if="playerBrawler.gadgets.length > 0" width="19" height="19" src="/icons/player/brawler-powers/gadget.png" />
			<Image v-if="!!playerBrawler.gears?.[0]" width="19" height="19" src="/icons/player/brawler-powers/gear.png"></Image>
			<Image v-if="playerBrawler.starPowers.length > 0" width="19" height="19" src="/icons/player/brawler-powers/starpower.png" />
			<Image v-if="!!playerBrawler.gears?.[1]" width="19" height="19" src="/icons/player/brawler-powers/gear.png"></Image>
		</div>

		<div class="absolute -top-[2.234rem] -left-4 flex flex-row items-center">
			<Image
				:width="playerBrawler.rank === 52 ? 50 : 40"
				:height="playerBrawler.rank === 52 ? 70 : 50"
				:src="getRankUrl(playerBrawler.rank)"
				class="z-10 size-[50px] object-contain"
			/>
			<!-- move bar based on whether rank is max to fix formatting issue -->
			<div>
				<Image
					v-if="isMaxTier"
					class="-translate-x-5 object-fill!"
					width="140"
					height="70"
					src="/icons/player/trophy-bars/max-tier-full.png"
				/>
				<Image v-else class="-translate-x-2.5" width="120" height="70" src="/icons/player/trophy-bars/normal-tier.png" />
				<p
					:class="[
						isMaxTier
							? 'top-[48.9%]  translate-x-[calc(-50%+0rem)] text-white'
							: 'top-[50%] translate-x-[calc(-50%+0.8rem)] text-yellow-400 ',
					]"
					class="brawlstars-text absolute left-[50%] w-[120px] translate-y-[-50%] text-center font-brawlstars text-[16px]"
				>
					{{ playerBrawler.trophies }}
				</p>
			</div>
		</div>

		<div class="absolute right-1 bottom-[1.65rem]">
			<div class="relative">
				<Image class="size-8" src="/icons/power-level-base.png" />
				<!-- Power level on image above -->
				<p
					class="brawler-name-text absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-50%] pr-[0.2px] text-center font-brawlstars text-[15px] text-white shadow-2xl"
				>
					<span>{{ playerBrawler.power }}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.brawler-name-text {
	text-transform: uppercase;
	text-shadow: 0px 2px 0px #000;
	filter: drop-shadow(0 0 4px #000);
}
.brawlstars-text {
	text-shadow:
		0px 2.5px 0px #000,
		-1px -1px 0 #000,
		1px -1px 0 #000,
		-1px 1px 0 #000,
		1px 1px 0 #000;
}
</style>
