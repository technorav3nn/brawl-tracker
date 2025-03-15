<!-- eslint-disable vue/object-property-newline -->
<template>
	<UFooter
		:ui="{
			bottom: 'border-t border-neutral-200 dark:border-neutral-800 py-6!',
			top: 'border-t border-b border-neutral-200 dark:border-neutral-800 py-8 lg:py-12',
		}"
	>
		<template #top>
			<UContainer>
				<AppFooterColumns />
			</UContainer>
		</template>

		<template #left>
			<UButton
				variant="link"
				color="neutral"
				aria-label="BrawlTrack Discord"
				icon="i-simple-icons-discord"
				to="https://google.com"
				target="_blank"
			/>
			<UButton
				variant="link"
				color="neutral"
				aria-label="BrawlTrack GitHub"
				icon="i-simple-icons-github"
				to="https://github.com/technorav3nn/brawl-tracker"
				target="_blank"
			/>
		</template>

		<template #right>
			<NuxtLink
				to="https://github.com/technorav3nn"
				target="_blank"
				class="flex items-center text-sm text-neutral-500 dark:text-neutral-400"
			>
				© 2024 Death_Blows
				<div class="mx-2 h-5 w-0 translate-x-[0.02rem] rounded-sm border-l-2 border-neutral-700" />
				Made with <UIcon name="i-heroicons-heart-solid" class="ml-1 size-5 text-red-500" />
			</NuxtLink>
		</template>
	</UFooter>
</template>
