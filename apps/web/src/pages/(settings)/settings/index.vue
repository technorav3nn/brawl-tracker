<script setup lang="ts">
import type { User } from "lucia";
import { type z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { SAVED_TAGS_SECURE_SEPERATOR } from "$lib/constants";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { userProfileSettingsSchema } from "$lib/validation/user-schema";

const user = useUser();
const nuxtApp = useNuxtApp();

function getCachedData(key: string) {
	return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
}

const { data: initialPlayerTags } = await useFetch("/api/saved-tags", {
	query: { type: "player" },
	getCachedData,
});
const { data: initialClubTags } = await useFetch("/api/saved-tags", {
	query: { type: "club" },
	getCachedData,
});

const loading = ref(false);
const secondsLeft = ref(5);
const { start: startTimeout, ready: saveButtonReady } = useTimeout(5000, { controls: true, immediate: false });
const { pause: pauseInterval, resume: resumeInterval } = useIntervalFn(
	() => {
		if (secondsLeft.value === 0) {
			pauseInterval();
			resumeInterval();
			secondsLeft.value = 5;
		} else {
			secondsLeft.value--;
		}
	},
	1000,
	{ immediate: false }
);

const state = reactive<Partial<User>>({
	savedPlayerTags: initialPlayerTags.value!.map((s) => s.replaceAll(SAVED_TAGS_SECURE_SEPERATOR, " - ")),
	savedClubTags: initialClubTags.value!.map((s) => s.replaceAll(SAVED_TAGS_SECURE_SEPERATOR, " - ")),
});

async function updateTags() {
	if (!state.savedPlayerTags) return;
	if (!state.savedClubTags) return;
	loading.value = true;
	const securePlayerTags = state.savedPlayerTags.map((s) => s.replaceAll(" - ", SAVED_TAGS_SECURE_SEPERATOR));
	const secureClubTags = state.savedClubTags?.map((s) => s.replaceAll(" - ", SAVED_TAGS_SECURE_SEPERATOR));
	await $fetch("/api/saved-tags/update", { method: "PATCH", body: { playerTags: securePlayerTags, clubTags: secureClubTags } });
	loading.value = false;
	startTimeout();
	resumeInterval();
}

async function onSubmit(_: FormSubmitEvent<z.infer<typeof userProfileSettingsSchema>>) {
	await updateTags();
}
</script>

<template>
	<div class="lg:max-w-2xl">
		<section>
			<p class="font-medium text-lg">Profile</p>
			<p class="text-sm">Manage everything about your profile</p>
			<UDivider class="mt-4 w-full" />
		</section>
		<section class="mt-4">
			<UForm class="space-y-4" :schema="userProfileSettingsSchema" :state @submit="onSubmit">
				<UFormGroup label="Saved Player Tags" description="Shown as a list whenever you're searching for a player">
					<UiTagsInput v-model="state.savedPlayerTags" name="savedPlayerTags" gameTagInputType="player" />
				</UFormGroup>
				<UFormGroup label="Saved Player Tags" description="Also shown as a list whenever you're searching for a club">
					<UiTagsInput v-model="state.savedClubTags" name="savedClubTags" gameTagInputType="club" />
				</UFormGroup>
				<UButton type="submit" :loading="loading" :disabled="!saveButtonReady"
					>Save{{ !saveButtonReady ? ` ${secondsLeft}s` : "" }}</UButton
				>
			</UForm>
		</section>
		<section v-if="user" class="mt-8">
			<p class="font-medium text-lg">Profile Info</p>
			<p class="text-sm">
				Readonly info about your profile. Due to Supercell ID connection, this data is bound to your Supercell ID. To change this
				data, you need to change it in your Supercell ID account in any Supercell game
				<br /><br />
				When data is changed, it will be updated automatically, or manually with the
				<span class="text-primary">Refresh</span> button
			</p>
			<UDivider class="mt-4 w-full" />
		</section>
		<section v-if="user" class="mt-4 flex flex-col gap-4">
			<UFormGroup label="Username (Supercell ID)">
				<UInput v-model="user.username" label="Username" disabled />
			</UFormGroup>
			<UFormGroup label="Email (Supercell ID)">
				<UInput v-model="user.email" label="Email" disabled />
			</UFormGroup>
			<UFormGroup>
				<UButton icon="i-heroicons-arrow-path-20-solid">Refresh</UButton>
			</UFormGroup>
		</section>
	</div>
</template>
