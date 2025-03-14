<!-- eslint-disable vue/no-static-inline-styles -->
<script setup lang="ts">
/* eslint-disable promise/prefer-await-to-callbacks */
/* eslint-disable promise/prefer-await-to-then */
import type { FormSubmitEvent } from "@nuxt/ui";
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
const token = ref<string>();

async function login(event: FormSubmitEvent<{ username: string; password: string }>) {
	if (!token.value) return (validationError.value = "Please complete the captcha.");
	loading.value = true;
	// eslint-disable-next-line n/prefer-global/url-search-params
	const body = new URLSearchParams({ ...event.data, token: token.value });
	$fetch("/api/auth/login", {
		method: "POST",
		body,
	})
		.then(async () => {
			await navigateTo("/");
			reloadNuxtApp();
		})
		.catch((error) => {
			const { message } = error as FetchError;
			validationError.value = message!;
		})
		.finally(() => {
			loading.value = false;
		});
}
</script>

<template>
	<UPage>
		<UPageBody class="flex justify-center items-center mt-14">
			<UCard class="max-w-sm w-full">
				<UAuthForm
					title="Login"
					description="Enter your information to access your account."
					align="bottom"
					class="max-w-sm!"
					icon="i-heroicons-user-circle"
					:fields="[
						{
							name: 'email',
							type: 'text',
							label: 'Email',
							placeholder: 'Enter your email',
							color: 'gray',
							required: true,
						},
						{
							name: 'password',
							type: 'password',
							label: 'Password',
							placeholder: 'Enter your password',
							color: 'gray',
							required: true,
						},
					]"
					:loading="loading"
					@submit="login($event as FormSubmitEvent<{ username: string; password: string }>)"
				>
					<template #description>
						Don't have an account? <NuxtLink to="/signup" class="text-(--ui-primary) font-medium">Sign up</NuxtLink>.
					</template>
					<template v-if="validationError" #validation>
						<NuxtTurnstile v-model="token" :options="{ theme: $colorMode.value as any, size: 'flexible' }" />
						<UAlert color="error" variant="subtle" icon="i-heroicons-information-circle-20-solid" :title="validationError" />
					</template>
				</UAuthForm>
			</UCard>
		</UPageBody>
	</UPage>
</template>
