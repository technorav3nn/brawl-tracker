<script setup lang="ts">
import { tv } from "tailwind-variants";
import { computed } from "vue";

interface KbdProps {
	as?: string;
	size?: "xs" | "sm" | "md";
}

const props = withDefaults(defineProps<KbdProps>(), {
	as: "kbd",
	size: "sm",
});

const kbdClass = computed(() => {
	return tv({
		base: "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted font-sans font-medium",
		variants: {
			size: {
				xs: "h-4 min-h-[16px] px-1 text-[10px]",
				sm: "h-5 min-h-[20px] px-1 text-[11px]",
				md: "h-6 min-h-[24px] px-1.5 text-[12px]",
			},
		},
	})({
		size: props.size,
	});
});
</script>

<template>
	<component :is="props.as" :class="kbdClass">
		<slot />
	</component>
</template>
