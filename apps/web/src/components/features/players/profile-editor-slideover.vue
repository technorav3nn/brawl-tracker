<script setup lang="ts">
import type { Player } from "@brawltracker/brawl-stars-api";
import type { NavigationLink } from "@nuxt/ui-pro/types";
import { useProfileConfigStore } from "./profile-editor/store";
import { PlayersProfileEditorBackgroundCard, UDashboardSlideover } from "#components";
import { BACKGROUNDS } from "$lib/backgrounds";

defineProps<{
	player: Player;
}>();

const tabs = ["background", "theme"] as const;
const tab = ref<(typeof tabs)[number]>("background");
const oldTab = ref<(typeof tabs)[number]>("background");

const links = computed<NavigationLink[]>(() => [
	{
		icon: "i-heroicons-photo-20-solid",
		click: () => setTab("background"),
		active: tab.value === "background",
		label: "Background",
	},
	{
		icon: "i-heroicons-swatch-20-solid",
		click: () => setTab("theme"),
		active: tab.value === "theme",
		label: "Theme",
	},
]);

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

const profileConfig = useProfileConfigStore();
const loading = ref(false);

const buttonText = ref("Apply");
const buttonIcon = ref("i-heroicons-pencil-square-20-solid");

async function onApplyClick() {
	loading.value = true;
	await profileConfig.applyChanges();
	buttonIcon.value = "i-heroicons-check-20-solid";
	buttonText.value = "Applied!";
	loading.value = false;
	setTimeout(() => {
		buttonIcon.value = "i-heroicons-pencil-square-20-solid";
		buttonText.value = "Apply";
	}, 2000);
}
</script>

<template>
	<UDashboardSlideover
		title="Edit Profile"
		:ui="{
			width: 'max-w-sm!',
			body: { base: 'overflow-y-auto!', padding: 'p-0' },
			footer: {
				base: 'z-50 bg-white dark:bg-gray-900',
			},
		}"
	>
		<UHorizontalNavigation
			class="w-full border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 bg-white dark:bg-gray-900"
			:ui="{ container: 'w-full! px-1', inner: 'w-full!', base: 'flex items-center justify-center', icon: { base: 'w-6 h-6' } }"
			:links="links"
		/>
		<TransitionGroup
			name="tabs"
			tag="div"
			:style="{
				'--transform-data': `translateX(${computeTabsDirection() === 'none' ? 0 : computeTabsDirection() === 'right' ? 18 : -18}px)`,
			}"
		>
			<div v-if="tab === 'background'">
				<div class="w-full py-5 px-4 border-b border-gray-200 dark:border-gray-800">
					<h1 class="text-2xl font-semibold">Background</h1>
					<p class="text-gray-500 dark:text-gray-400 text-sm">Choose a background to change on your profile</p>
				</div>
				<div class="flex flex-col gap-2.5 p-4">
					<PlayersProfileEditorBackgroundCard
						v-for="background in BACKGROUNDS"
						:key="background.name"
						:background
						type="button"
						class="focus:outline-2 focus:outline-primary-500 dark:focus:outline-primary-400"
					/>
				</div>
			</div>
			<div v-if="tab === 'theme'">
				<div class="w-full py-5 px-4 border-b border-gray-200 dark:border-gray-800">
					<h1 class="text-2xl font-semibold">Theme</h1>
					<p class="text-gray-500 dark:text-gray-400 text-sm">Change your profiles theme color to anything you choose!</p>
				</div>
				<div class="flex flex-col gap-2.5 p-4">
					<PlayersProfileEditorColorPicker />
				</div>
			</div>
		</TransitionGroup>
		<template #footer>
			<UButton :disabled="buttonText === 'Applied!'" :icon="buttonIcon" :loading block @click="onApplyClick">
				{{ buttonText }}
			</UButton>
		</template>
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
