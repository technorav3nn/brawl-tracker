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

const links = computed<Partial<NavigationLink>[]>(() => [
	{
		icon: "i-heroicons-user-circle-20-solid",
		click: () => (tab.value = "profile"),
		active: tab.value === "profile",
	},
	{
		icon: "i-heroicons-users-20-solid",
		click: () => (tab.value = "friends"),
		active: tab.value === "friends",
	},

	{
		icon: "i-heroicons-cog-20-solid",
		click: () => (tab.value = "settings"),
		active: tab.value === "settings",
	},
]);

function updateModelValue(state: boolean) {
	emit("update:open", state);
}

const user = useUser();
const { data: profile } = await useFetch("/api/auth/scid/profile");
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
					class="w-9 h-9 rounded-full"
				/>
				<UAvatar v-else :alt="user?.username" />
				<span class="ml-2 text-xl font-bold">{{ user?.username }}</span>
			</div>
		</template>
		<UHorizontalNavigation
			class="w-full border-b border-gray-200 dark:border-gray-800"
			:ui="{ container: '!w-full px-1', inner: '!w-full', base: 'flex items-center justify-center', icon: { base: 'w-6 h-6' } }"
			:links="links"
		/>
		<div class="">
			<template v-if="tab === 'profile'">
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
			</template>
			<template v-if="tab === 'settings'">
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
			</template>
		</div>
	</UDashboardSlideover>
</template>
