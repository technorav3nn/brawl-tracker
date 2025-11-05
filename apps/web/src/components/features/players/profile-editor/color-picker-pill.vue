<template>
	<UButton
		color="neutral"
		square
		:variant="color === selected ? 'soft' : 'ghost'"
		class="flex gap-2"
		@click.stop.prevent="$emit('select')"
	>
		<span
			class="inline-block h-3.5 w-3.5 rounded-full bg-(--color-light) dark:bg-(--color-dark)"
			:style="{
				'--color-light': `var(--color-${color}-500)`,
				'--color-dark': `var(--color-${color}-400)`,
			}"
		/>
		<span class="capitalize">{{ color }}</span>
	</UButton>
</template>

<script setup lang="ts">
defineProps<{ color: string; selected: string }>();
defineEmits(["select"]);
</script>
