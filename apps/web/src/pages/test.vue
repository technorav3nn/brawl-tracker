<script setup lang="ts">
const open = ref(false);
</script>

<template>
	<UButton @click="open = true">Click</UButton>

	<UiResponsiveModal
		v-model:open="open"
		:drawerProps="{ title: 'drawer', ui: { container: 'h-[500px]!' } }"
		:modalProps="{ title: 'modal' }"
	>
		<template #body
			>Hello world

			<UCard />
		</template>
	</UiResponsiveModal>
</template>
