<script setup lang="ts">
import type { NavigationLink } from "@nuxt/ui-pro/types";

const links: NavigationLink[] = [
	{
		label: "Profile",
		to: "/settings",
		icon: "i-heroicons-user-circle",
		exact: true,
	},
	{
		label: "Account",
		to: "/settings/account",
		icon: "i-heroicons-cog",
	},
	{
		label: "Connections",
		to: "/settings/connections",
		icon: "i-heroicons-link",
	},
];
</script>

<template>
	<UContainer>
		<UPageHero
			title="Settings"
			description="Manage your account settings and profile."
			:ui="{ wrapper: 'sm:!pt-16 sm:!pb-8 !pt-8 !pb-4' }"
		/>
		<UDivider />
		<div class="flex flex-row gap-12 mt-6">
			<UVerticalNavigation class="-mx-4 lg:w-1/5" :links="links" />
			<div class="flex-1 lg:max-w-2xl">
				<NuxtPage />
			</div>
		</div>
	</UContainer>
</template>
