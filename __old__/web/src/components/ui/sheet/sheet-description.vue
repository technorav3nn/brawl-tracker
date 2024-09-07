<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from "radix-vue";
import { type HTMLAttributes, computed } from "vue";
import { cn } from "$lib/util/tailwind";

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
	// eslint-disable-next-line no-unused-vars
	const { class: _, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<DialogDescription :class="cn('text-sm text-muted-foreground', props.class)" v-bind="delegatedProps">
		<slot />
	</DialogDescription>
</template>
