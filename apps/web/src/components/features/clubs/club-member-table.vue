<script setup lang="ts">
import type { ClubRole } from "@brawltracker/brawl-stars-api";
import { NuxtLink, type PlayersStatTable } from "#components";

type Props = InstanceType<typeof PlayersStatTable>["$props"];

const {
	params: { tag },
} = useRoute("clubs-tag");
const { data: club, status } = useQuery(clubsDetailQuery(tag));

function getDistribution(role: ClubRole) {
	if (!club.value) return null;
	const { members } = club.value;
	const roleMembers = members.filter((member) => member.role === role);
	const totalMembers = members.length;
	const rolePercentage = (roleMembers.length / totalMembers) * 100;

	return {
		stat: `${role.charAt(0).toUpperCase() + role.slice(1)} Members`,
		amount: roleMembers.length,
		percentage: rolePercentage.toFixed(2) + "%",
	};
}

const seniorDistribution = computed(() => {
	return getDistribution("senior");
});
const vicePresidentDistribution = computed(() => {
	return getDistribution("vicePresident");
});
const memberDistribution = computed(() => {
	return getDistribution("member");
});

const image = {
	src: "/icons/clubs/member.png",
	width: 34,
	height: 34,
	class: "size-[34px] mr-0.5",
};

const president = computed(() => {
	if (!club.value) return null;
	const { members } = club.value;
	return members.find((member) => member.role === "president");
});

const stats = computed<Props["stats"]>(() => {
	if (!club.value) return [];
	return [
		{
			stat: "President",
			color: "text-(--ui-primary)",
			image: {
				src: "/icons/clubs/role.webp",
				width: 34,
				height: 34,
				class: "size-[34px] mr-0.5",
			},
			valueRender: () => {
				return h(
					NuxtLink,
					{
						to: `/players/${president.value?.tag.replace("#", "")}`,
						class: "text-(--ui-primary)",
					},
					() => president.value!.name
				);
			},
		},
		{
			stat: "Member Distribution",
			value: `${memberDistribution.value?.amount} (${memberDistribution.value?.percentage})`,
			color: "text-green-500 dark:text-green-400",
			image,
		},
		{
			stat: "Vice President Distribution",
			value: `${vicePresidentDistribution.value?.amount} (${vicePresidentDistribution.value?.percentage})`,
			color: "text-fuchsia-500 dark:text-fuchsia-400",
			image,
		},
		{
			stat: "Senior Distribution",
			value: `${seniorDistribution.value?.amount} (${seniorDistribution.value?.percentage})`,
			color: "text-red-500 dark:text-red-400",
			image,
		},
	];
});
</script>

<template>
	<PlayersStatTable :loading="status === 'pending'" title="Member Distribution" :stats />
</template>
