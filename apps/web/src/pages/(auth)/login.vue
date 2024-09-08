<!-- eslint-disable vue/no-static-inline-styles -->
<script setup lang="ts">
/* eslint-disable promise/prefer-await-to-callbacks */
/* eslint-disable promise/prefer-await-to-then */
import type { FetchError } from "ofetch";
import { objectToFormData } from "$lib/utils/common";

const validationError = ref<string | null>(null);
const scidModalOpen = ref(false);

async function login(body: { username: string; password: string }) {
	$fetch("/api/auth/login", {
		method: "POST",
		body: objectToFormData(body),
	})
		.then(async () => await navigateTo("/"))
		.catch((error) => {
			const { statusMessage } = error as FetchError;
			validationError.value = statusMessage!;
		});
}

async function supercellIdLogin() {
	scidModalOpen.value = true;
	$fetch("/api/auth/scid/create-login-code", {
		method: "POST",
	}).catch((error) => {
		const { statusMessage } = error as FetchError;
		validationError.value = statusMessage!;
	});
}
</script>

<template>
	<AuthScidModal :open="scidModalOpen" @update:open="scidModalOpen = $event" />
	<UPage>
		<UPageBody class="flex justify-center items-center mt-14">
			<div :style="{ '--svg-url': 'url(\'/icons/scid/supercell-id.svg\')' }">
				<UCard class="max-w-sm w-full">
					<template #header>
						<h1 class="text-lg font-semibold">Welcome Back!</h1>
					</template>
					<UAuthForm
						title="Login"
						description="Enter your information to access your account."
						align="bottom"
						icon="i-heroicons-user-circle"
						:fields="[
							{
								name: 'username',
								type: 'username',
								label: 'Username',
								placeholder: 'Enter your username',
								// @ts-expect-error - Bug
								color: 'gray',
							},
							{
								name: 'password',
								type: 'password',
								label: 'Password',
								placeholder: 'Enter your password',
								// @ts-expect-error - Bug
								color: 'gray',
							},
						]"
						:providers="[
							{
								label: 'Supercell ID',
								// @ts-expect-error - Bug
								ui: {
									icon: {
										base: 'mr-0.5 inline-block w-[2em] h-[2em] [background-image:var(--svg-url)] [mask-size:100%_100%] !text-[revert]',
									},
								},
								// This is so scuffed LOL
								icon: 's',
								color: 'gray',
								click: supercellIdLogin.bind(null),
							},
						]"
						:loading="false"
						@submit="login"
					>
						<template v-if="validationError" #validation>
							<UAlert color="red" icon="i-heroicons-information-circle-20-solid" :title="validationError" />
						</template>
					</UAuthForm>
				</UCard>
			</div>
		</UPageBody>
	</UPage>
</template>
