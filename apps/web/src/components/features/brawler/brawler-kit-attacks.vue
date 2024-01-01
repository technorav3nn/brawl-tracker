<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";

defineProps<{
	brawler: BrawlApiBrawler;
}>();
</script>

<template>
	<div class="rounded-lg border border-border p-4 shadow">
		<h1 class="text-2xl font-bold tracking-tight">Attacks</h1>
	</div>
</template>
