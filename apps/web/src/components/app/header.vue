<script setup lang="ts">
import type { AsideLink } from "@nuxt/ui-pro/types";
import { AppHeaderProfileSlideover, LazyAppHeaderProfileSlideover } from "#components";

const toast = useToast();
const slideover = useSlideover();
const user = useUser();
const databaseUser = useDatabaseUser();

const avatar = computed<string | null>(() =>
	databaseUser.value?.profile.isConnected ? databaseUser.value!.profile.avatar! : null
);

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
		to: "/leaderboards",
		children: [
			{
				label: "Players",
				to: "/leaderboards/players",
				icon: "i-heroicons-users",
				description: "View the best players!",
			},
			{
				label: "Clubs",
				to: "/leaderboards/clubs",
				icon: "i-tabler-shield-star",
				description: "View the clubs leaderboard!",
			},
			{
				label: "Brawlers",
				to: "/leaderboards/brawlers",
				icon: "i-tabler-swords",
				description: "View the leaderboards of brawlers!",
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
				description: "Search and view your club or other clubs!",
			},
			{
				label: "Brawl Stars Inbox",
				icon: "i-heroicons-envelope",
				to: "/inbox",
				description: "Read the latest news about Brawl Stars!",
			},
		],
	},
]);

const items = computed(() => [
	[
		{
			label: "placeholder",
			avatar: {
				alt: "placeholder avatar",
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
				// await $fetch("/api/auth/logout", { method: "POST" });
				// user.value = null;
				// await navigateTo("/");
				toast.add({ title: "ADD THIS FUNCTIONALITY", color: "primary" });
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
	>
		<template #logo>
			<div class="flex items-center">
				<UIcon name="i-heroicons-star-solid" class="text-primary size-6" />
				<span class="ml-2 text-xl font-bold">BrawlTrack</span>
			</div>
		</template>

		<template #right>
			<UButton v-if="!user" color="gray" variant="ghost" class="hidden sm:block" to="/login">Log In</UButton>
			<UButton v-if="!user" class="hidden sm:block" to="/signup">Sign Up</UButton>
			<UButton
				v-if="!user"
				class="sm:hidden"
				color="primary"
				to="/login"
				icon="i-heroicons-arrow-left-end-on-rectangle-20-solid"
				square
			/>

			<UTooltip v-if="user" text="My Profile">
				<UButton
					v-if="user"
					:ui="{ gap: { sm: 'gap-x-[0.095rem]' } }"
					variant="ghost"
					color="gray"
					class="px-1.5"
					@click="slideover.open(LazyAppHeaderProfileSlideover)"
				>
					<NuxtImg v-if="avatar" class="rounded-full" width="28" height="28" :src="avatar" />
					<UAvatar v-else class="w-7 h-7" :alt="user.name" />
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
