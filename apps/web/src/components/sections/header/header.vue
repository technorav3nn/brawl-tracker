<script setup lang="ts">
import { StarIcon } from "lucide-vue-next";
</script>

<template>
	<nav class="fixed left-0 right-0 top-0 z-40 bg-background">
		<div class="relative flex h-16 items-center border-b-[1px]">
			<div class="container max-w-7xl py-3 max-md:px-4 md:py-4">
				<section class="justify-between gap-8 hstack">
					<div class="flex flex-1 items-center gap-1.5">
						<NuxtLink class="mr-3 flex flex-row items-center gap-2 text-lg font-bold" href="/" prefetch>
							<StarIcon :size="24" class="text-primary" fill="currentColor" />
							BrawlTrack
						</NuxtLink>
					</div>
					<div class="hidden gap-x-6 md:flex">
						<SectionsHeaderDesktopLinks />
					</div>
					<section class="flex-1 items-center justify-end !gap-1 hstack">
						<SectionsHeaderSearchButton />
						<SectionsHeaderColorModeToggle />
						<SectionsHeaderMobileLinks />
					</section>
				</section>
			</div>
		</div>
	</nav>
</template>
