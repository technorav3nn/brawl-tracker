<script setup lang="ts">
import { cn } from "$lib/util/tailwind";
import TableCell from "./table-cell.vue";
import TableRow from "./table-row.vue";

interface Props {
	class?: string;
	colspan?: number;
}

const props = withDefaults(defineProps<Props>(), {
	class: "",
	colspan: 1,
});
</script>

<template>
	<TableRow>
		<TableCell
			:class="cn('whitespace-nowrap p-4 align-middle text-sm text-foreground', props.class)"
			:colspan="props.colspan"
		>
			<div class="flex items-center justify-center py-10">
				<slot />
			</div>
		</TableCell>
	</TableRow>
</template>
