<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const emit = defineEmits<{ close: [boolean] }>();

const tabs = ["profile", "friends", "settings"] as const;
const tab = ref<(typeof tabs)[number]>("profile");
const oldTab = ref<(typeof tabs)[number]>("profile");

const links = computed<NavigationMenuItem[]>(() => [
	{
		icon: "i-heroicons-user-circle-20-solid",
		onSelect: () => setTab("profile"),
		active: tab.value === "profile",
	},
	{
		icon: "i-heroicons-users-20-solid",
		onSelect: () => setTab("friends"),
		active: tab.value === "friends",
	},

	{
		icon: "i-heroicons-cog-20-solid",
		onSelect: () => setTab("settings"),
		active: tab.value === "settings",
	},
]);

function computeTabsDirection() {
	const idx = tabs.indexOf(tab.value);
	const clickedTabIdx = tabs.indexOf(oldTab.value);
	if (idx === clickedTabIdx) return "none";
	return idx > clickedTabIdx ? "left" : "right";
}

function setTab(value: (typeof tabs)[number]) {
	oldTab.value = tab.value;
	tab.value = value;
}

const router = useRouter();

router.beforeResolve((to, from, next) => {
	if (to.path === "/settings" && from.path === router.currentRoute.value.path && import.meta) {
		emit("close", true);
	}

	next();
});

const { data: session } = await authClient.useSession(useFetch);
const user = computed(() => session.value?.user);

const loading = ref(false);

async function logout() {
	loading.value = true;
	await authClient.signOut();
	emit("close", true);
	loading.value = false;
	await navigateTo("/");
	await refreshNuxtData();
}
</script>

<template>
	<USlideover v-if="user" :ui="{ body: 'overflow-auto! p-0!', content: 'max-w-sm', header: 'min-h-[4rem]! p-0 px-4!' }">
		<template #title>
			<div class="flex items-center">
				<NuxtImg v-if="user.image" :src="user.image" width="40" height="40" class="h-10 w-10 rounded-full" loading="eager" />
				<UAvatar v-else :alt="user?.name" />
				<div class="inline-flex flex-col">
					<span class="ml-2 text-xl font-bold">{{ user?.name }}</span>
					<span v-if="user.tag" class="ml-2 text-xs text-neutral-500 dark:text-neutral-400">{{ user.tag }}</span>
				</div>
			</div>
		</template>
		<template #body>
			<UNavigationMenu
				:items="links"
				class="w-full border-b border-neutral-200 dark:border-neutral-800"
				:ui="{ root: 'w-full! px-1 [&_:nth-child(1)]:w-full', item: 'w-full!', content: 'w-full', link: 'after:h-[2px]' }"
				variant="pill"
				highlight
			/>
			<TransitionGroup
				name="tabs"
				tag="div"
				:style="{
					'--transform-data': `translateX(${computeTabsDirection() === 'none' ? 0 : computeTabsDirection() === 'right' ? 18 : -18}px)`,
				}"
			>
				<div v-if="tab === 'profile'">
					<div class="w-full border-b px-4 py-5 dark:border-neutral-800">
						<h1 class="text-2xl font-semibold">Profile</h1>
						<p class="text-sm text-neutral-500 dark:text-neutral-400">Logged in as {{ user?.name }}</p>
					</div>
					<div class="mt-2 flex flex-col gap-2 px-2">
						<UTooltip :text="!user?.scid ? 'Connect your Supercell ID to view your profile!' : ''">
							<UButton
								:to="`/players/${encodeURIComponent(user?.tag || '')}`"
								:disabled="!user?.scid"
								color="neutral"
								variant="subtle"
								size="lg"
								block
								trailing-icon="i-heroicons-arrow-right"
								:ui="{ trailingIcon: 'ms-0!' }"
								@click="emit('close', true)"
							>
								View My Profile
							</UButton>
						</UTooltip>
					</div>
				</div>
				<div v-if="tab === 'friends'" class="overflow-none">
					<ProfileSlideoverFriendsTab v-if="user?.scid" @close="emit('close', true)" />
					<div v-else>
						<div class="w-full border-b border-neutral-200 px-4 py-5 dark:border-neutral-800">
							<h1 class="text-2xl font-semibold">Saved Players & Friends</h1>
							<p class="text-sm text-neutral-500 dark:text-neutral-400">
								View your saved players and imported Supercell ID Friends, and manage your saved players
							</p>
						</div>
						<!-- User doesnt have supercell id connect, show info -->
						<p class="mt-4 px-4 text-sm text-neutral-500 dark:text-neutral-400">
							You must connect your Supercell ID to view your friends!
						</p>
					</div>
				</div>
				<div v-if="tab === 'settings'">
					<div class="w-full border-b border-neutral-200 px-4 py-5 dark:border-neutral-800">
						<h1 class="text-2xl font-semibold">Settings</h1>
						<p class="text-sm text-neutral-500 dark:text-neutral-400">Edit everything about your account, or logout of it</p>
					</div>
					<div class="mt-2 flex flex-col gap-2 px-2">
						<UButton color="neutral" variant="subtle" size="lg" block icon="i-heroicons-cog" to="/settings"
							>Go to Settings</UButton
						>
						<UButton
							color="error"
							size="lg"
							block
							icon="i-heroicons-arrow-right-end-on-rectangle-20-solid"
							:loading="loading"
							@click="logout"
						>
							Logout
						</UButton>
					</div>
				</div>
			</TransitionGroup>
		</template>
	</USlideover>
</template>

<style scoped>
.tabs-enter-active,
.tabs-leave-active {
	width: 100%;
	position: absolute;
	transition:
		transform 0.212s cubic-bezier(0.5, 0.7, 0.1, 1),
		opacity 0.1s cubic-bezier(0.5, 0.7, 0.1, 1);
}
.tabs-enter-from,
.tabs-leave-to {
	width: 100%;
	position: absolute;
	transform: var(--transform-data);
	opacity: 0;
}
</style>
