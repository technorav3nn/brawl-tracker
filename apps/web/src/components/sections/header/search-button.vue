<script setup lang="ts">
import { Moon, Sun, Monitor } from "lucide-vue-next";
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
	<UiDialog v-model:open="open">
		<UiDialogContent class="border-none p-0">
			<UiCommandRoot class="rounded-lg border shadow-md !ring-0">
				<UiCommandInput placeholder="Type a Uicommand or search..." />
				<UiCommandEmpty>No results found.</UiCommandEmpty>
				<UiCommandList class="mt-1 border-t-0">
					<UiCommandGroup heading="Links">
						<UiCommandItem v-for="link in SEARCH_BAR_LINKS" :key="link.path" :value="link.label" asChild>
							<NuxtLink :to="link.path" @click="open = false">
								<component :is="link.icon" class="mr-2 h-4 w-4" />
								<span>{{ link.label }}</span>
							</NuxtLink>
						</UiCommandItem>
					</UiCommandGroup>
					<UiCommandSeperator />
					<UiCommandGroup heading="Theme">
						<UiCommandItem value="Dark" @select="handleColorModeChange('dark')">
							<Moon class="mr-2 h-4 w-4" />
							<span>Dark</span>
						</UiCommandItem>
						<UiCommandItem value="Light" @select="handleColorModeChange('light')">
							<Sun class="mr-2 h-4 w-4" />
							<span>Light</span>
						</UiCommandItem>
						<UiCommandItem value="System" @select="handleColorModeChange('system')">
							<Monitor class="mr-2 h-4 w-4" />
							<span>System</span>
						</UiCommandItem>
					</UiCommandGroup>
				</UiCommandList>
			</UiCommandRoot>
		</UiDialogContent>
	</UiDialog>
</template>
