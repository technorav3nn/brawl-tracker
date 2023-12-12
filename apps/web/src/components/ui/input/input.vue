<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { useAttrs } from "vue";
import { cn } from "$lib/util/tailwind";

const props = defineProps<{
	defaultValue?: string | number;
	modelValue?: string | number;
}>();

const emits = defineEmits<{
	// eslint-disable-next-line no-unused-vars
	(e: "update:modelValue", payload: string | number): void;
}>();

defineOptions({
	inheritAttrs: false,
});

const { class: className, ...rest } = useAttrs();

// eslint-disable-next-line vue/no-setup-props-destructure
const modelValue = useVModel(props, "modelValue", emits, {
	passive: true,
	defaultValue: props.defaultValue,
});
</script>

<template>
	<input
		v-model="modelValue"
		:class="
			cn(
				'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
				className ?? ''
			)
		"
		v-bind="rest"
	/>
</template>
