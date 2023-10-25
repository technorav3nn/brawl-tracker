<script setup lang="ts">
import { Moon, CreditCard, Settings, User, Sun, Monitor } from "lucide-vue-next";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
	CommandSeparator,
} from "$components/ui/command";
import { Dialog, DialogContent } from "$components/ui/dialog";
import { SEARCH_BAR_LINKS } from "$lib/config";

const open = ref(false);

const colorMode = useColorMode();
const { ctrl_k, meta_k } = useMagicKeys();

const handleColorModeChange = (mode: string) => {
	colorMode.preference = mode;
	open.value = false;
};

whenever(
	() => ctrl_k!.value || meta_k!.value,
	() => {
		open.value = true;
	}
);
</script>

<template>
	<UiButton size="icon" variant="ghost" @click="open = true">
		<IconsTbSearch class="h-[1.2rem] w-[1.2rem] stroke-[1.9]" />
	</UiButton>
	<!-- eslint-disable-next-line vue/no-v-model-argument -->
	<Dialog v-model:open="open">
		<DialogContent class="border-none p-0">
			<Command class="rounded-lg border shadow-md !ring-0">
				<CommandInput placeholder="Type a command or search..." />
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandList class="mt-1 border-t-0">
					<CommandGroup heading="Links">
						<CommandItem v-for="link in SEARCH_BAR_LINKS" :key="link.path" :value="link.label" asChild>
							<NuxtLink :to="link.path" @click="open = false">
								<component :is="link.icon" class="mr-2 h-4 w-4" />
								<span>{{ link.label }}</span>
							</NuxtLink>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Theme">
						<CommandItem value="Dark" @select="handleColorModeChange('dark')">
							<Moon class="mr-2 h-4 w-4" />
							<span>Dark</span>
						</CommandItem>
						<CommandItem value="Light" @select="handleColorModeChange('light')">
							<Sun class="mr-2 h-4 w-4" />
							<span>Light</span>
						</CommandItem>
						<CommandItem value="System" @select="handleColorModeChange('system')">
							<Monitor class="mr-2 h-4 w-4" />
							<span>System</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</DialogContent>
	</Dialog>
</template>
