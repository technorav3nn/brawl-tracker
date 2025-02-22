<script setup lang="ts">
import { z } from "zod";
import type { Button } from "#ui/types";

const schema = z.object({
	player: z.string().nonempty("Required"),
});

const state = reactive({
	player: undefined,
});

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

watchEffect(() => console.log(inject("form-errors")));
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

			<UForm :schema :state>
				<UButtonGroup :ui="{ rounded: 'rounded-lg' }" class="mt-4 flex justify-center items-start" size="xl">
					<UFormGroup name="player">
						<UInput
							id="search"
							v-model="state.player"
							class="w-96"
							size="xl"
							label="Search Player"
							placeholder="Enter player tag or Supercell ID"
						/>
					</UFormGroup>
					<UButton class="h-full" type="submit" size="xl" color="gray" icon="i-heroicons-magnifying-glass" />
				</UButtonGroup>
			</UForm>
		</UContainer>
	</UPage>
</template>
