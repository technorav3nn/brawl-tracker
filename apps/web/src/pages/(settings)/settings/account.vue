<script setup lang="ts">
import { ModalsConfirmationModal, AuthImportFriendsModal, AuthScidModal } from "#components";

const user = useUser();
const { data: databaseUser } = await useDatabaseUser();

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

function connect() {
	modal.open(AuthScidModal);
}

async function disconnect() {
	const result = await $fetch("/api/auth/scid/disconnect", { method: "POST" });
	if (result.success) {
		toast.add({ title: "Disconnected from Supercell ID!", color: "primary" });
		refreshNuxtData(["user", "database-user"]);
	} else {
		toast.add({ title: "Failed to disconnect from Supercell ID", color: "red" });
	}
}

function importFriends() {
	modal.open(AuthImportFriendsModal);
}
</script>

<template>
	<section>
		<p class="font-medium text-lg">Account</p>
		<p class="text-sm">Manage anything about your accounts details</p>
		<UDivider class="mt-4 w-full" />
	</section>
	<section class="mt-4 flex gap-4 flex-col">
		<div>
			<p class="font-medium text-md">Supercell ID connection</p>
			<p class="text-sm">Manage your Supercell ID connection</p>
			<UButton v-if="!databaseUser?.scidConnections.isConnected" size="xs" icon="i-tabler-link" class="mt-2" @click="connect">
				Connect
			</UButton>
			<UButton v-else size="xs" icon="i-tabler-unlink" class="mt-2" color="red" @click="disconnect">Disconnect</UButton>
		</div>
		<div>
			<p class="font-medium text-md">Supercell Friends</p>
			<p class="text-sm">Import your friends and view their profiles and stats easily!</p>
			<UButton size="xs" icon="i-heroicons-arrow-down-tray-20-solid" class="mt-2" @click="importFriends">
				Import Supercell Friends
			</UButton>
		</div>
		<div>
			<p class="font-medium text-md text-red-400 dark:text-red-400">Delete Account</p>
			<p class="text-sm">Warning: Deleting your account is irreversible</p>
			<div class="mt-3">
				<UButton color="red" size="xs" icon="i-heroicons-trash-20-solid" @click="beginDeleteAccountProcess">
					Delete Account
				</UButton>
			</div>
		</div>
	</section>
</template>
