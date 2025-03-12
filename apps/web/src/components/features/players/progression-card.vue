<script setup lang="ts">
defineProps<{
	title: string;
	image: string;
	value: number;
	max: number;
}>();

// eslint-disable-next-line @typescript-eslint/unbound-method
const { format } = new Intl.NumberFormat("en-US", { notation: "compact" });
</script>

<template>
	<UDashboardCard :title :ui="{ body: { padding: 'pt-2.5! pb-3.5!' } }">
		<UProgress class="mb-4" :value :max />

		<div class="flex items-center gap-2">
			<NuxtImg fit="inside" :src="image" width="26" height="26" />
			<p class="text-md font-semibold tracking-tight">
				{{ format(value) }} / <span class="text-gray-500 dark:text-gray-400">{{ format(max) }}</span>
			</p>
			<p class="text-sm text-gray-500 dark:text-gray-400">({{ ((value / max) * 100).toFixed(0) }}%)</p>
		</div>
	</UDashboardCard>
</template>
