<script setup lang="ts">
import type { ClubMember } from "@brawltracker/brawl-stars-api";
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";
import { Image } from "@unpic/vue";
import { convertHexToHexColor } from "$lib/utils/brawl-stars/colors";
import { camelCaseToNormalCase } from "$lib/utils/common";

defineProps<{
	member: ClubMember;
}>();
</script>

<template>
	<UPageCard class="w-full" :ui="{ container: 'p-0!' }" :to="`/players/${encodeURIComponent(member.tag)}`">
		<div class="flex flex-row">
			<NuxtImg
				width="97"
				height="97"
				:src="`${CDN_URL_V2}/brawlify/profile-icons/regular/${member.icon.id}.png`"
				:alt="member.name"
				class="rounded-l-lg object-contain"
			/>
			<div class="flex flex-col items-start justify-center truncate p-2.5">
				<p
					:style="{
						color: convertHexToHexColor(member.nameColor.toString()),
					}"
					class="font-semibold light:text-(--ui-text)!"
				>
					{{ member.name }}
				</p>
				<p
					:class="[
						member.role === 'member' && 'text-(--ui-text-toned)',
						member.role === 'president' && 'text-(--ui-primary)',
						member.role === 'vicePresident' && 'text-blue-500 dark:text-blue-400',
						member.role === 'senior' && 'text-green-500 dark:text-green-400',
					]"
					class="mt-px text-sm font-medium"
				>
					{{ camelCaseToNormalCase(member.role, true) }}
				</p>
				<div class="mt-2 flex items-center gap-1">
					<Image src="/icons/player/trophy.webp" width="22" height="22" alt="Trophy" />
					<p class="font-semibold text-amber-500 dark:text-amber-400">
						{{ member.trophies.toLocaleString() }}
					</p>
				</div>
			</div>
		</div>
	</UPageCard>
</template>
