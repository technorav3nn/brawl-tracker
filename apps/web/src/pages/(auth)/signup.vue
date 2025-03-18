<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

definePageMeta({
	middleware: "no-auth",
});

const validationError = ref<string | null>(null);
const loading = ref(false);

const token = ref<string>();

async function onSubmit({ username, password, email }: { username: string; password: string; email: string }) {
	if (!username || !password || !email) return (validationError.value = "Please fill in all the fields.");
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

const links: ButtonProps[] = [
	{
		label: "Have an Account?",
		to: "/login",
		trailingIcon: "i-heroicons-arrow-right",
		class: "hidden sm:flex",
	},
	{
		label: "Login",
		to: "/login",
		trailingIcon: "i-heroicons-arrow-right",
		class: "sm:hidden",
	},
	{
		label: "Forgot password?",
		to: "/forgot-password",
		variant: "subtle",
		color: "neutral",
		icon: "i-heroicons-question-mark-circle",
	},
];

const colorMode = useColorMode();
const mode = computed(() => colorMode.value);
</script>

<template>
	<UPage>
		<UPageCTA
			title="View Supercell ID friends and your info with an account!"
			description="Sign up to view your friends and your info with a Supercell ID account. It's free and easy to create an account!"
			orientation="horizontal"
			variant="naked"
			:ui="{
				container: 'px-4 sm:px-4 sm:py-12 justify-center items-center sm:gap-0 gap-10! md:flex-row',
				title: 'sm:text-3xl md:text-4xl lg:text-5xl',
			}"
			:links="links"
		>
			<div class="flex w-full items-center justify-center">
				<UCard class="w-full" variant="outline">
					<UAuthForm
						:ui="{ title: 'text-start' }"
						:submit="{ label: 'Sign Up', loading, icon: 'i-heroicons-arrow-right-end-on-rectangle-20-solid' }"
						:fields="[
							{
								name: 'email',
								type: 'text',
								label: 'Email',
								placeholder: 'Enter your email',
								required: true,
							},
							{
								name: 'username',
								type: 'text',
								label: 'Username',
								placeholder: 'Enter your username',
								required: true,
							},
							{
								name: 'password',
								type: 'password',
								label: 'Password',
								placeholder: 'Enter your password',
								required: true,
							},
						]"
						:loading="loading"
						@submit="void onSubmit($event as any)"
					>
						<template #title>
							<div class="flex items-center gap-2">
								<UIcon name="i-heroicons-user-circle" class="size-8" />

								<h1 class="text-xl font-bold">Sign Up</h1>
							</div>
						</template>
						<template #validation>
							<div class="h-[65px]">
								<NuxtTurnstile v-model="token" :options="{ theme: mode as any, size: 'flexible' }" />
							</div>
							<UAlert
								v-if="validationError"
								color="error"
								variant="subtle"
								icon="i-heroicons-information-circle-20-solid"
								:title="validationError"
							/>
						</template>
					</UAuthForm>
				</UCard>
			</div>
		</UPageCTA>
	</UPage>
</template>
