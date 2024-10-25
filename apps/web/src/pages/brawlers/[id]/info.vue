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

		<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
			<BrawlerOverview :brawler :brawlerCdnData />
			<div class="flex md:col-span-2 flex-col gap-2">
				<BrawlerMainAttack class="h-full" :brawler :brawlerCdnData />
				<BrawlerSuper class="h-full" :brawler :brawlerCdnData />
			</div>
			<BrawlerHypercharge class="md:col-span-3" :brawler :brawlerCdnData />
		</div>
	</UPage>
</template>
