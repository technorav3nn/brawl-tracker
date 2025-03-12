<script setup lang="ts">
import type { NavigationLink } from "@nuxt/ui-pro/types";

definePageMeta({
	middleware: "protected",
});

const links: NavigationLink[] = [
	{
		label: "Profile",
		to: "/settings",
		icon: "i-heroicons-user-circle",
		exact: true,
	},
	{
		label: "Sessions",
		to: "/settings/sessions",
		icon: "i-heroicons-device-phone-mobile-20-solid",
	},
	{
		label: "Account",
		to: "/settings/account",
		icon: "i-heroicons-cog",
	},
];
</script>

<template>
	<UContainer>
		<UPageHero
			title="Settings"
			description="Manage your account settings and profile."
			:ui="{ wrapper: 'sm:pt-16!  max-lg:pb-1! pb-8! pt-8! ' }"
		/>
		<USeparator class="hidden lg:block" />
		<UHorizontalNavigation class="block lg:hidden mt-2 border-b border-gray-200 dark:border-gray-800" :links="links" />
		<div class="flex flex-row gap-12 mt-6 p-4 lg:p-0">
			<UVerticalNavigation class="-mx-4 lg:w-1/5 hidden lg:block" :links="links" />
			<div class="flex-1 lg:max-w-2xl pb-20">
				<NuxtPage />
			</div>
		</div>
	</UContainer>
</template>
