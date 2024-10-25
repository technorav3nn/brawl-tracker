<script setup lang="ts">
import { ModalsConfirmationModal } from "#components";

const user = useUser();
const modal = useModal();
const toast = useToast();

function beginDeleteAccountProcess() {
	modal.open(ModalsConfirmationModal, {
		onSuccess: () =>
			modal.open(ModalsConfirmationModal, {
				onSuccess: deleteAccount,
				labels: ["Cancel", "Delete"],
				description: "Again, are you sure? This is irreversible!",
			}),
		labels: ["Cancel", "Delete"],
		description:
			"Are you sure you want to delete your account? This action is irreversible! You will lose all your data and settings. Your Supercell ID will now be unlinked from your account aswell.",
	});
}

async function deleteAccount() {
	user.value = null;
	await $fetch("/api/auth/delete-account", {
		method: "DELETE",
		body: { confirm: true },
	});
	reloadNuxtApp();
	await navigateTo("/");
	toast.add({ title: "Delete account successfully", color: "primary" });
}
</script>

<template>
	<section>
		<p class="font-medium text-lg">Account</p>
		<p class="text-sm">Manage anything about your accounts details</p>
		<UDivider class="mt-4 w-full" />
	</section>
	<section class="mt-4">
		<p class="font-medium text-md text-red-400 dark:text-red-400">Delete Account</p>
		<p class="text-sm">Warning: Deleting your account is irreversible</p>
		<div class="mt-3">
			<UButton color="red" size="xs" icon="i-heroicons-trash-20-solid" @click="beginDeleteAccountProcess">
				Delete Account
			</UButton>
		</div>
	</section>
</template>
