<script setup lang="ts">
defineProps<{
	name: string;
	opened?: boolean;
	label: string;
	description: string;
}>();

const emit = defineEmits<{
	change: [state: boolean];
}>();

defineSlots<{
	// eslint-disable-next-line no-unused-vars
	input(props: { componentField: any }): any;
}>();
</script>

<template>
	<div>
		<VeeField v-slot="{ componentField }" :name="name">
			<UiFormItem class="flex flex-row gap-2 space-y-0 rounded-md border p-4">
				<UiFormControl>
					<!-- prettier-ignore  -->
					<UiCheckbox :id="name" @update:checked="state => emit('change', state)" />
				</UiFormControl>
				<div class="space-y-1 leading-none">
					<UiFormLabel :for="name" class="-mt-0.5 tracking-normal">
						{{ label }}
					</UiFormLabel>
					<UiFormDescription>{{ description }} </UiFormDescription>
					<slot name="input" :componentField="componentField" />
					<UiFormMessage />
				</div>
			</UiFormItem>
		</VeeField>
	</div>
</template>
