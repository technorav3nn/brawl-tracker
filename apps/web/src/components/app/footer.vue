<!-- eslint-disable vue/object-property-newline -->
<template>
	<UFooter
		:ui="{
			// @ts-expect-error Not sure why it's erroring
			bottom: {
				wrapper: 'border-t border-gray-200 dark:border-gray-800',
				container: '!py-6',
			},
			top: { wrapper: 'border-t border-gray-200 dark:border-gray-800', container: 'py-8 lg:py-12' },
		}"
	>
		<template #top>
			<AppFooterColumns />
		</template>

		<template #left>
			<UButton
				aria-label="BrawlTrack Discord"
				icon="i-simple-icons-discord"
				to="https://google.com"
				target="_blank"
				v-bind="$ui.button.secondary"
			/>
			<UButton
				aria-label="BrawlTrack GitHub"
				icon="i-simple-icons-github"
				to="https://github.com/technorav3nn/brawl-tracker"
				target="_blank"
				v-bind="$ui.button.secondary"
			/>
		</template>

		<template #right>
			<NuxtLink
				v-if="$route.path.startsWith('/pro')"
				to="https://ui.nuxt.com/pro/purchase"
				target="_blank"
				class="text-sm text-gray-500 dark:text-gray-400"
			>
				Purchase <span class="text-gray-900 dark:text-white">Nuxt UI Pro</span>
			</NuxtLink>
			<NuxtLink
				v-else
				to="https://github.com/technorav3nn"
				target="_blank"
				class="text-sm text-gray-500 dark:text-gray-400 flex items-center"
			>
				© 2024 Death_Blows
				<div class="h-5 w-0 rounded border-gray-700 border-l-2 mx-2 translate-x-[0.02rem]" />
				Made with <UIcon name="i-heroicons-heart-solid" class="text-red-500 size-5 ml-1" />
			</NuxtLink>
		</template>
	</UFooter>
</template>
