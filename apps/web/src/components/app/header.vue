<script setup lang="ts">
import { LazyAppHeaderProfileSlideover } from "#components";

const { data: session } = await authClient.useSession(useFetch);

const overlay = useOverlay();
function onProfileClick() {
	for (const o of overlay.overlays) overlay.close(o.id);
	overlay.create(LazyAppHeaderProfileSlideover).open();
}

const links = computed<any[]>(() => [
	{
		label: "Brawlers",
		icon: "i-heroicons-star",
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
		icon: "i-heroicons-chart-bar-square",
		to: "/leaderboards",
		children: [
			{
				label: "Players",
				to: "/leaderboards/players",
				description: "View the best players!",
				icon: "i-heroicons-users",
			},
			{
				label: "Clubs",
				to: "/leaderboards/clubs",
				description: "View the clubs leaderboard!",
				icon: "i-heroicons-user-group",
			},
			{
				label: "Brawlers",
				to: "/leaderboards/brawlers",
				description: "View the leaderboards of brawlers!",
				class: "w-full",
				icon: "i-heroicons-star",
			},
		],
	},
	{
		label: "More",
		icon: "i-heroicons-ellipsis-horizontal-circle",
		children: [
			{
				label: "Clubs",
				icon: "i-heroicons-user-group",
				to: "/clubs",
				description: "Search and view your club or other clubs!",
			},
			{
				label: "Brawl Stars Inbox",
				icon: "i-heroicons-inbox",
				to: "/inbox",
				description: "Read the latest news about Brawl Stars!",
			},
		],
	},
]);
const route = useRoute();

const mobileLinks = computed(() =>
	links.value.map((link) => ({
		...link,
		defaultOpen: link.children && route.path.startsWith(link.to as string),
	}))
);
const linksWithoutIcons = computed(() => links.value.map((link) => ({ ...link, icon: undefined })));
</script>

<template>
	<UHeader mode="drawer">
		<template #left>
			<NuxtLink to="/" class="flex items-center">
				<NuxtImg src="/favicon.png" width="25" height="25" />
				<p class="ml-2 text-xl font-bold">Brawl<span class="text-amber-500 dark:text-amber-400">Base</span></p>
			</NuxtLink>
		</template>

		<template #right>
			<UButton v-if="!session" color="neutral" variant="ghost" class="hidden sm:block" to="/login">Log In</UButton>
			<UButton v-if="!session" class="hidden sm:block" to="/signup">Sign Up</UButton>
			<UButton
				v-if="!session"
				class="sm:hidden"
				color="primary"
				to="/login"
				icon="i-heroicons-arrow-left-end-on-rectangle-20-solid"
				square
			/>
			<UButton
				v-if="session"
				:ui="{ base: 'gap-x-[0.095rem]' }"
				variant="ghost"
				color="neutral"
				class="px-1.5"
				@click="onProfileClick"
			>
				<NuxtImg v-if="session?.user.image" class="rounded-full" width="28" height="28" :src="session?.user.image" />
				<UAvatar v-else class="h-7 w-7" :alt="session?.user.name" />
			</UButton>
			<UColorModeButton class="[&_>span]:fill-amber-100!" />
		</template>

		<UNavigationMenu
			:ui="{
				list: 'gap-x-2',
				link: 'text-sm/6 font-semibold flex text-(--ui-text-toned) data-[active]:text-(--ui-primary) items-center gap-1 transition-none hover:text-(--ui-primary)',
			}"
			:items="linksWithoutIcons"
			variant="link"
		/>

		<template #body>
			<UNavigationMenu orientation="vertical" :items="mobileLinks" class="-mx-2.5" />
		</template>
	</UHeader>
</template>
