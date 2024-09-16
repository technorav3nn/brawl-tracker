<script setup lang="ts">
import { GithubLogoIcon } from "@radix-icons/vue";
import { NuxtLink } from "#components";
</script>

<template>
	<footer>
		<div class="container h-16 max-w-7xl py-3 max-md:px-8 md:py-4">
			<div class="flex h-full items-center justify-center">
				<div class="flex w-full flex-row items-center justify-between gap-5">
					<p class="text-sm font-medium text-muted-foreground">
						© BrawlTrack by Death_Blows. Stats by
						<NuxtLink
							class="font-medium underline underline-offset-4"
							target="_blank"
							rel="noopener noreferrer"
							href="https://brawlify.com"
						>
							Brawlify
						</NuxtLink>
					</p>
					<UiButton variant="ghost" size="icon" asChild class="text-muted-foreground">
						<NuxtLink href="/privacy-policy">
							<GithubLogoIcon class="h-5 w-5" />
						</NuxtLink>
					</UiButton>
				</div>
			</div>
		</div>
	</footer>
</template>
