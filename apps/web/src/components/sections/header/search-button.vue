<script setup lang="ts">
import { Calendar, Calculator, CreditCard, Settings, Smile, User } from "lucide-vue-next";
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
</script>

<template>
	<Dialog open>
		<DialogContent class="border-none p-0">
			<!-- eslint-disable-next-line vue/no-v-model-argument -->
			<Command class="rounded-lg border shadow-md !ring-0">
				<CommandInput placeholder="Type a command or search..." />
				<CommandList class="border-t-0">
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem value="Calendar">
							<Calendar class="mr-2 h-4 w-4" />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem value="Search Emoji">
							<Smile class="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem value="Calculator">
							<Calculator class="mr-2 h-4 w-4" />
							<span>Calculator</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem value="Profile">
							<User class="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem value="Billing">
							<CreditCard class="mr-2 h-4 w-4" />
							<span>Billing</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem value="Settings">
							<Settings class="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</DialogContent>
	</Dialog>
</template>
