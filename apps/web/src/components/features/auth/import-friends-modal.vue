<script setup lang="ts">
const modal = useModal();
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
	<UModal>
		<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', footer: { padding: 'px-0 py-3.5' } }">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						<NuxtImg
							:src="$colorMode.value === 'light' ? '/icons/scid/supercell-id-big.svg' : '/icons/scid/supercell-id-white.svg'"
							alt="Supercell ID"
							width="24"
							height="24"
							class="inline-block object-scale-down mr-1 w-[2em] h-[2em] [mask-size:100%_100%] !text-[revert]"
						/>
						Import Supercell Friends
					</h3>
					<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="modal.close()" />
				</div>
			</template>
			<div class="flex justify-center items-center flex-col">
				<p class="text-md font-medium text-center">
					Lets get started. Scan the QR code or add the tag below to your friends list in Supercell ID.
				</p>
				<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">When finished, click the "Continue" button below to continue.</p>
				<NuxtImg src="/scid/qr-code.png" alt="Supercell ID QR Code" width="150" height="150" class="mt-4" />
				<UDivider class="mt-4 w-full">or</UDivider>
				<NuxtLink
					external
					target="_blank"
					rel="noopener noreferrer"
					to="https://link.brawlstars.com/?supercell_id&p=85-0e066b52-b348-4256-b6c1-4f12a18f54d9"
				>
					<UButton icon="i-heroicons-link-20-solid" class="mt-4">Open In Brawl Stars</UButton>
				</NuxtLink>
				<UDivider class="mt-4 w-full">or</UDivider>
				<p class="mt-2 prose prose-primary dark:prose-invert max-w-none">Add <code>BrawlTrackDev</code> to your friends list</p>
			</div>

			<template #footer>
				<div class="flex items-center justify-center flex-col px-2">
					<UButton :loading color="primary" class="w-min" trailingIcon="i-heroicons-arrow-right" @click="importFriends"
						>Continue</UButton
					>
					<UAlert
						v-if="error"
						variant="subtle"
						color="red"
						icon="i-heroicons-information-circle-20-solid"
						:title="error"
						class="mt-4 py-2.5"
					>
						{{ error }}
					</UAlert>
				</div>
			</template>
		</UCard>
	</UModal>
</template>
