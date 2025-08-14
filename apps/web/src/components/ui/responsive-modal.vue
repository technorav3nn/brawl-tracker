<script setup lang="ts">
import { type ModalProps, type DrawerProps } from "#ui/types";

defineProps<{
	drawerProps: DrawerProps;
	modalProps: ModalProps;
}>();

const open = defineModel<boolean>("open", { default: false });

const isDesktop = useMediaQuery("(min-width: 768px)");
</script>

<template>
	<UModal v-if="isDesktop" v-model:open="open" v-bind="modalProps">
		<slot />
		<template #header>
			<slot name="header" />
		</template>
		<template #body>
			<slot name="body" />
		</template>
	</UModal>
	<UDrawer v-else v-model:open="open" v-bind="drawerProps">
		<slot />
		<template #header>
			<slot name="header" />
		</template>
		<template #body>
			<slot name="body" />
		</template>
	</UDrawer>
</template>
