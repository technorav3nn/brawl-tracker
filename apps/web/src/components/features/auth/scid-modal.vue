<script setup lang="ts">
import type { FetchError } from "ofetch";

defineProps<{ open: boolean }>();
const $emit = defineEmits(["update:open"]);

const stageOne = ref(true);
const stageTwo = ref(false);

const email = ref("");
const progress = computed(() => (stageOne.value ? 1 : stageTwo.value ? 2 : 1));

const validationError = ref<string | null>(null);

async function submitStageOne({ email: em }: { email: string }) {
	email.value = em;
	try {
		await sendCode();
		stageOne.value = false;
		stageTwo.value = true;
		validationError.value = null;
	} catch (error) {
		console.error("Failed to send code");
		console.error(error);
	}
}

async function submitStageTwo({ code: c }: { code: string }) {
	const code = String(c).replaceAll(/\s/g, "");

	const response = await $fetch(`/api/auth/scid/validate-login-code`, {
		method: "POST",
		query: { email: email.value, code: String(code) },
	}).catch((error) => {
		const { statusMessage } = error as FetchError;
		validationError.value = statusMessage!;
	});
	if (response) {
		$emit("update:open", false);
		refreshNuxtData("user");
		await navigateTo("/");
	}
}

async function sendCode() {
	const response = await $fetch(`/api/auth/scid/create-login-code`, {
		method: "POST",
		query: { email: email.value },
	}).catch((error) => {
		const { statusMessage } = error as FetchError;
		validationError.value = statusMessage!;
	});
	if (response) {
		validationError.value = null;
	}
}
</script>

<template>
	<UModal :modelValue="open" @update:model-value="$emit('update:open', $event)">
		<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						<NuxtImg
							src="/icons/scid/supercell-id-big.svg"
							alt="Supercell ID"
							width="24"
							height="24"
							class="inline-block object-scale-down mr-1 w-[2em] h-[2em] [mask-size:100%_100%] !text-[revert]"
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

			<div v-show="stageOne">
				<UAuthForm
					class="!max-w-none"
					title="Supercell ID Login"
					description="Login with your Supercell ID to access your account."
					:fields="[
						{
							type: 'email',
							label: 'Supercell ID Email',
							placeholder: 'Enter your email linked to Supercell ID',
							// @ts-expect-error - Bug
							color: 'gray',
							required: true,
							id: 'email',
							name: 'email',
						},
					]"
					@submit="submitStageOne"
				>
					<template v-if="!!validationError" #validation>
						<UAlert color="red" icon="i-heroicons-information-circle-20-solid" :title="validationError" />
					</template>
				</UAuthForm>
			</div>

			<div v-show="stageTwo">
				<UAuthForm
					class="!max-w-none"
					title="Supercell ID Login Code"
					description="Enter the code sent to your email to login."
					:fields="[
						{
							type: 'text',
							label: 'Code',
							name: 'code',
							placeholder: 'XXXXXX',
							// @ts-expect-error - Bug
							color: 'gray',
							// Pattern that only allows 6 digits, but a space in between
							pattern: '^(\\d\\s*){6}$',
							// inputmode: 'numeric',
							// Max length is 7 so people can copy and paste from email
							minlength: 6,
							title: '6-digit code',
							required: true,
						},
					]"
					@submit="submitStageTwo"
				>
					<template #footer>
						<div class="-mt-1">
							<p class="text-primary-500 dark:text-primary-400 text-sm font-medium mb-1">Didn't receive the code?</p>
							<UButton block color="gray" @click="sendCode">Resend Code</UButton>
						</div>
					</template>
					<template v-if="!!validationError" #validation>
						<UAlert color="red" icon="i-heroicons-information-circle-20-solid" :title="validationError" />
					</template>
				</UAuthForm>
			</div>

			<UDivider class="mt-4" size="xs" />
			<UProgress
				class="mt-3"
				:value="progress"
				:max="['empty step', 'Step 1: Enter your email', 'Step 2: Enter the code from your inbox', 'empty step']"
				:ui="{ step: { align: 'text-start' } }"
			/>
		</UCard>
	</UModal>
</template>
