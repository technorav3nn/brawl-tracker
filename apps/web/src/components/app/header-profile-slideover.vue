<script setup lang="ts">
import type { NavigationLink } from "@nuxt/ui-pro/types";

const tabs = ["profile", "friends", "settings"] as const;
const tab = ref<(typeof tabs)[number]>("profile");
const oldTab = ref<(typeof tabs)[number]>("profile");

const links = computed<NavigationLink[]>(() => [
	{
		icon: "i-heroicons-user-circle-20-solid",
		click: () => setTab("profile"),
		active: tab.value === "profile",
		label: "",
	},
	{
		icon: "i-heroicons-users-20-solid",
		click: () => setTab("friends"),
		active: tab.value === "friends",
		label: "",
	},

	{
		icon: "i-heroicons-cog-20-solid",
		click: () => setTab("settings"),
		active: tab.value === "settings",
		label: "",
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

const slideover = useSlideover();
const router = useRouter();
const user = useUser();

router.beforeResolve((to, from, next) => {
	if (to.path === "/settings" && from.path === router.currentRoute.value.path && import.meta) {
		slideover.close();
	}

	next();
});

const userInfo = useDatabaseUser();
const supercellInfo = computed(() => userInfo.value?.profile);
const loading = ref(false);

async function logout() {
	loading.value = true;
	await $fetch("/api/auth/signout", { method: "POST" });
	slideover.close();
	user.value = null;
	loading.value = false;
	await navigateTo("/");
	reloadNuxtApp();
}
</script>

<template>
	<UDashboardSlideover :ui="{ width: '!max-w-sm', body: { base: '!overflow-y-auto', padding: 'p-0' } }">
		<template #title>
			<div class="flex items-center">
				<NuxtImg
					v-if="supercellInfo?.isConnected"
					:src="supercellInfo.avatar!"
					width="40"
					height="40"
					class="w-10 h-10 rounded-full"
					loading="lazy"
				/>
				<UAvatar v-else :alt="user!.name" />
				<div class="inline-flex flex-col">
					<span class="ml-2 text-xl font-bold">{{ user!.name }}</span>
					<span v-if="supercellInfo" class="ml-2 text-xs text-gray-500 dark:text-gray-400">{{ supercellInfo.tag }}</span>
				</div>
			</div>
		</template>
		<UHorizontalNavigation
			class="w-full border-b border-gray-200 dark:border-gray-800"
			:ui="{ container: '!w-full px-1', inner: '!w-full', base: 'flex items-center justify-center', icon: { base: 'w-6 h-6' } }"
			:links="links"
		/>
		<TransitionGroup
			name="tabs"
			tag="div"
			:style="{
				'--transform-data': `translateX(${computeTabsDirection() === 'none' ? 0 : computeTabsDirection() === 'right' ? 18 : -18}px)`,
			}"
		>
			<div v-if="tab === 'profile'">
				<div class="w-full py-5 px-4 dark:border-gray-800 border-b">
					<h1 class="text-2xl font-semibold">Profile</h1>
					<p class="text-gray-500 dark:text-gray-400 text-sm">Logged in as {{ user!.name }}</p>
				</div>
				<div class="px-2 mt-2 flex flex-col gap-2">
					<UTooltip :text="!supercellInfo?.isConnected ? 'Connect your Supercell ID to view your profile!' : ''">
						<UButton
							:to="`/players/${encodeURIComponent(supercellInfo!.tag!)}`"
							:disabled="!supercellInfo?.isConnected"
							color="gray"
							size="lg"
							block
							icon="i-heroicons-information-circle"
							@click="slideover.close()"
						>
							View My Profile
						</UButton>
					</UTooltip>
				</div>
			</div>
			<div v-if="tab === 'friends'" class="overflow-none">
				<ProfileSlideoverFriendsTab v-if="supercellInfo?.isConnected" />
				<div v-else>
					<div class="w-full py-5 px-4 border-b border-gray-200 dark:border-gray-800">
						<h1 class="text-2xl font-semibold">Saved Players & Friends</h1>
						<p class="text-gray-500 dark:text-gray-400 text-sm">
							View your saved players and imported Supercell ID Friends, and manage your saved players
						</p>
					</div>
					<!-- User doesnt have supercell id connect, show info -->
					<p class="px-4 mt-4 text-gray-500 dark:text-gray-400 text-sm">
						You must connect your Supercell ID to view your friends!
					</p>
				</div>
			</div>
			<div v-if="tab === 'settings'">
				<div class="w-full py-5 px-4 border-b border-gray-200 dark:border-gray-800">
					<h1 class="text-2xl font-semibold">Settings</h1>
					<p class="text-gray-500 dark:text-gray-400 text-sm">Edit everything about your account, or logout of it</p>
				</div>
				<div class="px-2 mt-2 flex flex-col gap-2">
					<UButton color="gray" size="lg" block icon="i-heroicons-cog" to="/settings">Go to Settings</UButton>
					<UButton
						color="red"
						variant="solid"
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
	</UDashboardSlideover>
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
