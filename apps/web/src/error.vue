<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();

const handleError = () => clearError({ redirect: "/" });

onMounted(() => {
	window.scrollTo(0, 0);
});
</script>

<template>
	<AppHeader />
	<UMain>
		<NuxtLayout>
			<NuxtLoadingIndicator
				color="repeating-linear-gradient(to right,rgb(var(--color-primary-DEFAULT)) 0%,#34cdfe 50%,#0047e1 100%)"
				:throttle="150"
			/>
			<div class="flex flex-col items-center justify-center">
				<h1 class="text-8xl font-bold leading-normal tracking-tight text-primary">
					{{ error!.statusCode }}
				</h1>
				<p class="text-md mb-5 text-gray-500 dark:text-gray-400">
					{{ error!.statusMessage }}
				</p>
				<div v-if="!!error!.stack" class="flex flex-col gap-1">
					{{ error!.message }}
					<div v-html="error!.stack" />
				</div>
				<UButton @click="handleError">Go Home</UButton>
			</div>
		</NuxtLayout>
	</UMain>
	<AppFooter />
	<UNotifications />
</template>
