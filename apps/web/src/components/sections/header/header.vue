<script setup lang="ts">
import { StarIcon } from "lucide-vue-next";
</script>

<template>
	<nav class="sticky top-0 z-10 bg-background">
		<div class="relative flex h-16 items-center border-b-[1px]">
			<div class="container max-w-7xl py-3 max-sm:px-5 md:py-4">
				<section class="justify-between !gap-8 hstack">
					<div class="!gap-6 hstack">
						<NuxtLink class="mr-3 flex flex-row items-center gap-2 text-lg font-bold" href="/" prefetch>
							<StarIcon :size="22" />
							BrawlTrack
						</NuxtLink>
						<SectionsHeaderDesktopLinks />
					</div>
					<section class="!gap-1 hstack">
						<SectionsHeaderColorModeToggle />
					</section>
				</section>
			</div>
		</div>
	</nav>
</template>
