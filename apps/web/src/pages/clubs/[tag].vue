<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/types";

definePageMeta({
	middleware: (to) => {
		const params = to.params as Record<string, string>;
		if (params.tag?.startsWith("#")) {
			return navigateTo(`/clubs/${decodeURIComponent(params.tag.slice(1)).replace("#", "")}`);
		}
	},
});

const {
	params: { tag },
} = useRoute("clubs-tag");
const { data: club } = useLazyQuery(clubsDetailQuery(tag));

const links = computed<NavigationMenuItem[]>(() => [
	{
		label: "Info",
		icon: "i-heroicons-information-circle",
		to: `/clubs/${encodeURIComponent(tag)}`,
		exact: true,
	},
	{
		label: "Mega Pig",
		icon: "i-lucide-piggy-bank",
		to: `/clubs/${encodeURIComponent(tag)}/mega-pig`,
	},
]);
</script>

<template>
	<header class="header-bg-image">
		<UContainer>
			<UPageHeader class="border-0!" :ui="{ wrapper: 'first-child-row', description: 'mt-2', root: 'flex gap-6' }">
				<template #headline>
					<NuxtImg
						v-if="club"
						width="80"
						height="80"
						:src="`https://cdn.brawlify.com/club-badges/regular/${club.badgeId}.png`"
						:alt="club.name"
						class="size-[80px] object-contain"
					/>
					<USkeleton v-else class="h-20 w-20 bg-primary-400/30" />
				</template>
				<template #title>
					<p v-if="club" class="tracking-tight text-primary-400 dark:text-(--ui-primary)">{{ club.name }}</p>
					<USkeleton v-else class="mt-1 h-7 w-50 bg-primary-400/30" />
				</template>
				<template #description>
					<div v-if="club" class="flex flex-row gap-2">
						<div class="flex flex-row items-center gap-x-0.5">
							<p class="text-opacity-80 text-sm font-bold text-white">
								{{ club!.tag }}
							</p>
						</div>
						<div class="flex flex-row items-center gap-x-2">
							<UiCopyButton
								tooltipContent="Copy Tag"
								:text="club.tag"
								class="bg-primary-400! text-black dark:bg-(--ui-primary)! [&>span]:scale-[1.15]"
								size="sm"
							/>
						</div>
					</div>
					<USkeleton v-else class="mt-5 h-5 w-32 bg-primary-400/30" />
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
					linkLeadingIcon: 'size-[15px] sm:size-5 last-of-type:hidden',
				}"
				class=": data-[orientation=vertical]:w-48"
				:items="links"
			/>
		</UContainer>
	</section>
	<UContainer class="mt-3">
		<NuxtPage />
	</UContainer>
</template>

<style scoped>
html[class="dark"] .header-bg-image {
	background-image: 
        /** darken the yellow with a lienar gradient */
		linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url("/backgrounds/yellow-bg-dark.webp");
	background-size: cover;
	background-position: center;
}
html[class="light"] .header-bg-image {
	background-image: 
        /** lighten the yellow A LITTLE BIT , dont use 0.2 */
		linear-gradient(rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.3)), url("/backgrounds/yellow-bg-light.webp");
	background-size: cover;
	background-position: center;
}
</style>
