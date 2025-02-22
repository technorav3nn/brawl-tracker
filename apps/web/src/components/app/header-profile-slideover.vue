<script setup lang="ts">
import type { NavigationLink } from "@nuxt/ui-pro/types";
import { signout } from "$lib/utils/auth";

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
	if (to.path === "/settings" && from.path === router.currentRoute.value.path) {
		slideover.close();
	}

	next();
});

const { data: userInfo } = useDatabaseUser();
const supercellInfo = computed(() => userInfo.value?.scidConnections);

// const { data: profile } = useFetch("/api/auth/scid/my-profile");
// const {
// 	data: unfiltedFriends,
// 	status: friendsStatus,
// 	execute,
// } = useFetch("/api/auth/scid/friends", {
// 	transform: (d) => d.friends.filter((f) => Boolean(f.handle) && f.relationship.status === "FRIEND"),
// 	immediate: false,
// 	key: "friends",
// 	getCachedData(key) {
// 		return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
// 	},
// });

// const search = ref("");
// const sortMode = ref<"ascending" | "descending" | "none" | "status">("none");

// const friends = computed(() => {
// 	if (!unfiltedFriends.value) return [];
// 	return unfiltedFriends.value
// 		.filter((f) => f.name.toLowerCase().includes(search.value.toLowerCase()) && f.applicationAccountId)
// 		.sort((a, b) => {
// 			if (sortMode.value === "status") return a.presence ? -1 : 1;
// 			if (sortMode.value === "ascending") return a.name.localeCompare(b.name);
// 			if (sortMode.value === "descending") return b.name.localeCompare(a.name);
// 			return 0;
// 		});
// });

// const dataIsCached = computed(() => nuxtApp.payload.data.friends || nuxtApp.static.data.friends);

// watchEffect(() => {
// 	if (tab.value === "friends" && friendsStatus.value === "idle") {
// 		execute();
// 	}
// });

// async function logout() {
// 	slideover.close();
// 	await $fetch("/api/auth/logout", { method: "POST" });
// 	user.value = null;
// 	await navigateTo("/");
// 	toast.add({ title: "Logged out successfully", color: "primary" });
// }
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
					<UButton color="gray" size="lg" block icon="i-heroicons-information-circle"> View My Profile </UButton>
					<UButton color="gray" size="lg" block icon="i-tabler-shield-pin"> View My Club </UButton>
				</div>
			</div>

			<div v-if="tab === 'friends'" class="overflow-none">
				<ProfileSlideoverFriendsTab />
				<!--
 <div
					v-if="friendsStatus === 'pending' && !dataIsCached"
					class="px-4 mt-4 flex flex-col gap-2 items-center justify-center"
				>
					<UiLoadingIndicator class="w-12 h-12" />
					<span class="text-gray-500 dark:text-gray-400 text-lg">Loading Friends</span>
				</div>
				<div v-if="friends?.length === 0 && !search && sortMode === 'none'" class="px-4 mt-4">
					<p class="text-gray-500 dark:text-gray-400 text-sm">You have no friends connected to Supercell ID</p>
				</div> 
-->
				<!--
 <div class="px-4 flex flex-col">
					<div class="flex flex-row gap-1 mb-2">
						<UInput
							v-model="search"
							class="mt-4 w-[56%]"
							placeholder="Search friends"
							icon="i-heroicons-magnifying-glass-20-solid"
						/>
						<USelect
							:modelValue="capitalizeFirstLetter(sortMode)"
							class="mt-4 w-[44%]"
							:options="['None', 'Ascending', 'Descending', 'Status']"
							icon="i-heroicons-adjustments-horizontal"
							@change="sortMode = lowercaseFirstLetter($event) as typeof sortMode"
						/>
					</div>
					<NuxtLink
						v-for="friend in friends"
						:key="friend.scid"
						:to="`/players/${idToTag(highLowToId(friend.applicationAccountId!))}`"
					>
						<LazyAppProfileSlideoverFriend :key="friend.scid" :friend="friend" />
					</NuxtLink>
				</div> 
-->
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
						@click="signout"
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
