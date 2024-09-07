<script setup lang="ts">
import { upperFirstCharacter } from "$lib/util/common";

const props = defineProps<{
	title: string;
	data: Record<any, any>;
	level: string;
	description: string;
	type: "super" | "attack" | null;
}>();
const emit = defineEmits<{
	updateLevel: [level: string];
}>();

const image = computed(() => {
	if (props.type === "super") {
		return "/images/icons/super-icon.png";
	} else if (props.type === "attack") {
		return "/images/icons/attack-icon.png";
	}

	return null;
});
</script>

<template>
	<div class="flex flex-col gap-4 rounded-lg border border-border p-4 shadow">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<NuxtImg
					v-if="image"
					:src="image"
					width="30"
					height="30"
					alt="Attack icon"
					fit="inside"
					class="self-center bg-contain object-cover"
				/>
				<h1 class="text-2xl font-bold tracking-tight">{{ title }}</h1>
			</div>
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
			<p class="text-sm text-muted-foreground">{{ description }}</p>
			<UiTable class="mt-2">
				<UiTableBody>
					<UiTableRow v-for="[stat, value] in Object.entries(data)" :key="stat" class="hover:bg-transparent">
						<UiTableCell class="px-0.5 font-medium">{{ upperFirstCharacter(stat) }}</UiTableCell>
						<UiTableCell class="px-0.5">{{ value }}</UiTableCell>
					</UiTableRow>
				</UiTableBody>
			</UiTable>
		</div>
	</div>
</template>
