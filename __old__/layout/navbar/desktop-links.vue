<script setup lang="ts">
import { IconStar } from "@tabler/icons-vue";
import { NAVBAR_ITEMS } from "$lib/config";
import { shouldSetAriaCurrentPage } from "$lib/util/html-tags";
import { css } from "$styled-system/css";
import { HStack } from "$styled-system/jsx";
import { navbarLink } from "./Navbar.styles";

const route = useRoute();
</script>

<template>
	<NuxtLink
		:class="
			css({
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				gap: 2,
				fontSize: 'xl',
				fontWeight: 'bold',
			})
		"
		href="/"
	>
		<IconStar :size="30" :strokeWidth="2.1" />
		BrawlTrack
	</NuxtLink>
	<HStack :display="{ base: 'none', lg: 'flex' }" gap="8">
		<NuxtLink
			v-for="item in NAVBAR_ITEMS"
			:key="item.path"
			:aria-current="shouldSetAriaCurrentPage(route.path, item.path) ? 'page' : undefined"
			:class="navbarLink"
			:href="item.path"
		>
			{{ item.label }}
		</NuxtLink>
	</HStack>
</template>
