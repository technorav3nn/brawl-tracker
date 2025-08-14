<script setup lang="ts">
import { formatTag, verifyTag } from "@brawltracker/supercell-api-utils";
import { z, type Schema } from "zod";
import type { ButtonProps } from "#ui/components/Button.vue";
import type { Form } from "#ui/types";

const state = reactive({
	club: "",
});

const schema = z.object({
	club: z
		.string()
		.nonempty("Required")
		.refine((v) => verifyTag(v), {
			message: "Invalid club tag",
		}),
});

const form = ref<Form<Schema>>();
const queryClient = useQueryClient();
const loading = ref(false);

async function validate(s: typeof state) {
	const result = await schema.safeParseAsync(s);
	if (!result.success) {
		return result.error.issues.map((issue) => ({
			name: issue.path.join("."),
			message: issue.message,
		}));
	}

	form.value?.setErrors([]);

	if (state.club) {
		try {
			loading.value = true;
			await queryClient.fetchQuery(clubsDetailQuery(state.club.replace("#", "")));
		} catch {
			return [{ name: "club", message: "Club not found" }];
		} finally {
			loading.value = false;
		}
	}
}

async function onSubmit() {
	return await navigateTo(`/clubs/${formatTag(state.club).replace("#", "")}`);
}

const links: (ButtonProps & { click?(): any })[] = [
	{
		label: "Search For Club",
		icon: "i-heroicons-magnifying-glass",
		color: "primary",
		to: "/clubs/search",
		size: "md",
	},
	{
		label: "View Top Clubs",
		to: "/leaderboards/clubs",
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
				title="Club Info and Stats"
				description="Search for a club and view its information and stats."
				:links="links"
				:ui="{
					container: 'lg:py-24 lg:pb-16',
					title: 'text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl',
				}"
			/>

			<UForm ref="form" :validate="validate as any" :state :validateOn="[]" @submit="void onSubmit()">
				<UButtonGroup class="mt-4 flex items-start justify-center" size="xl">
					<UFormField class="w-11/12 sm:w-96" name="club">
						<UInput
							id="search"
							v-model="state.club"
							:style="{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }"
							class="w-full sm:w-96"
							size="xl"
							label="Search Club"
							placeholder="Enter Club Tag"
							@input="($event.target as HTMLInputElement).value = ($event.target as HTMLInputElement).value.toUpperCase()"
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
				</UButtonGroup>
			</UForm>
		</UContainer>
	</UPage>
</template>
