<script setup lang="ts">
import { Image } from "@unpic/vue";
import type { SavedPlayer } from "$server/database/schema";

const props = defineProps<{
	friend?: SavedPlayer;
}>();
const { friend } = toRefs(props);
</script>

<template>
	<div class="flex items-center justify-between border-b border-neutral-200 py-3 dark:border-neutral-800">
		<div class="flex items-center gap-2">
			<Image
				v-if="friend?.scidInfo"
				:src="friend?.scidInfo?.avatar"
				width="40"
				height="40"
				class="aspect-1 h-10 w-10 self-center rounded-full bg-contain object-cover"
				loading="lazy"
			/>
			<USkeleton v-else-if="!friend" class="h-10 w-10 rounded-full" />
			<UAvatar v-else :alt="friend.name" class="h-10 w-10" />
			<div class="flex flex-col">
				<span v-if="friend" class="text-lg font-semibold">{{ friend?.name }}</span>
				<USkeleton v-else class="h-4 w-24" />
				<span v-if="friend" class="flex flex-row items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
					<Image
						v-if="friend.scidInfo"
						:src="$colorMode.value === 'light' ? '/icons/scid/supercell-id-big.svg' : '/icons/scid/supercell-id-white.svg'"
						alt="Supercell ID"
						width="24"
						height="24"
						class="inline-block h-[1.3em] w-[1.3em] [mask-size:100%_100%] object-scale-down text-[revert]!"
						loading="lazy"
					/>
					<UIcon v-else name="i-heroicons-user-circle-20-solid" class="h-[1.3em] w-[1.3em]" />
					{{ friend.scidInfo ? friend.scidInfo.handle || friend.name : "Saved Tag" }}
				</span>
				<div v-else class="mt-2 flex items-center gap-1">
					<USkeleton class="h-4 w-[18.2px]" />
					<USkeleton class="h-4 w-36" />
				</div>
			</div>
		</div>
	</div>
</template>
