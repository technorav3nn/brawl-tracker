<script setup lang="ts">
import { ArrowRightIcon } from "lucide-vue-next";
</script>

<template>
	<div>
		<div class="flex max-w-[980px] flex-col items-start gap-4 px-4 pb-8 pt-8 md:pt-12">
			<NuxtLink class="group rounded-full bg-secondary p-1 transition-colors hover:bg-secondary/80" to="/">
				<div class="inline-flex items-center text-sm font-medium">
					<div
						class="mr-3 rounded-full bg-primary px-3 py-1 text-primary-foreground transition-colors group-hover:bg-primary/80"
					>
						New
					</div>
					<p>Leaderboard Statistics</p>
					<ArrowRightIcon
						class="mx-2 mr-3 h-5 w-5 stroke-[1.7] transition-transform group-hover:translate-x-1"
					/>
				</div>
			</NuxtLink>
			<h1 class="text-4xl font-bold tracking-tight">The greatest way to track your stats.</h1>
			<span class="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
				Track your stats, compare with your friends, and see how you stack up against the best.
			</span>
			<div class="flex w-full items-center gap-3 pb-8 pt-1 md:pb-10">
				<UiButton>Search Player</UiButton>
				<UiButton variant="outline">View Leaderboards</UiButton>
			</div>
		</div>
		<SectionsHeaderSearchButton />
	</div>
</template>
