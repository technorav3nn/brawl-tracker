<script setup lang="ts">
import { getCdnUrlForAvatarId, idToHighLow, tagToId } from "@brawltracker/supercell-id-api/browser";
import { Image } from "@unpic/vue";
import { generate } from "lean-qr";
import { createGetCachedData } from "$lib/utils/nuxt";

const props = defineProps<{
	playerTag: string;
}>();

const tag = computed(() => props.playerTag);

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
	<USlideover :ui="{ content: 'max-w-sm!', body: 'overflow-y-auto! p-0!', header: 'py-2.5 px-4!' }">
		<template #title>
			<div v-if="status === 'pending'" class="flex items-center gap-2">
				<USkeleton class="h-10 w-10 rounded-full" />
				<div class="flex flex-col gap-2">
					<USkeleton class="h-4 w-20" />
					<USkeleton class="h-3 w-10" />
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
					class="h-10 w-10 rounded-full"
					loading="eager"
				/>
				<div class="inline-flex flex-col">
					<span class="ml-2 text-xl font-bold">{{ scidData?.data?.name }}</span>
					<div class="ml-2 flex flex-row items-center gap-1.5">
						<UIcon name="local:scid" class="size-[1.15rem]" />
						<span class="text-xs text-neutral-500 dark:text-neutral-400">{{ scidData?.data?.handle }}</span>
					</div>
				</div>
			</div>
		</template>
		<template #body>
			<div v-if="status === 'pending'" class="flex h-full flex-col items-center gap-2 px-4 py-3">
				<USkeleton class="h-full w-full" />
			</div>
			<div v-else>
				<div class="flex w-full flex-row items-center justify-between border-b px-4 py-5 dark:border-neutral-800">
					<div class="flex items-center gap-1">
						<Image width="40" height="40" src="/icons/player/brawl-pass-plus.png" loading="eager" />
						<h1 class="text-base font-semibold">Brawl Pass Active</h1>
					</div>
					<UBadge variant="subtle" :color="seasonPassOwned ? 'success' : 'error'">
						{{ seasonPassOwned ? "Active" : "Not Active" }}
					</UBadge>
				</div>
				<div class="flex w-full flex-row items-center justify-between gap-2 border-b px-4 py-5 dark:border-neutral-800">
					<div class="flex items-center gap-2">
						<Image width="30" height="30" src="/icons/player/friends.png" loading="eager" />
						<h1 class="text-base font-semibold">Block Friend Requests</h1>
					</div>
					<UBadge variant="subtle" :color="blockFriendRequests ? 'error' : 'success'">
						{{ blockFriendRequests ? "Enabled" : "Disabled" }}
					</UBadge>
				</div>
				<div class="flex w-full flex-col items-center justify-between gap-2 border-b px-4 py-5 dark:border-neutral-800">
					<div class="flex flex-col items-center justify-center text-center">
						<h1 class="text-base font-semibold">Add Friend</h1>
						<p class="text-sm text-neutral-500 dark:text-neutral-400">
							Scan the QR code to add this player as a friend in Brawl Stars.
						</p>
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
		</template>
	</USlideover>
</template>
