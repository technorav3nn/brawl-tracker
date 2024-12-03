<script setup lang="ts">
import { type Friend, getCdnUrlForAvatarId } from "@brawltracker/supercell-id-api";

const props = defineProps<{
	friend: Friend;
}>();
const { friend } = toRefs(props);
</script>

<template>
	<div class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
		<div class="flex items-center gap-2">
			<NuxtImg
				:src="(friend as any).imageURL ? (friend as any).imageURL : getCdnUrlForAvatarId(friend.avatarImage)"
				width="40"
				height="40"
				class="w-10 h-10 rounded-full self-center bg-contain object-cover aspect-1"
				loading="lazy"
			/>
			<div class="flex flex-col">
				<span class="text-lg font-semibold">{{ friend.name }}</span>
				<span class="text-sm text-gray-500 dark:text-gray-400 flex flex-row items-center gap-1.5">
					<NuxtImg
						:src="$colorMode.value === 'light' ? '/icons/scid/supercell-id-big.svg' : '/icons/scid/supercell-id-white.svg'"
						alt="Supercell ID"
						width="24"
						height="24"
						class="inline-block object-scale-down w-[1.3em] h-[1.3em] [mask-size:100%_100%] !text-[revert]"
						loading="lazy"
					/>
					{{ friend.handle }}
				</span>
			</div>
		</div>
		<UBadge variant="subtle" :color="friend.presence ? 'green' : 'red'">{{ friend.presence ? `Online` : "Offline" }}</UBadge>
	</div>
</template>
