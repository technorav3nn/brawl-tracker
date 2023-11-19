<script setup lang="ts">
import { GithubLogoIcon } from "@radix-icons/vue";
import { NuxtLink } from "#components";
</script>

<template>
	<footer>
		<div class="container h-20 max-w-7xl py-3 max-md:px-4 md:py-4">
			<div class="flex h-full items-center justify-center">
				<div class="flex w-full flex-row justify-between">
					<p class="text-sm font-medium">© BrawlTrack by Death_Blows</p>
					<UiButton variant="ghost" size="icon" asChild>
						<NuxtLink href="/privacy-policy">
							<GithubLogoIcon class="h-5 w-5" />
						</NuxtLink>
					</UiButton>
				</div>
			</div>
		</div>
	</footer>
</template>
