<script lang="ts" setup>
defineProps<{
	labels: [first: string, second: string];
	description: string;
}>();

const emit = defineEmits<{ close: [boolean]; success: [boolean] }>();

function onSuccess(state: boolean) {
	emit("close", state);
	emit("success", state);
}
</script>

<template>
	<UModal :close="{}">
		<template #content>
			<UCard :ui="{ header: 'flex w-full justify-between' }">
				<template #header>
					<h1 class="text-lg font-semibold">Are you sure?</h1>
					<UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="onSuccess(false)" />
				</template>

				<p class="text-sm">{{ description }}</p>

				<div class="mt-8 w-full">
					<div class="flex flex-row justify-end gap-2 *:px-4">
						<UButton
							class="text-center focus-visible:ring-1 focus-visible:ring-accented!"
							color="neutral"
							variant="subtle"
							@click="onSuccess(false)"
						>
							{{ labels[0] }}
						</UButton>
						<UButton class="text-center" color="error" @click="onSuccess(true)">{{ labels[1] }}</UButton>
					</div>
				</div>
			</UCard>
		</template>
	</UModal>
</template>
