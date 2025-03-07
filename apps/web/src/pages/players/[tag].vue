<script setup lang="ts">
import { formatTag } from "@brawltracker/supercell-api-utils";
import type { NavigationLink } from "#ui-pro/types";

const route = useRoute("players-tag");
const nuxtApp = useNuxtApp();

const { data: player } = await useFetch("/api/players", {
	query: { tag: route.params.tag },
	key: `players-${route.params.tag}`,
});

useSeoMeta({
	titleTemplate: () => `%s · ${player.value ? player.value.name : formatTag(route.params.tag)} · BrawlTrack`,
});

const brawlersActive = computed(() => route.path.startsWith(`/players/${encodeURIComponent(route.params.tag)}/brawlers`));

const links = computed<NavigationLink[]>(() => [
	{
		label: "Profile",
		icon: "i-heroicons-user-circle",
		to: `/players/${encodeURIComponent(route.params.tag)}`,
		exact: true,
	},
	{
		label: "Brawlers",
		icon: "i-heroicons-fire",
		to: `/players/${encodeURIComponent(route.params.tag)}/brawlers`,
		active: brawlersActive.value,
	},
	{
		label: "Battles",
		icon: "i-heroicons-clipboard-document-list",
		to: `/players/${encodeURIComponent(route.params.tag)}/battles`,
	},
]);
</script>

<template>
	<header v-if="player" class="header-bg-image">
		<UContainer>
			<UPageHeader class="!border-0" :ui="{ wrapper: 'first-child-row', description: 'mt-2' }">
				<template #icon>
					<NuxtImg
						width="110"
						height="110"
						:src="`https://cdn.brawlify.com/profile-icons/regular/${player.icon.id}.png`"
						:alt="player.name"
					/>
				</template>
				<template #title>
					<p class="dark:text-primary-400 text-primary-100">{{ player.name }}</p>
				</template>
				<template #description>
					<div class="flex flex-row gap-2">
						<div class="flex flex-row gap-x-0.5 items-center">
							<p class="text-white text-opacity-80 font-bold text-sm">
								{{ player!.tag }}
							</p>
						</div>
						<div class="flex flex-row gap-x-2 items-center">
							<UButton class="text-black [&>span]:scale-[1.15]" size="xs" icon="i-heroicons-clipboard-document"></UButton>
							<UButton class="text-black [&>span]:scale-[1.20]" icon="local:scid" size="xs"> </UButton>
						</div>
					</div>
				</template>
			</UPageHeader>
		</UContainer>
	</header>
	<section class="border-b border-gray-200 dark:border-gray-800">
		<UContainer class="!px-[1.42rem]">
			<UHorizontalNavigation :links="links"></UHorizontalNavigation>
		</UContainer>
	</section>
	<UContainer class="mt-3">
		<NuxtPage />
	</UContainer>
</template>

<style scoped lang="css">
html[class="dark"] .header-bg-image {
	background-image: 
        /** darken the yellow with a lienar gradient */
		linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url("/brawlstars/profile-bg-dark.webp");
	background-size: cover;
	background-position: center;
}
html[class="light"] .header-bg-image {
	background-image: 
        /** lighten the yellow a little bit */
		linear-gradient(rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.3)), url("/brawlstars/profile-bg-light.webp");
	background-size: cover;
	background-position: center;
}

.first-child-row > *:first-child {
	flex-direction: row;
}
</style>
