<script setup lang="ts">
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";
import type { GuideWithUser } from "$server/database/schema";

defineProps<{
	guide: GuideWithUser;
	brawlerId: string;
}>();
</script>

<template>
	<UPageCard
		class="h-[100px]"
		:ui="{ body: 'p-0! flex flex-row', container: 'p-0! flex! flex-row! gap-0!' }"
		:to="`/brawlers/${brawlerId}/guides/${encodeURIComponent(guide.id)}`"
	>
		<NuxtImg
			width="100"
			height="100"
			:src="`${CDN_URL_V2}/brawlify/brawlers/portraits/${brawlerId}.png`"
			:alt="brawlerId"
			class="aspect-square min-h-[100px] min-w-[100px] rounded-l-lg object-cover"
		/>
		<div class="flex w-full flex-col items-start justify-between gap-1 p-2.5">
			<div class="flex items-center gap-2 font-semibold">
				{{ guide.name }}
				<span class="flex items-center">
					<UBadge v-if="guide.isInDepth" label="In Depth" color="success" variant="subtle" />
				</span>
			</div>

			<div class="flex w-full items-center gap-1">
				<p class="line-clamp-1 text-sm">
					{{ guide.shortDescription }}
				</p>
			</div>
			<NuxtLink :to="`/users/${guide.user.id}`" class="group z-40 flex items-center gap-1.5 transition-all">
				<NuxtImg
					v-if="guide.user.image"
					:src="guide.user.image"
					width="25"
					height="25"
					class="size-6 rounded-full"
					loading="eager"
				/>
				<UAvatar v-else size="xs" class="transition-colors group-hover:bg-accented/50" :alt="guide.user?.name" />
				<p class="text-xs text-muted transition-colors group-hover:text-default">{{ guide.user.name }}</p>
			</NuxtLink>
		</div>
	</UPageCard>
</template>
