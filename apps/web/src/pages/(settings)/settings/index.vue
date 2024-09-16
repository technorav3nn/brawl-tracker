<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type { FormError } from "#ui/types/form";
import { userSchema } from "$lib/validation/user-schema";

const user = useUser();

const { handleSubmit, errors, values, defineField } = useForm({
	validationSchema: toTypedSchema(userSchema),
	initialValues: {
		username: user.value!.username,
	},
});

const [username, usernameProps] = defineField("username");

const onSubmit = handleSubmit((v) => {
	console.log(v);
});

function validate() {
	const formErrors: FormError[] = [];
	for (const [field, error] of Object.entries(errors.value)) {
		formErrors.push({ path: field, message: error });
	}

	return formErrors;
}
</script>

<template>
	<section>
		<p class="font-medium text-lg">Settings</p>
		<p class="text-sm">This is the settings page</p>
		<UDivider class="mt-4 w-full" />
	</section>
	<section class="mt-4">
		<UForm class="space-y-4" :state="values" :validate="validate" @submit="onSubmit">
			<UFormGroup label="Username">
				<UInput v-model="username" name="username" placeholder="Username" v-bind="usernameProps" />
			</UFormGroup>
			<UButton type="submit">Save</UButton>
		</UForm>
	</section>
</template>
