<script setup lang="ts">
const links = [
	{
		label: "Utilities",
		children: [
			{
				label: "Calculators",
				to: "https://nuxters.nuxt.com",
			},
			{
				label: "Community Events",
				to: "/utlities/community-events",
			},
		],
	},
	{
		label: "Links",
		children: [
			{
				label: "Discord Bot Invite",
				to: "https://google.com/",
				target: "_blank",
			},
			{
				label: "Privacy Policy",
				to: "https://google.com/",
				target: "_blank",
			},
		],
	},
];
</script>

<template>
	<UFooterColumns
		:links="links"
		:ui="{
			left: 'max-w-xl col-span-2',
			center: 'xl:grid-cols-2 xl:col-span-1',
		}"
	>
		<template #left>
			<div class="flex h-full gap-2.5 flex-col">
				<div>
					<div class="flex gap-2 flex-row items-center">
						<UIcon name="i-heroicons-star-solid" class="text-(--ui-primary) size-8" />
						<p class="font-bold text-xl">BrawlTrack</p>
					</div>
				</div>
				<p class="text-xs text-gray-400">
					This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not
					responsible for it. For more information see
					<NuxtLink target="_blank" to="https://supercell.com/en/fan-content-policy/" class="text-(--ui-primary) hover:underline">
						Supercell’s Fan Content Policy.
					</NuxtLink>
				</p>
			</div>
		</template>
	</UFooterColumns>
</template>
