<script setup lang="ts">
const open = ref(false);
</script>

<template>
	<UButton @click="open = true">Click</UButton>

	<UiResponsiveModal
		v-model:open="open"
		:drawer-props="{ title: 'drawer', ui: { container: 'h-[500px]!' } }"
		:modal-props="{ title: 'modal' }"
	>
		<template #body
			>Hello world

			<UCard />
		</template>
	</UiResponsiveModal>
</template>
