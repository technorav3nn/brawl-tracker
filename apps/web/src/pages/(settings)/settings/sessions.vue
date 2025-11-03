<script setup lang="ts">
import { useUserAgent as parseUserAgent } from "astro-useragent";
import { format } from "date-fns/format";

const { data: sessions, suspense } = useQuery({
	queryKey: ["sessions"],
	queryFn: () => authClient.listSessions(),
	select: (d) =>
		d.data?.map((s) => ({
			...s,
			...(s.userAgent ? { parsedUserAgent: parseUserAgent(s.userAgent) } : {}),
		})),

	gcTime: 1000 * 500,
	staleTime: 1000 * 120,
});
await suspense();

const toast = useToast();

async function revoke(token: string) {
	const currentSession = await authClient.getSession();
	if (currentSession.data?.session.token === token) {
		toast.add({
			title: "You cannot revoke your current session. Log out instead.",
			color: "error",
		});
		return;
	}

	return await authClient.revokeSession({ token });
}
</script>

<template>
	<div class="lg:max-w-2xl">
		<section>
			<p class="text-lg font-medium">Sessions</p>
			<p class="text-sm">Manage your logged in sessions</p>
			<USeparator class="mt-4 w-full" />
		</section>
		<section class="mt-4">
			<UCard v-for="session in sessions" :key="session.id" variant="outline" class="p-0!">
				<template #header>
					<h1 class="flex items-center gap-2 text-lg font-medium">
						<ProseCode>{{ session.id }}</ProseCode>
					</h1>
				</template>
				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-2">
						<UIcon name="i-heroicons-computer-desktop" />
						<p class="text-sm font-medium">Operating System</p>
						<p class="text-sm text-neutral-500 dark:text-neutral-400">
							{{ session.parsedUserAgent?.os }}
						</p>
					</div>
					<div class="flex items-center gap-2">
						<UIcon name="i-heroicons-globe-alt" />
						<p class="text-sm font-medium">Browser</p>
						<p class="text-sm text-neutral-500 dark:text-neutral-400">
							{{ session.parsedUserAgent?.getBrowser() }}
						</p>
					</div>
					<div class="flex items-center gap-2">
						<UIcon name="i-heroicons-clock" />
						<p class="text-sm font-medium">Created At</p>
						<p class="text-sm text-neutral-500 dark:text-neutral-400">
							{{ format(new Date(session.createdAt), "eeee, M/dd/yyyy 'at' h:mm aa") }}
						</p>
					</div>
					<div class="flex items-center gap-2">
						<UIcon name="i-heroicons-map-pin" />
						<p class="text-sm font-medium">IP Address</p>
						<p class="text-sm text-neutral-500 dark:text-neutral-400">
							<ProseCode class="text-xs">{{ session.ipAddress }}</ProseCode>
						</p>
					</div>
				</div>
				<template #footer>
					<UButton color="error" icon="i-heroicons-trash" @click="revoke(session.token)">Delete Session</UButton>
				</template>
			</UCard>
		</section>
	</div>
</template>
