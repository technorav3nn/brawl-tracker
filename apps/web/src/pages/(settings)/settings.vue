<script setup lang="ts">
import { UNavigationMenu } from "#components";
import type { NavigationMenuItem } from "#ui/types";

definePageMeta({
	middleware: "protected",
});

const links: NavigationMenuItem[] = [
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
		icon: "i-heroicons-cog-8-tooth",
	},
];
</script>

<template>
	<UContainer>
		<UPageHeader
			:ui="{ wrapper: 'pt-10', root: 'border-0 pt-8 pb-4' }"
			title="Settings"
			description="Manage your account settings and profile."
		/>
		<USeparator class="hidden lg:block" />
		<UNavigationMenu highlight class="mt-2 block border-b border-neutral-200 lg:hidden dark:border-neutral-800" :items="links" />
		<div class="mt-6 flex flex-row gap-12 p-4 lg:p-0">
			<UNavigationMenu orientation="vertical" class="-mx-4 hidden lg:block lg:w-1/5" :items="links" />
			<div class="flex-1 pb-20 lg:max-w-2xl">
				<NuxtPage />
			</div>
		</div>
	</UContainer>
</template>
