<script setup lang="ts">
/* eslint-disable promise/prefer-await-to-callbacks */
/* eslint-disable promise/prefer-await-to-then */
import type { FetchError } from "ofetch";
import { objectToFormData } from "$lib/utils/common";

const validationError = ref<string | null>(null);

async function login(body: { username: string; password: string }) {
	$fetch("/api/auth/signup", {
		method: "POST",
		body: objectToFormData(body),
	})
		.then(async () => await navigateTo("/"))
		.catch((error) => {
			const { statusMessage } = error as FetchError;
			validationError.value = statusMessage!;
		});
}
</script>

<template>
	<UPage>
		<UPageBody class="flex justify-center items-center mt-14">
			<UCard class="max-w-sm w-full">
				<template #header>
					<h1 class="text-lg font-semibold">Welcome!</h1>
				</template>
				<UAuthForm
					title="Sign Up"
					description="Enter your information to create an account."
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
					:providers="[{ label: 'Discord', icon: 'i-simple-icons-discord', color: 'gray' }]"
					:loading="false"
					@submit="login"
				>
					<template v-if="validationError" #validation>
						<UAlert color="red" icon="i-heroicons-information-circle-20-solid" :title="validationError" />
					</template>
				</UAuthForm>
			</UCard>
		</UPageBody>
	</UPage>
</template>
