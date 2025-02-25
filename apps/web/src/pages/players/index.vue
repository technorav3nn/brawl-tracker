<script setup lang="ts">
import { verifyTag } from "@brawltracker/supercell-api-utils";
import type { FetchError } from "ofetch";
import { z, type Schema } from "zod";
import type { Button, Form } from "#ui/types";

const state = reactive({
	player: undefined,
	type: "tag",
});

const schema = z.object({
	player: z
		.string()
		.nonempty("Required")
		.refine((v) => (state.type === "tag" ? verifyTag(v) : true), {
			message: "Invalid player tag",
		}),
	type: z.enum(["tag", "scidHandle"]),
});

const nuxtApp = useNuxtApp();

const form = ref<Form<Schema>>();
const loading = ref(false);
const resolvedTag = ref("");

async function validate(s: typeof state) {
	form.value?.setErrors([]);

	const result = await schema.safeParseAsync(s);
	if (!result.success) {
		return result.error.issues.map((issue) => ({
			path: issue.path.join("."),
			message: issue.message,
		}));
	}

	if (state.type && state.player) {
		try {
			loading.value = true;
			const result = await $fetch(`/api/players`, {
				query: { tag: (state.player as string).replace("#", ""), ...(state.type === "scidHandle" && { isScid: true }) },
				retry: false,
			});
			nuxtApp.payload.data[`players-${result.tag}`] = result;
			if (result) {
				resolvedTag.value = result.tag;
			}
		} catch (error) {
			console.log(error);
			if ((error as FetchError).status === 404) {
				return [{ path: "player", message: "Player not found" }];
			}
		} finally {
			loading.value = false;
		}
	}

	return [];
}

async function onSubmit() {
	return await navigateTo(`/players/${resolvedTag.value.replace("#", "")}`);
}

const links: (Button & { click?(): any })[] = [
	{
		label: "Search For Player",
		icon: "i-heroicons-magnifying-glass",
		color: "primary",
		click: () => {
			const search = document.querySelector("#search") as HTMLInputElement;
			if (search) {
				search.focus();
			}
		},
	},
	{
		label: "View Top Players",
		to: "/leaderboards/players",
		icon: "i-heroicons-chart-bar",
		color: "gray",
	},
];
</script>

<template>
	<UPage>
		<UContainer>
			<UPageHero
				title="Player Profile and Stats"
				description="Search for any player with their player tag or Supercell ID. View their profile, stats, and more."
				align="center"
				:links="links"
				class="mt-8"
			>
			</UPageHero>

			<UForm ref="form" :validate="validate as any" :state :validateOn="['submit']" @submit="onSubmit">
				<div class="flex items-center justify-center">
					<USelectMenu
						class="w-48"
						:modelValue="state.type === 'tag' ? 'Tag' : 'Supercell ID Handle'"
						:options="['Tag', 'Supercell ID Handle']"
						@update:model-value="state.type = $event === 'Tag' ? 'tag' : 'scidHandle'"
					/>
				</div>

				<UButtonGroup :ui="{ rounded: 'rounded-lg' }" class="mt-4 flex justify-center items-start" size="xl">
					<UFormGroup name="player">
						<UInput
							id="search"
							v-model="state.player"
							class="w-96"
							size="xl"
							label="Search Player"
							:placeholder="`Enter ${state.type === 'tag' ? 'Player Tag (e.g. #P800LV)' : 'Supercell ID Handle (e.g. BrawlMaster)'}`"
						/>
					</UFormGroup>
					<UButton :loading="loading" class="h-full" type="submit" size="xl" color="gray" icon="i-heroicons-magnifying-glass" />
				</UButtonGroup>
			</UForm>
		</UContainer>
	</UPage>
</template>
