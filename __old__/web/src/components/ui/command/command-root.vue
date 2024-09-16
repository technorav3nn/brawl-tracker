<script setup lang="ts">
import { ComboboxRoot, useEmitAsProps, type ComboboxRootEmits, type ComboboxRootProps } from "radix-vue";
import { cn } from "$lib/util/tailwind";

const props = defineProps<ComboboxRootProps>();
const emits = defineEmits<ComboboxRootEmits>();

const emitsAsProps = useEmitAsProps(emits);
</script>

<template>
	<ComboboxRoot
		v-bind="{
			...props,
			...emitsAsProps,
		}"
		open
		:class="
			cn(
				'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
				$attrs.class ?? ''
			)
		"
	>
		<slot />
	</ComboboxRoot>
</template>
