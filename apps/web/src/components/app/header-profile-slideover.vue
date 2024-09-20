<script setup lang="ts">
import { getCdnUrlForAvatarId } from "@brawltracker/supercell-id-api";
import type { NavigationLink } from "@nuxt/ui-pro/types";

defineProps<{
	open: boolean;
}>();

const emit = defineEmits<{
	"update:open": [value: boolean];
}>();

const tabs = ["profile", "friends", "settings"] as const;
const tab = ref<(typeof tabs)[number]>("profile");
const oldTab = ref<(typeof tabs)[number]>("profile");

const links = computed<Partial<NavigationLink>[]>(() => [
	{
		icon: "i-heroicons-user-circle-20-solid",
		click: () => setTab("profile"),
		active: tab.value === "profile",
	},
	{
		icon: "i-heroicons-users-20-solid",
		click: () => setTab("friends"),
		active: tab.value === "friends",
	},

	{
		icon: "i-heroicons-cog-20-solid",
		click: () => setTab("settings"),
		active: tab.value === "settings",
	},
]);

function updateModelValue(state: boolean) {
	emit("update:open", state);
}

watchEffect(() => {
	console.log(oldTab.value, tab.value);
});

const user = useUser();
const { data: profile } = await useFetch("/api/auth/scid/profile");

function setTab(value: (typeof tabs)[number]) {
	oldTab.value = tab.value;
	tab.value = value;
}

function computeTabsDirection() {
	const idx = tabs.indexOf(tab.value);
	const clickedTabIdx = tabs.indexOf(oldTab.value);
	if (idx === clickedTabIdx) return "none";
	return idx > clickedTabIdx ? "left" : "right";
}
</script>

<template>
	<UDashboardSlideover
		v-if="profile"
		:modelValue="open"
		:ui="{ width: '!max-w-sm', body: { base: '', padding: 'p-0' } }"
		@update:model-value="updateModelValue"
	>
		<template #title>
			<div class="flex items-center">
				<NuxtImg
					v-if="profile"
					:src="getCdnUrlForAvatarId(profile.data!.avatarImage)"
					width="40"
					height="40"
					class="w-10 h-10 rounded-full"
				/>
				<UAvatar v-else :alt="user?.username" />
				<div class="inline-flex flex-col">
					<span class="ml-2 text-xl font-bold">{{ user?.username }}</span>
					<span class="ml-2 text-xs text-gray-500 dark:text-gray-400">{{ user?.supercellId }}</span>
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
				'--transform-data': `translateX(${computeTabsDirection() === 'none' ? 0 : computeTabsDirection() === 'right' ? 20 : -20}px)`,
			}"
		>
			<div v-if="tab === 'profile'">
				<div class="w-full py-5 px-4 border-b border-gray-200 dark:border-gray-800">
					<h1 class="text-2xl font-semibold">Profile</h1>
					<p class="text-gray-500 dark:text-gray-400 text-sm">Logged in as {{ user?.username }}</p>
				</div>
				<UButton
					color="gray"
					variant="ghost"
					size="lg"
					class="px-1 h-12 border-b border-gray-200 dark:border-gray-800 rounded-none"
					block
					icon="i-heroicons-information-circle"
				>
					View My Profile
				</UButton>
				<UButton
					color="gray"
					variant="ghost"
					size="lg"
					class="px-1 h-12 border-b border-gray-200 dark:border-gray-800 rounded-none"
					block
					icon="i-tabler-shield-pin"
				>
					View My Club
				</UButton>
			</div>
			<div v-if="tab === 'friends'">
				<div class="w-full py-5 px-4 border-b border-gray-200 dark:border-gray-800">
					<h1 class="text-2xl font-semibold">Friends</h1>
					<p class="text-gray-500 dark:text-gray-400 text-sm">
						View your friends profile's if you've connected your Supercell ID
					</p>
				</div>
			</div>
			<div v-if="tab === 'settings'">
				<div class="w-full py-5 px-4 border-b border-gray-200 dark:border-gray-800">
					<h1 class="text-2xl font-semibold">Settings</h1>
					<p class="text-gray-500 dark:text-gray-400 text-sm">Edit everything about your account, or logout of it</p>
				</div>
				<UButton
					color="gray"
					variant="ghost"
					size="lg"
					class="px-1 h-12 border-b border-gray-200 dark:border-gray-800 rounded-none"
					block
					icon="i-heroicons-cog"
				>
					Go to Settings
				</UButton>
				<UButton
					color="gray"
					variant="ghost"
					size="lg"
					class="px-1 h-12 border-b border-gray-200 dark:border-gray-800 rounded-none dark:!text-red-400 text-red-500"
					block
					icon="i-heroicons-arrow-right-end-on-rectangle-20-solid"
				>
					Logout
				</UButton>
			</div>
		</TransitionGroup>
	</UDashboardSlideover>
</template>

<style scoped>
.tabs-enter-active,
.tabs-leave-active {
	width: 100%;
	position: absolute;
	transition: all 0.25s ease;
}
.tabs-enter-from,
.tabs-leave-to {
	width: 100%;
	position: absolute;
	opacity: 0;
	transform: var(--transform-data);
}
</style>
