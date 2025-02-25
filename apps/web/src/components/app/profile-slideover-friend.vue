<script setup lang="ts">
import type { JSONSavedPlayer } from "$server/db/users/types";

const props = defineProps<{
	friend: JSONSavedPlayer;
}>();
const { friend } = toRefs(props);
</script>

<template>
	<div class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
		<div class="flex items-center gap-2">
			<NuxtImg
				v-if="friend.isScid"
				:src="friend.scidData!.avatar"
				width="40"
				height="40"
				class="w-10 h-10 rounded-full self-center bg-contain object-cover aspect-1"
				loading="lazy"
			/>
			<UAvatar v-else :alt="friend.name" class="w-10 h-10" />
			<div class="flex flex-col">
				<span class="text-lg font-semibold">{{ friend.name }}</span>
				<span class="text-sm text-gray-500 dark:text-gray-400 flex flex-row items-center gap-1.5">
					<NuxtImg
						v-if="friend.isScid"
						:src="$colorMode.value === 'light' ? '/icons/scid/supercell-id-big.svg' : '/icons/scid/supercell-id-white.svg'"
						alt="Supercell ID"
						width="24"
						height="24"
						class="inline-block object-scale-down w-[1.3em] h-[1.3em] [mask-size:100%_100%] !text-[revert]"
						loading="lazy"
					/>
					<UIcon v-else name="i-heroicons-user-circle-20-solid" class="w-[1.3em] h-[1.3em]" />
					{{ friend.isScid ? friend.scidData!.handle || friend.scidData!.name : "Saved Tag" }}
				</span>
			</div>
		</div>
	</div>
</template>
