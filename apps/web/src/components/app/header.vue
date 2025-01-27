<script setup lang="ts">
import { getCdnUrlForAvatarId } from "@brawltracker/supercell-id-api";
import type { AsideLink } from "@nuxt/ui-pro/types";
import HeaderProfileSlideover from "./header-profile-slideover.vue";
import { createGetCachedData } from "$lib/utils/nuxt";

const toast = useToast();
const slideover = useSlideover();
const user = useUser();
const nuxtApp = useNuxtApp();

const { data: profile, status } = await useFetch("/api/auth/scid/my-profile", {
	ignoreResponseError: true,
	watch: user.value === null ? [user] : [],
	getCachedData: createGetCachedData(nuxtApp),
	key: "profile",
});

type Link = AsideLink & { children?: AsideLink[] };

const links = computed<Link[]>(() => [
	{
		label: "Brawlers",
		icon: "i-tabler-swords",
		to: "/brawlers",
	},
	{
		label: "Events",
		icon: "i-heroicons-calendar-days",
		to: "/events",
	},
	{
		label: "Players",
		icon: "i-heroicons-users",
		to: "/players",
	},
	{
		label: "Leaderboards",
		icon: "i-heroicons-chart-bar",
		children: [
			{
				label: "Ranked",
				to: "/leaderboards/ranked",
				icon: "i-heroicons-trophy",
			},
			{
				label: "Players",
				to: "/leaderboards/players",
				icon: "i-heroicons-users",
			},
			{
				label: "Clubs",
				to: "/leaderboards/clubs",
				icon: "i-tabler-shield-star",
			},
		],
	},
	{
		label: "More",
		icon: "i-heroicons-ellipsis-horizontal-circle",
		children: [
			{
				label: "Clubs",
				icon: "i-tabler-shield-star",
				to: "/clubs",
			},
			{
				label: "Brawl News",
				icon: "i-heroicons-envelope",
				to: "/inbox",
			},
		],
	},
]);

const items = computed(() => [
	[
		{
			label: user.value?.username,
			avatar: {
				alt: user.value?.username,
				class: "dark:!bg-gray-600",
			},
		},
	],
	[
		{
			label: "My Club",
			icon: "i-tabler-shield-pin",
		},
		{
			label: "Settings",
			icon: "i-heroicons-cog",
			to: "/settings",
		},
	],
	[
		{
			label: "Logout",
			icon: "i-heroicons-arrow-right-end-on-rectangle",
			click: async () => {
				await $fetch("/api/auth/logout", { method: "POST" });
				user.value = null;
				await navigateTo("/");
				toast.add({ title: "Logged out successfully", color: "primary" });
			},
		},
	],
]);
</script>

<template>
	<AppHeaderProfileSlideover :items="items" />
	<UHeader
		:links="links"
		:ui="{
			panel: { body: '[&_:nth-child(5)]:hidden' },
		}"
		class="bg-background"
	>
		<template #logo>
			<div class="flex items-center">
				<UIcon name="i-heroicons-star-solid" class="text-primary size-6" />
				<span class="ml-2 text-xl font-bold">BrawlTrack</span>
			</div>
		</template>

		<template #right>
			<UButton v-if="!user" class="hidden sm:block" to="/login">Log In</UButton>
			<!-- <UButton v-if="!user" class="mr-1.5 hidden sm:block" color="primary" to="/signup">Sign Up</UButton> -->
			<UButton
				v-if="!user"
				class="sm:hidden"
				color="primary"
				to="/login"
				icon="i-heroicons-arrow-left-end-on-rectangle-20-solid"
				square
			/>
			<UTooltip v-if="status === 'success' && profile?.exists" text="My Profile">
				<UButton
					v-if="status === 'success' && profile?.exists"
					:ui="{ gap: { sm: 'gap-x-[0.095rem]' } }"
					variant="ghost"
					trailingIcon="i-heroicons-chevron-down-20-solid"
					color="gray"
					class="px-1.5"
					@click="slideover.open(HeaderProfileSlideover)"
				>
					<NuxtImg class="w-7 h-7 rounded-full" :src="getCdnUrlForAvatarId(profile.data?.avatarImage!)" />
				</UButton>
			</UTooltip>
			<UTooltip :text="$colorMode.value === 'dark' ? 'Turn the lights on' : 'Turns the lights off'">
				<UColorModeButton />
			</UTooltip>
		</template>

		<template #panel>
			<UNavigationTree
				:links="links"
				defaultOpen
				:multiple="false"
				:ui="{
					accordion: {
						button: {
							base: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium []',
						},
						label: 'font-normal',
					},
				}"
			/>
		</template>
	</UHeader>
</template>
