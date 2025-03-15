<script setup lang="ts">
import { LazyModalsConfirmationModal, LazyAuthImportFriendsModal, LazyAuthScidModal } from "#components";

const user = useUser();
const databaseUser = useDatabaseUser();

const modal = useOverlay();
const toast = useToast();

function beginDeleteAccountProcess() {
	modal.create(LazyModalsConfirmationModal).open({
		onSuccess: () => {
			modal.create(LazyModalsConfirmationModal).open({
				onSuccess: deleteAccount,
				labels: ["Cancel", "Delete"],
				description: "Again, are you sure? This is irreversible!",
			});
		},
		labels: ["Cancel", "Delete"],
		description:
			"Are you sure you want to delete your account? This action is irreversible! You will lose all your data and settings. Your Supercell ID will now be unlinked from your account aswell.",
	});

	// modal.open(LazyModalsConfirmationModal, {
	// 	onSuccess: () =>
	// 		modal.open(LazyModalsConfirmationModal, {
	// 			onSuccess: deleteAccount,
	// 			labels: ["Cancel", "Delete"],
	// 			description: "Again, are you sure? This is irreversible!",
	// 		}),
	// 	labels: ["Cancel", "Delete"],
	// 	description:
	// 		"Are you sure you want to delete your account? This action is irreversible! You will lose all your data and settings. Your Supercell ID will now be unlinked from your account aswell.",
	// });
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
	modal.create(LazyAuthScidModal).open();
}

async function disconnect() {
	const result = await $fetch("/api/auth/scid/disconnect", { method: "POST" });
	if (result.success) {
		toast.add({ title: "Disconnected from Supercell ID!", color: "primary" });
		refreshNuxtData(["user", "database-user"]);
	} else {
		toast.add({ title: "Failed to disconnect from Supercell ID", color: "error" });
	}
}

function importFriends() {
	modal.create(LazyAuthImportFriendsModal).open();
}
</script>

<template>
	<section>
		<p class="text-lg font-medium">Account</p>
		<p class="text-sm">Manage anything about your accounts details</p>
		<USeparator class="mt-4 w-full" />
	</section>
	<section class="mt-4 flex flex-col gap-4">
		<div>
			<p class="text-md font-medium">Supercell ID connection</p>
			<p class="text-sm">Manage your Supercell ID connection</p>
			<UButton v-if="!databaseUser?.profile.isConnected" size="sm" icon="i-tabler-link" class="mt-2" @click="connect">
				Connect
			</UButton>
			<UButton v-else size="sm" icon="i-tabler-unlink" class="mt-2" color="error" @click="disconnect">Disconnect</UButton>
		</div>
		<div>
			<p class="text-md font-medium">Supercell Friends</p>
			<p class="text-sm">Import your friends and view their profiles and stats easily!</p>
			<UButton size="sm" icon="i-heroicons-arrow-down-tray-20-solid" class="mt-2" @click="importFriends">
				Import Supercell Friends
			</UButton>
		</div>
		<div>
			<p class="text-md font-medium text-red-400 dark:text-red-400">Delete Account</p>
			<p class="text-sm">Warning: Deleting your account is irreversible</p>
			<div class="mt-3">
				<UButton color="error" size="sm" icon="i-heroicons-trash-20-solid" @click="beginDeleteAccountProcess">
					Delete Account
				</UButton>
			</div>
		</div>
	</section>
</template>
