<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();

onMounted(() => {
	window.scrollTo(0, 0);
});
</script>

<template>
	<AppHeader />
	<UMain class="-mt-4 mb-4">
		<NuxtLayout>
			<NuxtLoadingIndicator
				color="repeating-linear-gradient(to right,rgb(var(--color-primary-DEFAULT)) 0%,#34cdfe 50%,#0047e1 100%)"
				:throttle="380"
			/>
			<UPageError :error="error" />
		</NuxtLayout>
	</UMain>
	<AppFooter />
	<UNotifications />
</template>
