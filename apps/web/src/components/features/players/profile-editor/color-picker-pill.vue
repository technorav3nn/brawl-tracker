<template>
	<UButton
		color="white"
		square
		:ui="{
			color: {
				white: {
					solid: 'ring-0 bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800',
					ghost: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
				},
			},
		}"
		:variant="color.value === selected.value ? 'solid' : 'ghost'"
		class="flex gap-2"
		@click.stop.prevent="$emit('select')"
	>
		<span class="inline-block w-3.5 h-3.5 rounded-full" :style="{ backgroundColor: color.hex }"> </span>
		<span class="capitalize">{{ color.value }}</span>
	</UButton>
</template>

<script setup lang="ts">
defineProps<{ color: { value: string; hex: string }; selected: { value: string } }>();
defineEmits(["select"]);
</script>
