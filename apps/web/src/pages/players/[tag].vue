<script setup lang="ts">
import { formatTag } from "@brawltracker/supercell-api-utils";
import { Image } from "@unpic/vue";
import { LazyPlayersProfileEditorSlideover, LazyAppViewScidSlideover } from "#components";
import type { NavigationMenuItem } from "#ui/types";
import { useProfileConfigStore } from "$components/features/players/profile-editor/store";
import { BACKGROUNDS } from "$lib/backgrounds";

definePageMeta({
	middleware: (to) => {
		// remove the %23 from the tag
		const params = to.params as Record<string, string>;
		if (params.tag?.startsWith("#")) {
			return navigateTo(`/players/${decodeURIComponent(params.tag.slice(1)).replace("#", "")}`);
		}
	},
});

const route = useRoute("players-tag");

const { data: player, suspense: playerSuspense } = useQuery(playersDetailQuery(route.params.tag));
await playerSuspense();

useSeoMeta({
	titleTemplate: () => `%s · ${player.value ? player.value.name : formatTag(route.params.tag)} · BrawlBase`,
});

const brawlersActive = computed(() => route.path.startsWith(`/players/${encodeURIComponent(route.params.tag)}/brawlers`));

const links = computed<NavigationMenuItem[]>(() => [
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

const slideover = useOverlay();
function openScidSlideover() {
	if (!player.value) return;
	slideover.create(LazyAppViewScidSlideover, { props: { playerTag: player.value.tag } }).open();
}

const { data: session } = await authClient.useSession(useFetch);

function openProfileEdtiorSlideover() {
	if (!player.value) return;
	if (player.value.tag !== session?.value?.user.tag) return;
	slideover.create(LazyPlayersProfileEditorSlideover, { props: { player: player.value } }).open();
}

const { data: config } = await useSuspenseQuery(profileConfigDetailQuery(route.params.tag));

const { background, selectedBackground, theme, selectedTheme } = storeToRefs(useProfileConfigStore());
const appConfig = useAppConfig();

function initializeConfig() {
	if (config.value) {
		background.value = BACKGROUNDS.find((bg) => bg.name === config.value?.background) ?? BACKGROUNDS[0];
		selectedBackground.value = background.value;
		theme.value = config.value.theme || "amber";
		selectedTheme.value = theme.value;
	} else {
		background.value = BACKGROUNDS[0];
		selectedBackground.value = background.value;
		theme.value = "amber";
		selectedTheme.value = theme.value;
	}

	appConfig.ui.colors.primary = selectedTheme.value;
}

initializeConfig();

const router = useRouter();

const handlers = [
	router.afterEach((s) => {
		if (!s.path.startsWith(`/players/${encodeURIComponent(route.params.tag)}`)) return;
		initializeConfig();
	}),
	router.afterEach((s) => {
		// Only let it work if the path starst with /players/tag
		if (!s.path.startsWith(`/players/${encodeURIComponent(route.params.tag)}`)) {
			// Reset everyting to default
			selectedTheme.value = "amber";
			theme.value = "amber";
			appConfig.ui.colors.primary = "amber";
		}
	}),
];

onUnmounted(() => {
	for (const destroy of handlers) {
		destroy();
	}
});
</script>

<template>
	<header
		v-if="player"
		:style="{
			'background-position': selectedBackground?.backgroundPosition ?? 'center',
			'--background-image-light': selectedBackground?.hasColorModeVariants
				? `url(/backgrounds/${selectedBackground?.name}-light.${selectedBackground.fileFormat})`
				: `url(/backgrounds/${selectedBackground?.name}.${selectedBackground?.fileFormat})`,
			'--background-image-dark': selectedBackground?.hasColorModeVariants
				? `url(/backgrounds/${selectedBackground?.name}-dark.${selectedBackground.fileFormat})`
				: `url(/backgrounds/${selectedBackground?.name}.${selectedBackground?.fileFormat})`,
		}"
		class="header-bg-image-dark header-bg-image-light"
	>
		<UContainer>
			<UPageHeader class="border-0!" :ui="{ wrapper: 'first-child-row', description: 'mt-2', root: 'flex gap-6' }">
				<div class="absolute right-0 bottom-2 flex h-min gap-2 sm:top-2">
					<PlayersLegacyInformationPopover />
					<UTooltip
						:delayDuration="0"
						:text="player.tag !== session?.user.tag ? 'You can only edit your own profile' : 'Edit Profile'"
					>
						<UButton
							icon="i-heroicons-pencil"
							size="md"
							:disabled="player.tag !== session?.user.tag"
							class="bg-primary-400! text-black dark:bg-(--ui-primary)!"
							@click="openProfileEdtiorSlideover"
						/>
					</UTooltip>
				</div>
				<div class="absolute right-0 bottom-4">
					<!-- <USkeleton class="h-20 w-20" /> -->
					<PlayersPlayerFame />
				</div>
				<template #headline>
					<NuxtImg
						width="110"
						height="110"
						:src="`https://cdn.brawlify.com/profile-icons/regular/${player.icon.id}.png`"
						:alt="player.name"
					/>
				</template>
				<template #title>
					<p class="tracking-tight text-primary-400 dark:text-(--ui-primary)">{{ player.name }}</p>
				</template>
				<template #description>
					<div class="flex flex-row gap-2">
						<div class="flex flex-row items-center gap-x-0.5">
							<p class="text-opacity-80 text-sm font-bold text-white">
								{{ player!.tag }}
							</p>
						</div>
						<div class="flex flex-row items-center gap-x-2">
							<UiCopyButton
								tooltipContent="Copy Tag"
								:text="player.tag"
								class="bg-primary-400! text-black dark:bg-(--ui-primary)! [&>span]:scale-[1.15]"
								size="sm"
							/>
							<UTooltip :delayDuration="0" text="View Supercell ID Profile">
								<UButton
									class="bg-primary-400! text-black dark:bg-(--ui-primary)! [&>span]:scale-[1.20]"
									icon="local:scid"
									size="sm"
									@click="openScidSlideover"
								/>
							</UTooltip>
						</div>
					</div>
					<div class="flex flex-row items-center gap-1">
						<Image
							class="size-8 object-scale-down object-bottom"
							width="20"
							height="20"
							src="/icons/player/club.webp"
							loading="eager"
						/>
						<NuxtLink
							prefetch
							:to="`/clubs/${encodeURIComponent(player.club?.tag)}`"
							class="text-opacity-80 mt-2 text-base font-bold text-white"
						>
							{{ player.club?.name || "No Club" }}
						</NuxtLink>
					</div>
				</template>
			</UPageHeader>
		</UContainer>
	</header>
	<section class="border-b border-neutral-200 dark:border-neutral-800">
		<UContainer class="px-[1.42rem]!">
			<UNavigationMenu
				variant="pill"
				highlight
				:ui="{
					link: 'after:h-[2px] after:absolute after:-bottom-2 after:inset-x-0 ',
					linkLabel: 'overflow-clip text-wrap',
					linkLeadingIcon: 'size-[15px] sm:size-5',
				}"
				class="data-[orientation=vertical]:w-48"
				:items="links"
			/>
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
	background-position: var(--background-position);
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
