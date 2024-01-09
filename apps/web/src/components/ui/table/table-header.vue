<script setup lang="ts">
import { cn } from "$lib/util/tailwind";

const props = defineProps<{ class?: string }>();
</script>

<template>
	<thead :class="cn('[&_tr]:border-b', props.class)">
		<slot />
	</thead>
</template>
