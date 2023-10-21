<script setup lang="ts">
import { ComboboxSeparator, type ComboboxSeparatorProps } from "radix-vue";
import { cn } from "$lib/util/tailwind";

const props = defineProps<ComboboxSeparatorProps>();
</script>

<template>
	<ComboboxSeparator v-bind="props" :class="cn('-mx-1 h-px bg-border ', $attrs.class ?? '')">
		<slot />
	</ComboboxSeparator>
</template>
