<script setup lang="ts">
const validationError = ref<string | null>(null);
const loading = ref(false);

const token = ref<string>();

async function onSubmit({ username, password, email }: { username: string; password: string; email: string }) {
	if (!token.value) return (validationError.value = "Please complete the captcha.");
	// eslint-disable-next-line n/prefer-global/url-search-params
	const body = new URLSearchParams({ username, password, email, token: token.value });
	try {
		loading.value = true;
		await $fetch("/api/auth/signup", { method: "POST", body });
		loading.value = false;
		await navigateTo("/");
		reloadNuxtApp();
	} catch (error) {
		validationError.value = (error as any).message;
		loading.value = false;
	}
}

const colorMode = useColorMode();
const mode = computed(() => colorMode.value);
</script>

<template>
	<UPage>
		<UPageBody class="flex justify-center items-center mt-14">
			<UCard class="max-w-sm w-full">
				<UAuthForm
					title="Sign Up"
					class="!max-w-sm"
					description="Enter your information to create an account."
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
							required: true,
						},
						{
							name: 'username',
							type: 'username',
							label: 'Username',
							placeholder: 'Enter your username',
							// @ts-expect-error - Bug
							color: 'gray',
							required: true,
						},
						{
							name: 'password',
							type: 'password',
							label: 'Password',
							placeholder: 'Enter your password',
							// @ts-expect-error - Bug
							color: 'gray',
							required: true,
						},
					]"
					:loading="loading"
					@submit="onSubmit"
				>
					<template #description>
						Already have an account? <NuxtLink to="/login" class="text-primary font-medium">Log In</NuxtLink>.
					</template>
					<template #validation>
						<NuxtTurnstile v-model="token" :options="{ theme: mode as any, size: 'flexible' }" />
						<UAlert
							v-if="validationError"
							color="red"
							variant="subtle"
							icon="i-heroicons-information-circle-20-solid"
							:title="validationError"
						/>
					</template>
				</UAuthForm>
			</UCard>
		</UPageBody>
	</UPage>
</template>
