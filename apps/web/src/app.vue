<script setup>
useFont([
	{
		src: "/fonts/inter-latin-wght-normal.woff2",
		family: "Inter",
		weight: "100 900",
		preload: true,
		fallback: ["-apple-system", "BlinkMacSystemFont", "system-ui", "-ui-sans-serif", "sans-serif"],
	},
]);

useHead({
	bodyAttrs: { class: "min-h-screen bg-background font-sans antialiased" },
});

$fetch("https://json.com", {
	method: "",
});
</script>

<template>
	<main>
		<NuxtLayout name="main">
			<NuxtPage />
		</NuxtLayout>
	</main>
</template>

<style>
/* Slide fade transition, off for now */
/* .page-enter-active,
.page-leave-active {
	transition: all 0.15s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	transform: translateY(7px);
} */
</style>
