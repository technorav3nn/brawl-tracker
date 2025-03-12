<script setup lang="ts">
import { useBrawlerStore } from "$components/features/brawler/brawler-store";

const { brawler, brawlerCdnData } = storeToRefs(useBrawlerStore());

if (!brawler.value) {
	throw createError({
		statusCode: 404,
		message: "Brawler not found",
	});
}
</script>

<template>
	<UPage v-if="brawler && brawlerCdnData">
		<!--
 <div class="flex flex-row gap-2">
			<div class="flex flex-col gap-2">
				<BrawlerOverview
					:class="{ 'md:col-span-2': !Boolean(brawlerCdnData.hypercharge) }"
					:brawler
					:brawlerCdnData
				/>
				<BrawlerSuper :brawler :brawlerCdnData />
			</div>
			<div class="flex flex-col gap-2">
				<BrawlerMainAttack :brawler :brawlerCdnData />
				<BrawlerHypercharge
					:class="{ 'md:col-span-2': !Boolean(brawlerCdnData.hypercharge) }"
					:brawler
					:brawlerCdnData
				/>
			</div>
							:class="{ 'md:col-span-2': !Boolean(brawlerCdnData.hypercharge) }"
		</div> 
-->

		<div class="grid grid-cols-1 gap-y-3 md:gap-x-3 md:grid-cols-3">
			<div class="col-span-3 md:col-span-1 flex flex-col gap-2 h-full">
				<BrawlerOverview class="" :brawler :brawlerCdnData />
				<BrawlerSpecialGears class="w-full h-full hidden md:block" :brawler :brawlerCdnData />
			</div>
			<div class="flex md:col-span-2 flex-col gap-2">
				<div
					class="grid grid-cols-1 gap-2 md:grid-cols-2 h-[100%]"
					:class="{ 'md:col-span-2': !Boolean(brawlerCdnData.hypercharge) }"
				>
					<BrawlerMainAttack class="h-full" :brawler :brawlerCdnData />
					<BrawlerSuper class="h-full" :brawler :brawlerCdnData />
					<BrawlerPower type="gadgets" class="h-full" :brawler :brawlerCdnData />
					<BrawlerPower type="starpowers" class="h-full" :brawler :brawlerCdnData />
					<BrawlerSpecialGears class="block md:hidden" :brawler :brawlerCdnData />
				</div>
				<BrawlerHypercharge class="h-30" :brawler :brawlerCdnData />
			</div>
		</div>
	</UPage>
</template>
