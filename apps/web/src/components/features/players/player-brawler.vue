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
};

const isMaxTier = computed(() => props.playerBrawler.rank === 51);

const getRankUrl = (rank: number) => `${CDN_URL_V2}/brawlify/tiers/regular/${rank}.png`;
</script>

<template>
	<div
		class="group relative rounded-md cursor-pointer border-[1.45px] border-[#1E263A] shadow-xl"
		:class="[brawler.rarity.name in rarityColorMap ? rarityColorMap[brawler.rarity.name] : 'bg-gray-200']"
	>
		<Image
			class="relative group-hover:brightness-75 max-sm:object-cover h-[145px] block rounded-md"
			:src="getBrawlerPortraitUrl(brawler.id.toString())"
			:height="180"
		/>
		<p class="text-lg absolute bottom-0 right-1 font-normal tracking-wide text-white font-brawlstars uppercase brawlstars-text">
			{{ brawler.name }}
		</p>

		<!-- Powers -->
		<div class="absolute top-[2px] right-[2px] flex gap-y-[2px] flex-col">
			<Image v-if="playerBrawler.gadgets.length > 0" width="19" height="19" src="/icons/player/brawler-powers/gadget.png" />
			<Image v-if="!!playerBrawler.gears?.[0]" width="19" height="19" src="/icons/player/brawler-powers/gear.png"></Image>
			<Image v-if="playerBrawler.starPowers.length > 0" width="19" height="19" src="/icons/player/brawler-powers/starpower.png" />
			<Image v-if="!!playerBrawler.gears?.[1]" width="19" height="19" src="/icons/player/brawler-powers/gear.png"></Image>
		</div>

		<div class="absolute -top-[2.234rem] -left-4 flex flex-row items-center">
			<Image
				:width="playerBrawler.rank === 51 ? 50 : 40"
				:height="playerBrawler.rank === 51 ? 70 : 50"
				:src="getRankUrl(playerBrawler.rank)"
				class="z-10 size-[50px] object-contain"
			/>
			<!-- move bar based on whether rank is max to fix formatting issue -->
			<div>
				<Image
					v-if="!isMaxTier"
					class="-translate-x-2.5"
					width="120"
					height="70"
					src="/icons/player/trophy-bars/normal-tier.png"
				/>
				<Image v-else class="-translate-x-4" width="120" height="70" src="/icons/player/trophy-bars/max-tier-full.png" />
				<p
					:class="[isMaxTier ? 'text-white  top-[48.9%]' : 'text-yellow-400 top-[50%] ']"
					class="brawlstars-text text-center w-[120px] text-[16px] font-brawlstars absolute left-[50%] translate-x-[calc(-50%+0.3rem)] translate-y-[-50%]"
				>
					{{ playerBrawler.trophies }}
				</p>
			</div>
		</div>

		<div class="absolute bottom-[1.65rem] right-1">
			<div class="relative">
				<Image class="size-8" src="/icons/power-level-base.png" />
				<!-- Power level on image above -->
				<p
					class="font-brawlstars pr-[0.2px] absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[15px] w-full text-white shadow-2xl brawler-name-text"
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
