<script setup lang="ts">
import { formatTag } from "@brawltracker/supercell-api-utils";
import { Image } from "@unpic/vue";
import { PlayersProfileEditorSlideover, AppViewScidSlideover } from "#components";
import type { NavigationLink } from "#ui-pro/types";
import { useProfileConfigStore } from "$components/features/players/profile-editor/store";
import { BACKGROUNDS } from "$lib/backgrounds";

const route = useRoute("players-tag");

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

const slideover = useSlideover();
function openScidSlideover() {
	if (!player.value) return;
	slideover.open(AppViewScidSlideover, { player: player.value });
}

const user = useDatabaseUser();
function openProfileEdtiorSlideover() {
	if (!player.value) return;
	if (player.value.tag !== user?.value?.profile.tag) return;
	slideover.open(PlayersProfileEditorSlideover, { player: player.value });
}

const { data: config } = await useFetch(() => `/api/profiles/${encodeURIComponent(route.params.tag)}/config`, {
	key: `profiles-config-${player.value?.tag}`,
});

const { background, selectedBackground, theme, selectedTheme } = storeToRefs(useProfileConfigStore());
const appConfig = useAppConfig();

function initalizeConfig() {
	if (config.value) {
		console.log("config exists");
		if (config.value.background) {
			background.value = BACKGROUNDS.find((bg) => bg.name === config.value!.background)!;
			selectedBackground.value = background.value;
		} else {
			background.value = BACKGROUNDS[0];
			selectedBackground.value = background.value;
		}

		if (config.value.theme) {
			theme.value = config.value.theme;
			selectedTheme.value = theme.value;
		} else {
			theme.value = "amber";
			selectedTheme.value = theme.value;
		}

		selectedBackground.value = background.value;
	} else {
		background.value = BACKGROUNDS[0];
		selectedBackground.value = background.value;
		theme.value = "amber";
		selectedTheme.value = theme.value;
	}

	appConfig.ui.primary = theme.value;
}

const router = useRouter();

initalizeConfig();
router.afterEach((s) => {
	if (!s.path.startsWith(`/players/${encodeURIComponent(route.params.tag)}`)) return;
	initalizeConfig();
});
router.beforeResolve((s) => {
	// Only let it work if the path starst wit /players/tag
	if (!s.path.startsWith(`/players/${encodeURIComponent(route.params.tag)}`)) {
		// Reset everyting to default
		selectedTheme.value = "amber";
		theme.value = "amber";
		appConfig.ui.primary = "amber";
	}
});
</script>

<template>
	<header
		v-if="player && selectedBackground"
		:style="{
			'--background-image-light': selectedBackground.hasColorModeVariants
				? `url(/backgrounds/${selectedBackground.name}-light.${selectedBackground.fileFormat})`
				: `url(/backgrounds/${selectedBackground.name}.${selectedBackground.fileFormat})`,
			'--background-image-dark': selectedBackground.hasColorModeVariants
				? `url(/backgrounds/${selectedBackground.name}-dark.${selectedBackground.fileFormat})`
				: `url(/backgrounds/${selectedBackground.name}.${selectedBackground.fileFormat})`,
		}"
		class="header-bg-image-dark header-bg-image-light"
	>
		<UContainer>
			<UPageHeader class="!border-0" :ui="{ wrapper: 'first-child-row', description: 'mt-2' }">
				<div class="absolute top-2 right-0">
					<UTooltip :text="player.tag !== user?.profile.tag ? 'You can only edit your own profile' : 'Edit Profile'">
						<UButton
							icon="i-heroicons-pencil"
							size="sm"
							:disabled="player.tag !== user?.profile.tag"
							class="text-black"
							@click="openProfileEdtiorSlideover"
						/>
					</UTooltip>
				</div>
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
							<UiCopyButton tooltipContent="Copy Tag" :text="player.tag" class="text-black [&>span]:scale-[1.15]" size="xs" />
							<UTooltip text="View Supercell ID Profile">
								<UButton class="text-black [&>span]:scale-[1.20]" icon="local:scid" size="xs" @click="openScidSlideover" />
							</UTooltip>
						</div>
					</div>
					<div class="flex gap-1 flex-row items-center">
						<Image
							class="object-scale-down object-bottom size-8"
							width="20"
							height="20"
							src="/icons/player/club.webp"
							loading="eager"
						/>
						<NuxtLink
							prefetch
							:to="`/clubs/${encodeURIComponent(player.club?.tag)}`"
							class="mt-2 text-white text-opacity-80 font-bold text-base"
						>
							{{ player.club?.name || "No Club" }}
						</NuxtLink>
					</div>
				</template>
			</UPageHeader>
		</UContainer>
	</header>
	<section class="border-b border-gray-200 dark:border-gray-800">
		<UContainer class="!px-[1.42rem]">
			<UHorizontalNavigation :links="links" />
		</UContainer>
	</section>
	<UContainer class="mt-3">
		<NuxtPage />
	</UContainer>
</template>

<style scoped lang="css">
html[class="dark"] .header-bg-image-dark {
	background-image: 
        /** darken the yellow with a lienar gradient */
		/** linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url("/backgrounds/yellow-bg-dark.webp"); */
		/** converted to css variables */
		linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), var(--background-image-dark);
	background-size: cover;
	background-position: center;
}
html[class="light"] .header-bg-image-light {
	background-image: 
        /** lighten the yellow a little bit */
		/** linear-gradient(rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.3)), url("/backgrounds/yellow-bg-light.webp"); */
		linear-gradient(rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.3)), var(--background-image-light);

	background-size: cover;
	background-position: center;
}

.first-child-row > *:first-child {
	flex-direction: row;
}
</style>
