<script lang="ts" setup>
defineProps<{
	labels: [first: string, second: string];
	description: string;
}>();

const emit = defineEmits<{ close: [boolean]; success: [] }>();

function onSuccess() {
	emit("close", true);
	emit("success");
}
</script>

<template>
	<UModal>
		<template #content>
			<UCard :ui="{ header: 'divide-y divide-gray-100 dark:divide-gray-800' }">
				<template #header>
					<h1 class="text-lg font-semibold">Are you sure?</h1>
				</template>

				<p class="text-sm">{{ description }}</p>

				<div class="mt-8 flex justify-end gap-2">
					<UButton class="w-1/2 text-center" color="neutral" variant="subtle" block @click="emit('close', true)">{{
						labels[0]
					}}</UButton>
					<UButton class="w-1/2 text-center" color="error" block @click="onSuccess">{{ labels[1] }}</UButton>
				</div>
			</UCard>
		</template>
	</UModal>
</template>
