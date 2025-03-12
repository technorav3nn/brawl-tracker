<script setup lang="ts">
import type { Player } from "@brawltracker/brawl-stars-api";
import { getCdnUrlForAvatarId, idToHighLow, tagToId } from "@brawltracker/supercell-id-api/browser";
import { Image } from "@unpic/vue";
import { generate } from "lean-qr";
import { createGetCachedData } from "$lib/utils/nuxt";

const props = defineProps<{
	player: Player;
}>();

const tag = computed(() => props.player.tag);

const nuxtApp = useNuxtApp();
const { data: scidData, status } = useLazyFetch("/api/auth/scid/profile-by-tag", {
	query: { accountHighLowId: idToHighLow(Number(tagToId(tag.value))).join("-") },
	getCachedData: createGetCachedData(nuxtApp),
});

const seasonPassOwned = computed(() => {
	if (!scidData.value) return false;
	return scidData.value.data?.connectedSystems.find((s) => s.system === "laser")?.seasonPassActive;
});
const blockFriendRequests = computed(() => {
	if (!scidData.value) return false;
	return Boolean(scidData.value.data?.blockIncomingFriendRequests);
});

const universalLink = computed(() => {
	if (!scidData.value) return "";
	return `https://link.brawlstars.com/?supercell_id&p=${scidData.value?.data?.scid}`;
});

const canvas = useTemplateRef("qrCodeCanvas");
const colorMode = useColorMode();

watchEffect(() => {
	if (status.value !== "success") return;
	if (!scidData.value) return;
	if (!canvas.value) return;

	const url = universalLink.value;

	const ctx = generate(url);
	ctx.toCanvas(canvas.value, {
		on: colorMode.value === "light" ? [0, 0, 0, 255] : [255, 255, 255, 255],
	});
});
</script>

<template>
	<UDashboardSlideover :ui="{ width: 'max-w-sm!', body: { base: 'overflow-y-auto!', padding: 'p-0' } }">
		<template #title>
			<div v-if="status === 'pending'" class="flex items-center gap-2">
				<USkeleton class="w-10 h-10 rounded-full" />
				<div class="flex flex-col gap-2">
					<USkeleton class="w-20 h-4" />
					<USkeleton class="w-10 h-3" />
				</div>
			</div>
			<div v-else class="flex items-center">
				<Image
					:src="
						(scidData?.data as any).imageURL
							? (scidData?.data as any).imageURL
							: getCdnUrlForAvatarId(scidData?.data?.avatarImage as any)
					"
					width="40"
					height="40"
					class="w-10 h-10 rounded-full"
					loading="eager"
				/>
				<div class="inline-flex flex-col">
					<span class="ml-2 text-xl font-bold">{{ scidData?.data?.name }}</span>
					<div class="ml-2 flex flex-row items-center gap-1.5">
						<UIcon name="local:scid" class="size-[1.15rem]" />
						<span class="text-xs text-gray-500 dark:text-gray-400">{{ scidData?.data?.handle }}</span>
					</div>
				</div>
			</div>
		</template>
		<div v-if="status === 'pending'" class="h-full px-4 py-3 flex flex-col gap-2 items-center">
			<USkeleton class="w-full h-full" />
		</div>
		<div v-else>
			<div class="w-full py-5 px-4 dark:border-gray-800 border-b flex flex-row justify-between items-center">
				<div class="flex gap-1 items-center">
					<Image width="40" height="40" src="/icons/player/brawl-pass-plus.png" loading="eager" />
					<h1 class="text-base font-semibold">Brawl Pass Active</h1>
				</div>
				<UBadge variant="subtle" :color="seasonPassOwned ? 'green' : 'red'">
					{{ seasonPassOwned ? "Active" : "Not Active" }}
				</UBadge>
			</div>
			<div class="w-full py-5 px-4 gap-2 dark:border-gray-800 border-b flex flex-row justify-between items-center">
				<div class="flex gap-2 items-center">
					<Image width="30" height="30" src="/icons/player/friends.png" loading="eager" />
					<h1 class="text-base font-semibold">Block Friend Requests</h1>
				</div>
				<UBadge variant="subtle" :color="blockFriendRequests ? 'red' : 'green'">
					{{ blockFriendRequests ? "Enabled" : "Disabled" }}
				</UBadge>
			</div>
			<div class="w-full py-5 px-4 gap-2 dark:border-gray-800 border-b flex flex-col justify-between items-center">
				<div class="flex flex-col items-center justify-center text-center">
					<h1 class="text-base font-semibold">Add Friend</h1>
					<p class="text-gray-500 dark:text-gray-400 text-sm">Scan the QR code to add this player as a friend in Brawl Stars.</p>
				</div>
				<canvas ref="qrCodeCanvas" class="-mt-6" style="image-rendering: pixelated; width: 90%" />
				<UButton
					:to="universalLink"
					target="_blank"
					rel="noopener noreferrer"
					block
					icon="i-heroicons-arrow-top-right-on-square"
					class="-mt-4"
				>
					Add Friend In Brawl Stars
				</UButton>
			</div>
		</div>
	</UDashboardSlideover>
</template>
