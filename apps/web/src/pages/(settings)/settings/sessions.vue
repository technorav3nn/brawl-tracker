<script setup lang="ts">
import { getCountryFlagEmoji } from "$lib/utils/common";
import { createGetCachedData } from "$lib/utils/nuxt";

const nuxtApp = useNuxtApp();
const toast = useToast();

const { data: sessions } = await useFetch("/api/auth/sessions", {
	getCachedData: createGetCachedData(nuxtApp),
});

const currentlyInvalidating = ref<string | null>(null);

async function invalidateSession(sessionId: string) {
	currentlyInvalidating.value = sessionId;
	try {
		await $fetch("/api/auth/sessions/invalidate", { body: { sessionId }, method: "PATCH" });
	} catch (error: any) {
		if (error.status === 400) {
			toast.add({
				color: "red",
				title: "Invalid session ID",
				description: "You cannot logout of your current session with this, you must use the logout button",
				icon: "i-heroicons-exclamation-circle-20-solid",
			});
		} else {
			toast.add({
				color: "red",
				title: "Error",
				description: "An error occurred while trying to logout of this session",
				icon: "i-heroicons-exclamation-circle-20-solid",
			});
		}
	}

	currentlyInvalidating.value = null;
}
</script>

<template>
	<section>
		<p class="font-medium text-lg">Sessions</p>
		<p class="text-sm">Manage where you're logged in</p>
		<UDivider class="mt-4 w-full" />
	</section>
	<section class="mt-4 flex flex-col">
		<UCard v-for="(session, index) in sessions" :ui="{ header: { padding: 'px-2 py-4' } }">
			<template #header>
				<div class="flex flex-col">
					<div class="flex items-center justify-between">
						<p class="font-medium text-xl items-center flex gap-1">
							Session {{ index + 1 }}:
							<span class="text-2xl ml-1">{{ getCountryFlagEmoji(session.ipCountry) }}</span>
							{{ session.ipCountry }}
						</p>
						<div class="flex flex-row gap-2 items-center">
							<UBadge v-if="session.currentSession" class="h-6" variant="subtle" color="primary">Current Session</UBadge>
							<UBadge v-else class="h-6" variant="subtle" color="orange">Outside Session</UBadge>
							<UBadge v-if="session.fresh" class="h-6" variant="subtle" color="green">Fresh</UBadge>
						</div>
					</div>
					<div class="flex items-center gap-2 mt-4 justify-between">
						<p>Expires at <NuxtTime :datetime="new Date(session.expiresAt)" dateStyle="full" timeStyle="short" /></p>
					</div>
					<div class="flex gap-2 mt-3">
						<UButton
							:loading="currentlyInvalidating === session.id"
							color="gray"
							size="xs"
							icon="i-heroicons-arrow-right-end-on-rectangle"
							@click="invalidateSession(session.id)"
						>
							Logout
						</UButton>
					</div>
				</div>
			</template>
		</UCard>
	</section>
</template>
