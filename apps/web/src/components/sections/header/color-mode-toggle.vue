<script setup lang="ts">
import { SunIcon, MoonIcon } from "lucide-vue-next";
import { Button } from "$components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "$components/ui/dropdown-menu";
import { COLOR_MODES } from "$lib/config";

const mode = useColorMode();

useDisableCssTransitions(() => mode.value);
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" class="w-9 px-0 !ring-0">
				<SunIcon
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-28 !min-w-[unset]">
			<DropdownMenuItem
				v-for="colorMode in COLOR_MODES"
				:key="colorMode"
				class="h-7"
				@click="$colorMode.preference = colorMode.toLowerCase()"
			>
				{{ colorMode }}
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
