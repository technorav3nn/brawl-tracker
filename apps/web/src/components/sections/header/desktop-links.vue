<script setup lang="ts">
import { LINKS } from "$lib/config";
</script>

<template>
	<NuxtLink
		v-for="item in LINKS"
		:key="item.path"
		:href="item.path"
		class="text-sm/6 font-medium text-foreground/60 transition-colors hover:text-foreground/80"
		activeClass="link-active"
	>
		{{ item.label }}
	</NuxtLink>
</template>

<style scoped>
.link-active {
	@apply text-foreground/[0.87];
}
</style>
