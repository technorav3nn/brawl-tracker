<script setup lang="ts">
import type { ClubMember } from "@brawltracker/brawl-stars-api";
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";
import { Image } from "@unpic/vue";
import { convertHexToHexColor } from "$lib/utils/brawl-stars/colors";
import { camelCaseToNormalCase } from "$lib/utils/common";

defineProps<{
	member: Partial<ClubMember>;
	megaPigWins?: number;
	megaPigTicketsLeft?: number;
}>();
</script>

<template>
	<UPageCard class="w-full" :ui="{ container: 'p-0!' }" :to="`/players/${encodeURIComponent(member.tag!)}`">
		<div class="flex w-full flex-row">
			<NuxtImg
				width="97"
				height="97"
				:src="`${CDN_URL_V2}/brawlify/profile-icons/regular/${member.icon!.id}.png`"
				:alt="member.name"
				class="aspect-square h-[97] w-[97] rounded-l-lg object-contain"
			/>
			<div class="flex w-full flex-col items-start justify-center truncate p-2.5">
				<p
					:style="{
						color: member.nameColor ? convertHexToHexColor(member.nameColor?.toString()) : 'inherit',
					}"
					class="font-semibold light:text-(--ui-text)!"
				>
					{{ member.name }}
				</p>
				<p
					v-if="member.role"
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
				<div class="mt-2 flex w-full items-center gap-1">
					<template v-if="megaPigWins !== undefined">
						<div class="flex w-full flex-row justify-between">
							<div class="flex flex-col gap-px leading-none">
								<p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">Wins</p>
								<div class="flex items-center gap-1">
									<Image src="/icons/clubs/megapig-ticket.png" width="20" height="20" alt="Mega Pig Ticket" />
									<p class="font-semibold text-amber-500 dark:text-amber-400">
										{{ megaPigWins }}
									</p>
								</div>
							</div>
							<div class="flex flex-col items-end gap-px leading-none">
								<p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">Tickets Left</p>
								<div class="flex items-center gap-1">
									<Image src="/icons/clubs/megapig-ticket.png" width="20" height="20" alt="Mega Pig Ticket" />
									<p class="font-semibold text-amber-500 dark:text-amber-400">
										{{ megaPigTicketsLeft }}
									</p>
								</div>
							</div>
						</div>
					</template>
					<template v-else>
						<Image src="/icons/player/trophy.webp" width="22" height="22" alt="Trophy" />
						<p class="font-semibold text-amber-500 dark:text-amber-400">
							{{ member.trophies!.toLocaleString() }}
						</p>
					</template>
				</div>
			</div>
		</div>
	</UPageCard>
</template>
