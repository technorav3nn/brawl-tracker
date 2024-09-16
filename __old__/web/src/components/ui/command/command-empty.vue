<script setup lang="ts">
import { ComboboxEmpty, type ComboboxEmptyProps } from "radix-vue";
import { cn } from "$lib/util/tailwind";

const props = defineProps<ComboboxEmptyProps>();
</script>

<template>
	<ComboboxEmpty v-bind="props" :class="cn('py-6 text-center text-sm', $attrs.class ?? '')">
		<slot />
	</ComboboxEmpty>
</template>
