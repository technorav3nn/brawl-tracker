<script setup lang="ts">
import { upperFirstCharacter } from "$lib/util/common";

defineProps<{
	title: string;
	data: Record<any, any>;
	level: string;
}>();
const emit = defineEmits<{
	updateLevel: [level: string];
}>();
</script>

<template>
	<div class="flex flex-col gap-4 rounded-lg border border-border p-4 shadow">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-bold tracking-tight">{{ title }} Stats</h1>
			<UiSelect :modelValue="level" @update:model-value="(level) => emit('updateLevel', level)">
				<UiSelectTrigger class="h-8 max-w-[8rem]">
					<UiSelectValue>Level {{ level }}</UiSelectValue>
				</UiSelectTrigger>
				<UiSelectContent>
					<UiSelectGroup>
						<UiSelectItem v-for="i in 11" :key="i" class="h-7" :value="i.toString()">
							Level {{ i }}
						</UiSelectItem>
					</UiSelectGroup>
				</UiSelectContent>
			</UiSelect>
		</div>
		<div>
			<UiTable>
				<UiTableHeader>
					<UiTableRow class="w-full">
						<UiTableHead> Stat </UiTableHead>
						<UiTableHead> Value </UiTableHead>
					</UiTableRow>
				</UiTableHeader>
				<UiTableBody>
					<UiTableRow v-for="[stat, value] in Object.entries(data)" :key="stat">
						<UiTableCell class="font-medium">{{ upperFirstCharacter(stat) }}</UiTableCell>
						<UiTableCell>{{ value }}</UiTableCell>
					</UiTableRow>
				</UiTableBody>
			</UiTable>
		</div>
	</div>
</template>
