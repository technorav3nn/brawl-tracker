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
		<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
			<BrawlerOverview
				:class="{ 'md:col-span-2': !Boolean(brawlerCdnData.hypercharge) }"
				:brawler
				:brawlerCdnData
			/>
			<BrawlerMainAttack :brawler :brawlerCdnData />
			<BrawlerSuper :brawler :brawlerCdnData />
			<BrawlerHypercharge
				:class="{ 'md:col-span-2': !Boolean(brawlerCdnData.hypercharge) }"
				:brawler
				:brawlerCdnData
			/>
		</div>
	</UPage>
</template>
