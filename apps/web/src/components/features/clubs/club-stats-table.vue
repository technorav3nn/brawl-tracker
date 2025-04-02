<script setup lang="ts">
import { capitalizeFirstLetter } from "$lib/utils/common";

const {
	params: { tag },
} = useRoute("clubs-tag");
const { data: club } = useQuery(clubsDetailQuery(tag));

// eslint-disable-next-line @typescript-eslint/unbound-method
const { format } = new Intl.NumberFormat("en-US");

const trophyRange = computed(() => {
	if (!club.value) return [];
	const trophies = club.value.members.map((member) => member.trophies);
	const min = Math.min(...trophies);
	const max = Math.max(...trophies);
	return [format(min), format(max)];
});

const stats = computed(() => {
	if (!club.value) return [];
	return [
		{
			stat: "Trophies",
			value: format(club.value.trophies),
			image: { src: "/icons/player/trophy.webp" },
			color: "text-amber-500 dark:text-amber-400",
		},
		{
			stat: "Trophies Required to Join",
			value: format(club.value.requiredTrophies),
			image: { src: "/icons/player/highest-trophies.png" },
			color: "text-sky-500 dark:text-sky-400",
		},
		{
			stat: "Type",
			value: capitalizeFirstLetter(club.value.type as unknown as string),
			image: { src: "/icons/player/info-circle.webp" },
			color: "text-blue-500 dark:text-blue-400",
		},
		{
			stat: "Members",
			value: `${club.value.members.length} / 30`,
			image: { src: "/icons/clubs/members.png" },
			color: "text-green-500 dark:text-green-400",
		},
		{
			stat: "Trophy Range",
			value: `${trophyRange.value[0]} - ${trophyRange.value[1]}`,
			image: { src: "/icons/clubs/trophy-range.webp" },
			color: "text-amber-500 dark:text-amber-400",
		},
	];
});
</script>

<template>
	<PlayersStatTable title="Information" :stats />
</template>
