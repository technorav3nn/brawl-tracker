<script setup lang="ts">
import { useBrawlerStore } from "$components/features/brawler/brawler-store";

const { brawler } = storeToRefs(useBrawlerStore());
</script>

<template>
	<UPage v-if="brawler">
		<div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
			<BrawlerOverview :brawler="brawler" />
		</div>
	</UPage>
</template>
