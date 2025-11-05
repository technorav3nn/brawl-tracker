<script setup lang="ts">
import { verifyTag } from "@brawltracker/supercell-api-utils";
import type { FetchError } from "ofetch";
import { z, type Schema } from "zod";
import type { ButtonProps } from "#ui/components/Button.vue";
import type { Form } from "#ui/types";

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
				await onSubmit();
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

const links: (ButtonProps & { click?(): any })[] = [
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
		size: "md",
	},
	{
		label: "View Top Players",
		to: "/leaderboards/players",
		icon: "i-heroicons-chart-bar",
		color: "neutral",
		variant: "subtle",
		size: "md",
	},
];
</script>

<template>
	<UPage>
		<UContainer>
			<UPageHero
				title="Player Profile and Stats"
				description="Search for any player with their player tag or Supercell ID. View their profile, stats, and more."
				:links="links"
				:ui="{
					container: 'lg:py-24 lg:pb-16',
					title: 'text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl',
				}"
			/>

			<UForm ref="form" :validate="validate as any" :state @submit="void onSubmit()">
				<div class="flex items-center justify-center">
					<USelect
						class="w-48"
						:model-value="state.type === 'tag' ? 'Tag' : 'Supercell ID Handle'"
						:items="['Tag', 'Supercell ID Handle']"
						@update:model-value="state.type = $event === 'Tag' ? 'tag' : 'scidHandle'"
					/>
				</div>

				<UFieldGroup class="mt-4 flex items-start justify-center" size="xl">
					<UFormField class="w-11/12 sm:w-96" name="player">
						<UInput
							id="search"
							v-model="state.player"
							:style="{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }"
							class="w-full sm:w-96"
							size="xl"
							label="Search Player"
							:placeholder="`Enter ${state.type === 'tag' ? 'Player Tag (e.g. #P800LV)' : 'Supercell ID Handle (e.g. BrawlMaster)'}`"
							@input="
								($event: Event) => {
									if (state.type !== 'tag') return;
									($event.target as HTMLInputElement).value = ($event.target as HTMLInputElement).value.toUpperCase();
								}
							"
						/>
					</UFormField>
					<UButton
						:loading="loading"
						class="h-full"
						type="submit"
						size="xl"
						color="neutral"
						variant="subtle"
						icon="i-heroicons-magnifying-glass"
					/>
				</UFieldGroup>
			</UForm>
		</UContainer>
	</UPage>
</template>
