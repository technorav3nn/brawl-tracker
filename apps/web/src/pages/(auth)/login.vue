<!-- eslint-disable vue/no-static-inline-styles -->
<script setup lang="ts">
/* eslint-disable promise/prefer-await-to-callbacks */
/* eslint-disable promise/prefer-await-to-then */
import type { FetchError } from "ofetch";

definePageMeta({
	middleware: "no-auth",
});

useServerSeoMeta({
	title: "Login",
	description: "Login to your account with Supercell ID",
	applicationName: "BrawlTracker",
});

const validationError = ref<string | null>(null);
const loading = ref(false);

async function login(body: { username: string; password: string }) {
	loading.value = true;
	$fetch("/api/auth/login", {
		method: "POST",
		// eslint-disable-next-line n/prefer-global/url-search-params
		body: new URLSearchParams(body),
	})
		.then(async () => await navigateTo("/"))
		.catch((error) => {
			const { statusMessage } = error as FetchError;
			validationError.value = statusMessage!;
		})
		.finally(() => {
			loading.value = false;
		});
}
</script>

<template>
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
								name: 'email',
								type: 'email',
								label: 'Email',
								placeholder: 'Enter your email',
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
						:loading="loading"
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
