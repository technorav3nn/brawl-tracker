<script setup lang="ts">
import { HEADER_ITEMS } from "$lib/config";
</script>

<template>
	<a
		v-for="item in HEADER_ITEMS"
		:key="item.path"
		:href="item.path"
		class="hidden text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80 md:inline-block"
	>
		{{ item.label }}
	</a>
</template>
