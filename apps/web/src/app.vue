<script setup lang="ts">
import { ConfigProvider } from "radix-vue";

const colorMode = useColorMode();

const useIdFunction = () => useId();

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

watch(
	() => colorMode.value,
	() => {
		if (process.browser) document.documentElement.style.setProperty("color-scheme", colorMode.value);
	},
	{ immediate: true }
);
</script>

<template>
	<main>
		<ConfigProvider :use-id="useIdFunction">
			<NuxtLoadingIndicator color="hsl(var(--primary))" />
			<NuxtLayout name="default">
				<VitePwaManifest />
				<NuxtPage />
			</NuxtLayout>
		</ConfigProvider>
	</main>
</template>

<style>
/* .tabs-leave-active,
.tabs-enter-active {
	transition: all 200ms cubic-bezier(0.5, 0.7, 0.1, 1);
}
.tabs-enter-from,
.tabs-leave-to {
	opacity: 0;
	transform: translateY(8px);
} */
</style>
