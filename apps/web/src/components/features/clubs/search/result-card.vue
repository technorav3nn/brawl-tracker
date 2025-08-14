<script setup lang="ts">
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";
import type { AllianceSearchAlliance } from "@brawltracker/rnt-api";

defineProps<{
	club: AllianceSearchAlliance;
}>();
</script>

<template>
	<UPageCard
		:ui="{ body: 'p-2! flex flex-row', container: 'p-2! py-1.5! px-2.5! mt-1 flex! flex-row! gap-0!' }"
		:to="`/clubs/${club.id.tag.replace('#', '')}`"
	>
		<NuxtImg
			width="50"
			height="50"
			:src="`${CDN_URL_V2}/brawlify/club-badges/regular/${club.badge}.png`"
			:alt="`${club.name} Badge`"
			class="aspect-square min-h-[50px] min-w-[50px] rounded-l-lg object-scale-down"
		/>
		<div class="flex w-full flex-col items-start justify-between gap-2 p-2.5">
			<div class="flex w-full items-center justify-between gap-2 font-semibold">
				{{ club.name }}
				<span class="flex items-center">
					<UBadge
						v-if="club.isFamilyFriendly"
						icon="i-heroicons-face-smile"
						label="Family Friendly"
						color="info"
						variant="subtle"
					/>
				</span>
			</div>
			<div class="flex w-full flex-row items-center justify-between gap-2 *:text-[0.79rem]">
				<div class="flex items-center gap-2">
					<UBadge color="info" variant="subtle" class="flex items-center gap-1">
						<NuxtImg src="/icons/clubs/members.png" width="16" height="16" class="size-[16px] object-scale-down" />
						{{ club.memberCount.toLocaleString() }}
					</UBadge>
					<UBadge color="primary" variant="subtle" class="flex items-center gap-1">
						<NuxtImg
							src="/icons/player/trophy-flat.png"
							width="16"
							height="16"
							class="size-[16px] object-scale-down object-center"
						/>
						{{ club.trophies.toLocaleString() }}
					</UBadge>
				</div>
				<div>
					<UBadge
						:color="club.type === 'closed' ? 'error' : club.type === 'invite-only' ? 'secondary' : 'success'"
						variant="subtle"
						:icon="
							club.type === 'closed'
								? 'i-heroicons-lock-closed'
								: club.type === 'invite-only'
									? 'i-heroicons-envelope'
									: 'i-heroicons-lock-open'
						"
					>
						{{ club.type === "closed" ? "Closed" : club.type === "invite-only" ? "Invite Only" : "Open" }}
					</UBadge>
				</div>
			</div>
		</div>
	</UPageCard>
</template>
