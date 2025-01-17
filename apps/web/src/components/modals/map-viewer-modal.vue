<script setup lang="ts">
defineProps<{ imageUrl: string }>();

const modal = useModal();

function onClose() {
	modal.close();
}
</script>

<template>
	<UModal :ui="{ padding: '!p-0' }">
		<UCard :ui="{ header: { padding: '!p-2' }, body: { padding: '!p-0' } }">
			<template #header>
				<div class="flex items-end justify-end">
					<UButton color="gray" square variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="onClose"></UButton>
				</div>
			</template>
			<NuxtImg :src="imageUrl" :alt="imageUrl" class="rounded w-full" width="200" height="300" loading="lazy" />
		</UCard>
	</UModal>
</template>
