<script setup lang="ts">
import type { AsideLink } from "@nuxt/ui-pro/types";

type Link = AsideLink & { children?: AsideLink[] };

const links: Link[] = [
	{
		label: "Brawlers",
		icon: "i-tabler-swords",
		to: "/brawlers",
	},
	{
		label: "Events",
		icon: "i-heroicons-calendar-days",
		to: "/events",
	},
	{
		label: "Players",
		icon: "i-heroicons-users",
		to: "/players",
	},
	{
		label: "Leaderboards",
		icon: "i-heroicons-chart-bar",
		to: "/leaderboards",
	},
	{
		label: "More",
		children: [
			{
				label: "Clubs",
				icon: "i-tabler-shield-star",
				to: "/clubs",
			},
			{
				label: "Brawl News",
				icon: "i-heroicons-envelope",
				to: "/inbox",
			},
		],
	},
];

const flattenedChildren = links.reduce((acc, link) => {
	if (link.children) {
		acc.push(...link.children);
	}

	return acc;
}, [] as Link[]);
</script>

<template>
	<UHeader
		:links="links"
		:ui="{
			// @ts-expect-error - Bug
			panel: { body: '[&_:nth-child(5)]:hidden' },
		}"
	>
		<template #logo>
			<div class="flex items-center">
				<UIcon name="i-heroicons-star-solid" class="text-primary size-6" />
				<span class="ml-2 text-xl font-bold">BrawlTrack</span>
			</div>
		</template>

		<template #right>
			<UColorModeButton />
		</template>

		<template #panel>
			<UAsideLinks :links="links" />
			<UDivider type="dashed" class="my-4" />
			<UAsideLinks :links="flattenedChildren" />
		</template>
	</UHeader>
</template>
