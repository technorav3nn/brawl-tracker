<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();

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

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
	<NuxtLayout>
		<div class="flex flex-col items-center justify-center">
			<h1 class="text-8xl font-bold leading-normal tracking-tight text-primary">
				{{ error!.statusCode }}
			</h1>
			<p class="text-md mb-5 text-muted-foreground">
				{{ error!.statusMessage }}
			</p>
			<div v-if="!!error!.stack" class="flex flex-col gap-1">
				{{ error!.message }}
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-html="error!.stack" />
			</div>
			<UiButton @click="handleError"> Go Home </UiButton>
		</div>
	</NuxtLayout>
</template>
