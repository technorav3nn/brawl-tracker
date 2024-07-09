<script setup lang="ts">
import { normalizeNameToCdnName } from "@brawltracker/cdn";
import { useBrawlerStore } from "$components/features/brawler/brawler-store";

const { brawler } = storeToRefs(useBrawlerStore());
if (!brawler.value) {
	throw createError({
		statusCode: 404,
		message: "Brawler not found",
	});
}

const cdnName = computed(() => normalizeNameToCdnName(brawler.value!.name));
const { data: cdnInfo } = useFetch(`/api/brawlers/cdn/${cdnName.value}`);
</script>

<template>
	<UPage v-if="brawler && cdnInfo">
		<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
			<BrawlerOverview class="md:col-span-2" :brawler :cdnInfo />
			<BrawlerMainAttack :brawler :cdnInfo />
			<BrawlerSuper :brawler :cdnInfo />
		</div>
	</UPage>
</template>
