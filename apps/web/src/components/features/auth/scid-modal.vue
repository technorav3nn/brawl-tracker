<script setup lang="ts">
defineProps<{ open: boolean }>();
const $emit = defineEmits(["update:open"]);

const modal = useModal();

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
	return icons.value.find((icon) => icon.brawler === randomBrawler.id);
});
const originalIcon = computed(() =>
	player ? `https://cdn.brawlify.com/profile-icons/regular/${player.value?.icon.id}.png` : null
);

const errorMessage = ref<string | null>(null);

const verifyLoading = ref(false);
async function verify() {
	verifyLoading.value = true;
	const result = await $fetch("/api/auth/scid/connect", {
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
		$emit("update:open", false);
		modal.close();
		await navigateTo("/");
		refreshNuxtData(["user", "database-user"]);
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
	<UModal :modelValue="open" @update:model-value="$emit('update:open', $event)">
		<UCard :ui="{ ring-3: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						<NuxtImg
							src="/icons/scid/supercell-id-big.svg"
							alt="Supercell ID"
							width="24"
							height="24"
							class="inline-block object-scale-down mr-1 w-[2em] h-[2em] [mask-size:100%_100%] text-[revert]!"
						/>
						Supercell ID
					</h3>
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark-20-solid"
						class="-my-1"
						@click="$emit('update:open', false)"
					/>
				</div>
			</template>

			<div v-if="stageOne">
				<p class="text-md font-medium">To verify, you need to change your profile picture into something else</p>
				<p class="text-sm text-gray-500 dark:text-gray-400 mb-2">The profile picture will be a brawler you own.</p>

				<label class="text-sm font-medium text-gray-500 dark:text-gray-400">Enter your player tag</label>
				<UInput v-model="tag" label="playerTag" placeholder="Your tag..." class="w-full!" />
				<UButton block class="mt-2" :loading="status === 'pending'" @click="async () => await nextStage()">Next</UButton>
				<UAlert
					v-if="status === 'error'"
					color="red"
					class="mt-4"
					icon="i-heroicons-information-circle-20-solid"
					:title="error?.data.statusMessage"
				/>
			</div>

			<div v-if="stageTwo && status !== 'error' && status === 'success'">
				<div class="flex flex-row justify-between items-center">
					<NuxtImg width="100" height="100" :src="originalIcon!"></NuxtImg>
					<UIcon name="i-heroicons-arrow-right-20-solid" class="text-gray-500 dark:text-gray-400 size-20" />
					<NuxtImg width="100" height="100" :src="randomIcon?.imageUrl2"></NuxtImg>
				</div>
				<p class="text-md font-medium mt-2 text-center">Change your profile picture to the brawler on the right</p>
				<p class="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">You can change it back after verifying</p>
				<UButton block class="mt-2" :loading="verifyLoading" @click="verify">Verify</UButton>
				<UAlert
					v-if="!!errorMessage"
					color="red"
					class="mt-4"
					icon="i-heroicons-information-circle-20-solid"
					:title="errorMessage"
				/>
			</div>

			<USeparator class="mt-4" size="xs" />
			<UProgress
				class="mt-3"
				:value="progress"
				:max="['empty step', 'Step 1: Enter your email', 'Step 2: Enter the code from your inbox', 'empty step']"
				:ui="{ step: { align: 'text-start' } }"
			/>
		</UCard>
	</UModal>
</template>
