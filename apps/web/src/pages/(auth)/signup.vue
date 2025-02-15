<script setup lang="ts">
const validationError = ref<string | null>(null);
const loading = ref(false);

async function onSubmit(body: { username: string; password: string; email: string }) {
	try {
		loading.value = true;
		// eslint-disable-next-line n/prefer-global/url-search-params
		const result = await $fetch("/api/auth/signup", { method: "POST", body: new URLSearchParams(body) });
		loading.value = false;
		await navigateTo("/");
		console.log(result);
	} catch (error) {
		validationError.value = (error as any).message;
		loading.value = false;
	}
}
</script>

<template>
	<UPage>
		<UPageBody class="flex justify-center items-center mt-14">
			<UCard class="max-w-lg w-full">
				<template #header>
					<h1 class="text-lg font-semibold">Welcome!</h1>
				</template>
				<UAuthForm
					title="Sign Up"
					class="!max-w-lg"
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
						},
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
					:loading="loading"
					@submit="onSubmit"
				>
					<template v-if="validationError" #validation>
						<UAlert color="red" icon="i-heroicons-information-circle-20-solid" :title="validationError" />
					</template>
				</UAuthForm>
			</UCard>
		</UPageBody>
	</UPage>
</template>
