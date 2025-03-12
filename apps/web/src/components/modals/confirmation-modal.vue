<script lang="ts" setup>
defineProps<{
	labels: [first: string, second: string];
	description: string;
}>();

const emit = defineEmits(["success"]);

function onSuccess() {
	emit("success");
}

const modal = useModal();
</script>

<template>
	<UModal>
		<UCard :ui="{ ring-3: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				<h1 class="text-lg font-semibold">Are you sure?</h1>
			</template>

			<p class="text-sm">{{ description }}</p>

			<div class="flex justify-end mt-8 gap-2">
				<UButton class="w-1/2 text-center" color="gray" block @click="modal.close()">{{ labels[0] }}</UButton>
				<UButton class="w-1/2 text-center" color="red" block @click="onSuccess">{{ labels[1] }}</UButton>
			</div>
		</UCard>
	</UModal>
</template>
