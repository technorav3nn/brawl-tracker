<script setup lang="ts">
import { parseColorTag } from "$lib/utils/brawl-stars/color-tags";

const props = defineProps<{
	colorTag: string;
}>();

const info = computed(() => parseColorTag(props.colorTag));
</script>

<template>
	<p :class="info.color" class="font-medium">{{ info.insideText }}</p>
</template>
