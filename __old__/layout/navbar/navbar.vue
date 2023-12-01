<script setup lang="ts">
import { IconMenu2, IconMoon, IconSun } from "@tabler/icons-vue";
import { IconButton } from "$components/ui/icon-button";
import { Box, Container, HStack, styled } from "$styled-system/jsx";
import { colorSchemeToggle } from "./Navbar.styles";
import DesktopLinks from "./desktop-links.vue";

const colorMode = useColorMode();

const toggleColorScheme = () => {
	if (colorMode.preference === "light") {
		colorMode.preference = "dark";
	} else {
		colorMode.preference = "light";
	}
};
</script>

<template>
	<styled.nav bg="bg.default" pos="sticky" top="0" zIndex="sticky">
		<Box borderBottomWidth="1px" pos="relative">
			<Container :py="{ base: 3, md: 4 }" maxW="7xl">
				<HStack gap="8" justify="space-between">
					<HStack gap="10">
						<DesktopLinks />
					</HStack>
					<HStack gap="1">
						<IconButton variant="ghost" @click="toggleColorScheme">
							<IconSun :class="colorSchemeToggle({ variant: 'sun' })" />
							<IconMoon :class="colorSchemeToggle({ variant: 'moon' })" />
						</IconButton>
						<IconButton :display="{ base: 'flex', lg: 'none' }" variant="ghost">
							<IconMenu2 />
						</IconButton>
					</HStack>
				</HStack>
			</Container>
		</Box>
	</styled.nav>
</template>
