<script setup lang="ts">
import "uno.css";
import "@unocss/reset/tailwind.css";

if (process.client && process.dev) {
	// @ts-expect-error virtual module
	await import("virtual:unocss-devtools");
}

useFont([
	{
		src: "/fonts/inter-latin-wght-normal.woff2",
		family: "Inter",
		weight: "100 900",
		class: "font-inter-body",
		preload: true,
		fallback: ["-apple-system", "BlinkMacSystemFont", "system-ui", "-ui-sans-serif", "sans-serif"],
	},
]);
</script>

<template>
	<div class="font-sans border-border bg-background text-foreground">
		<NuxtLoadingIndicator />
		<NuxtLayout name="main">
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
/* Global styles */
html {
	-webkit-text-size-adjust: 100%;
	-webkit-tap-highlight-color: rgba(128, 128, 128, 0.5);
	font-variation-settings: normal;
}

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
