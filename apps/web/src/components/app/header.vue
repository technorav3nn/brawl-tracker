<script setup lang="ts">
import { LazyAppHeaderProfileSlideover } from "#components";

const user = useUser();
const databaseUser = useDatabaseUser();

const avatar = computed<string | null>(() =>
	databaseUser.value?.profile.isConnected ? databaseUser.value!.profile.avatar! : null
);

const overlay = useOverlay();
function onProfileClick() {
	for (const o of overlay.overlays) overlay.close(o.id);
	overlay.create(LazyAppHeaderProfileSlideover).open();
}

const links = computed<any[]>(() => [
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
				class: "w-full",
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
			import.meta.env.DEV
				? {
						label: "test",
						to: "/test",
					}
				: {},
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
	<UHeader>
		<template #left>
			<NuxtLink to="/" class="flex items-center">
				<UIcon name="i-heroicons-star-solid" class="size-6 text-(--ui-primary)" />
				<p class="ml-2 text-xl font-bold">Brawl<span class="text-(--ui-primary)">Base</span></p>
			</NuxtLink>
		</template>

		<template #right>
			<UButton v-if="!user" color="neutral" variant="ghost" class="hidden sm:block" to="/login">Log In</UButton>
			<UButton v-if="!user" class="hidden sm:block" to="/signup">Sign Up</UButton>
			<UButton
				v-if="!user"
				class="sm:hidden"
				color="primary"
				to="/login"
				icon="i-heroicons-arrow-left-end-on-rectangle-20-solid"
				square
			/>
			<UButton
				v-if="user"
				:ui="{ base: 'gap-x-[0.095rem]' }"
				variant="ghost"
				color="neutral"
				class="px-1.5"
				@click="onProfileClick"
			>
				<NuxtImg v-if="avatar" class="rounded-full" width="28" height="28" :src="avatar" />
				<UAvatar v-else class="h-7 w-7" :alt="user.name" />
			</UButton>
			<UColorModeButton />
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
