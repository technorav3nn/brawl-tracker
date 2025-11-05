<script setup lang="ts">
const $emit = defineEmits<{ close: [boolean] }>();

const tag = ref<string>("");

const stageOne = ref(true);
const stageTwo = ref(false);

const progress = computed(() => (stageOne.value ? 1 : stageTwo.value ? 2 : 1));

const {
	data: player,
	status,
	error,
	execute,
} = useFetch(`/api/players`, {
	immediate: false,
	watch: false,
	params: { tag },
});

const brawlers = computed(() => player.value?.brawlers);
const { data: icons } = await useFetch("/api/brawlers/icons");

const randomIcon = computed(() => {
	if (!brawlers.value || !icons.value) return;
	const randomBrawler = brawlers.value[Math.floor(Math.random() * brawlers.value.length)];
	return icons.value.find((icon) => icon.brawler === randomBrawler?.id);
});
const originalIcon = computed(() =>
	player ? `https://cdn.brawlify.com/profile-icons/regular/${player.value?.icon.id}.png` : null
);

const errorMessage = ref<string | null>(null);

const verifyLoading = ref(false);
async function verify() {
	verifyLoading.value = true;
	errorMessage.value = null;
	const result = await $fetch("/api/scid/connect", {
		method: "POST",
		body: { originalIcon: player.value?.icon.id.toString(), tag: tag.value, iconToCheck: randomIcon.value?.id.toString() },
		onResponseError: ({ error }) => {
			errorMessage.value =
				error?.message ??
				"Failed to verify, please try again. You may have to wait a minute to verify, as the server takes time to update.";
			verifyLoading.value = false;
		},
	});
	verifyLoading.value = false;
	if (result) {
		$emit("close", true);

		await navigateTo("/");
		reloadNuxtApp();
	} else {
		errorMessage.value = "Failed to verify, please try again";
	}
}

async function nextStage() {
	await execute();
	if (status.value === "error") return;
	stageOne.value = false;
	stageTwo.value = true;
}
</script>

<template>
	<UModal>
		<template #content>
			<UCard :ui="{ header: 'divide-y divide-neutral-100 dark:divide-neutral-800' }">
				<template #header>
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2 text-base leading-6 font-semibold text-neutral-900 dark:text-white">
							<NuxtImg
								:src="$colorMode.value === 'light' ? '/icons/scid/supercell-id-big.svg' : '/icons/scid/supercell-id-white.svg'"
								alt="Supercell ID"
								width="24"
								height="24"
								class="mr-1 inline-block h-[2em] w-[2em] [mask-size:100%_100%] object-scale-down text-[revert]!"
							/>
							Connect Supercell ID
						</div>
						<UButton
							color="neutral"
							variant="ghost"
							icon="i-heroicons-x-mark-20-solid"
							class="-my-1"
							@click="$emit('close', true)"
						/>
					</div>
				</template>

				<div v-if="stageOne">
					<p class="text-md font-medium">To verify, you need to change your profile picture into something else</p>
					<p class="mb-2 text-sm text-neutral-500 dark:text-neutral-400">The profile picture will be a brawler you own.</p>

					<label class="text-sm font-medium text-neutral-500 dark:text-neutral-400">Enter your player tag</label>
					<UInput v-model="tag" label="playerTag" placeholder="Your tag..." class="w-full!" />
					<UButton block class="mt-2" :loading="status === 'pending'" @click="async () => await nextStage()">Next</UButton>
					<UAlert
						v-if="status === 'error'"
						color="error"
						class="mt-4"
						icon="i-heroicons-information-circle-20-solid"
						:title="error?.data.statusMessage"
					/>
				</div>

				<div v-if="stageTwo && status !== 'error' && status === 'success'">
					<div class="flex flex-row items-center justify-between">
						<NuxtImg width="100" height="100" :src="originalIcon!"/>
						<UIcon name="i-heroicons-arrow-right-20-solid" class="size-20 text-neutral-500 dark:text-neutral-400" />
						<NuxtImg width="100" height="100" :src="randomIcon?.imageUrl2"/>
					</div>
					<p class="text-md mt-2 text-center font-medium">Change your profile picture to the brawler on the right</p>
					<p class="mb-2 text-center text-sm text-neutral-500 dark:text-neutral-400">You can change it back after verifying</p>
					<UButton block class="mt-2" :loading="verifyLoading" @click="verify">Verify</UButton>
					<UAlert
						v-if="!!errorMessage"
						color="warning"
						class="mt-4"
						icon="i-heroicons-exclamation-triangle"
						:title="errorMessage"
						variant="subtle"
					/>
				</div>

				<USeparator class="mt-4" size="xs" />
				<UProgress
					class="mt-3"
					:model-value="progress"
					:max="['empty step', 'Step 1: Enter your tag', 'Step 2: Verify with changing your profile picture', 'empty step']"
					:ui="{ step: 'first' }"
				/>
			</UCard>
		</template>
	</UModal>
</template>
