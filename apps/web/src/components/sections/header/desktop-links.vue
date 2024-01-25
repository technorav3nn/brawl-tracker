<script setup lang="ts">
import { ChevronDownIcon } from "lucide-vue-next";
import { MAIN_LINKS, MORE_LINKS } from "$lib/config";

const open = ref(false);
</script>

<template>
	<NuxtLink
		v-for="item in MAIN_LINKS"
		:key="item.path"
		:to="item.path"
		class="text-sm/6 font-medium text-foreground/60 transition-colors hover:text-foreground/80"
		activeClass="link-active"
		prefetch
	>
		{{ item.label }}
	</NuxtLink>
	<UiDropdownMenuRoot v-model:open="open">
		<UiDropdownMenuTrigger asChild>
			<div
				role="button"
				class="text-sm/6 font-medium text-foreground/60 transition-colors hover:cursor-pointer hover:text-foreground/80"
				:class="[open && 'text-foreground/[0.87]']"
			>
				More
				<ChevronDownIcon class="inline-block h-4 w-4" />
			</div>
		</UiDropdownMenuTrigger>
		<UiDropdownMenuContent :sideOffset="7" class="w-28 !min-w-[unset]">
			<UiDropdownMenuItem v-for="item in MORE_LINKS" :key="item.path" :to="item.path" class="h-7">
				<NuxtLink
					:to="item.path"
					class="text-sm/6 font-medium text-foreground/60 transition-colors hover:text-foreground/80"
					activeClass="link-active"
					prefetch
				>
					{{ item.label }}
				</NuxtLink>
			</UiDropdownMenuItem>
		</UiDropdownMenuContent>
	</UiDropdownMenuRoot>
</template>

<style scoped>
.link-active {
	@apply text-foreground/[0.87];
}
</style>
