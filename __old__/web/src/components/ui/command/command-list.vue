<script setup lang="ts">
import {
	ComboboxContent,
	useForwardPropsEmits,
	type ComboboxContentEmits,
	type ComboboxContentProps,
} from "radix-vue";
import { cn } from "$lib/util/tailwind";

const props = defineProps<ComboboxContentProps>();
const emits = defineEmits<ComboboxContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<ComboboxContent
		v-bind="forwarded"
		:class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', $attrs.class ?? '')"
	>
		<div role="presentation">
			<slot />
		</div>
	</ComboboxContent>
</template>
