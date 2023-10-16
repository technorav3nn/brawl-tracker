<script setup lang="ts">
import { token } from "$styled-system/tokens";

useFont([
	{
		src: "/fonts/inter-latin-wght-normal.woff2",
		family: "Inter Variable",
		weight: "100 900",
		class: "font-inter-body",
		preload: true,
		fallback: ["-apple-system", "BlinkMacSystemFont", "system-ui", "-ui-sans-serif", "sans-serif"],
	},
]);
</script>

<template>
	<div>
		<NuxtLoadingIndicator :color="token('colors.accent.default')" />
		<NuxtLayout name="main">
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
/* Slide fade transition */
.page-enter-active,
.page-leave-active {
	transition: all 0.15s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	transform: translateY(7px);
}
</style>
