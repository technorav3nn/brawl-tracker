<script setup lang="ts">
import { Image } from "@unpic/vue";
import type { JSONSavedPlayer } from "$server/db/users/types";

const props = defineProps<{
	friend: JSONSavedPlayer;
}>();
const { friend } = toRefs(props);
</script>

<template>
	<div class="flex items-center justify-between border-b border-neutral-200 py-3 dark:border-neutral-800">
		<div class="flex items-center gap-2">
			<Image
				v-if="friend.isScid"
				:src="friend.scidData!.avatar"
				width="40"
				height="40"
				class="aspect-1 h-10 w-10 self-center rounded-full bg-contain object-cover"
				loading="lazy"
			/>
			<UAvatar v-else :alt="friend.name" class="h-10 w-10" />
			<div class="flex flex-col">
				<span class="text-lg font-semibold">{{ friend.name }}</span>
				<span class="flex flex-row items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
					<Image
						v-if="friend.isScid"
						:src="$colorMode.value === 'light' ? '/icons/scid/supercell-id-big.svg' : '/icons/scid/supercell-id-white.svg'"
						alt="Supercell ID"
						width="24"
						height="24"
						class="inline-block h-[1.3em] w-[1.3em] object-scale-down text-[revert]! [mask-size:100%_100%]"
						loading="lazy"
					/>
					<UIcon v-else name="i-heroicons-user-circle-20-solid" class="h-[1.3em] w-[1.3em]" />
					{{ friend.isScid ? friend.scidData!.handle || friend.scidData!.name : "Saved Tag" }}
				</span>
			</div>
		</div>
	</div>
</template>
