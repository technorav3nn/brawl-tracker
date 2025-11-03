<script setup lang="ts">
const emit = defineEmits<{ close: [boolean] }>();

const error = ref<string | null>(null);
const loading = ref(false);
const toast = useToast();

async function importFriends() {
	error.value = null;
	loading.value = true;
	await $fetch("/api/friends/import", {
		method: "POST",
		onResponseError: (context) => {
			const message = context.response._data.message;
			error.value = message;
			loading.value = false;
		},
	});
	loading.value = false;
	toast.add({
		title: "Friends Imported",
		description: "Your friends have been imported successfully.",
	});
}
</script>

<template>
	<UModal title="Import Supercell ID Friends" description="Import your Supercell ID Friends">
		<template #content>
			<UCard :ui="{ header: 'divide-y divide-neutral-100 dark:divide-neutral-800', footer: 'px-0 py-3.5' }">
				<template #header>
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2 text-base leading-6 font-semibold text-neutral-900 dark:text-white">
							<NuxtImg
								:src="$colorMode.value === 'light' ? '/icons/scid/supercell-id-big.svg' : '/icons/scid/supercell-id-white.svg'"
								alt="Supercell ID"
								width="24"
								height="24"
								class="mr-1 inline-block h-[2em] w-[2em] mask-size-[100%_100%] object-scale-down text-[revert]!"
							/>
							Import Supercell Friends
						</div>
						<UButton
							color="neutral"
							variant="ghost"
							icon="i-heroicons-x-mark-20-solid"
							class="-my-1"
							@click="emit('close', true)"
						/>
					</div>
				</template>
				<div class="flex flex-col items-center justify-center">
					<p class="text-md text-center font-medium">
						Scan the QR code or add the tag below to your friends list in Supercell ID.
					</p>
					<p class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
						When finished, click the "Continue" button below to continue.
					</p>
					<NuxtImg src="/scid/qr-code.png" alt="Supercell ID QR Code" width="150" height="150" class="mt-4" />
					<USeparator class="mt-4 w-full">or</USeparator>
					<NuxtLink
						external
						target="_blank"
						rel="noopener noreferrer"
						to="https://link.brawlstars.com/?supercell_id&p=85-0e066b52-b348-4256-b6c1-4f12a18f54d9"
					>
						<UButton size="sm" icon="i-heroicons-link-20-solid" class="mt-4">Open In Brawl Stars</UButton>
					</NuxtLink>
					<USeparator class="mt-4 w-full">or</USeparator>
					<p class="mt-2">
						Add <span class="font-semibold underline underline-offset-4">BrawlTrackDev</span> to your friends list
					</p>
				</div>

				<template #footer>
					<div class="flex flex-col items-center justify-center px-2">
						<UButton :loading color="primary" class="w-min" trailingIcon="i-heroicons-arrow-right" @click="importFriends"
							>Continue</UButton
						>
						<UAlert
							v-if="error"
							variant="subtle"
							color="error"
							icon="i-heroicons-information-circle-20-solid"
							:title="error"
							class="mt-4 py-2.5"
						>
							{{ error }}
						</UAlert>
					</div>
				</template>
			</UCard>
		</template>
	</UModal>
</template>
