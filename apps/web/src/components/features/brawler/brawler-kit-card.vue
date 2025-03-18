<script setup lang="ts">
import { UTooltip } from "#components";

const props = defineProps<{
	title: string;
	tableData: Record<any, any>[];
	description: string;
	icon: string;
	spanColumns?: boolean;
}>();
</script>

<template>
	<div class="flex flex-col gap-4 rounded-lg border border-(--ui-border) p-4 shadow-sm">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<NuxtImg
					v-if="props.icon"
					:src="props.icon"
					width="30"
					height="30"
					:alt="`${title} icon`"
					fit="inside"
					class="self-center bg-contain object-cover"
					format="webp"
				/>
				<h1 class="text-2xl font-bold tracking-tight">{{ title }}</h1>
			</div>
		</div>
		<div>
			<p class="text-muted-foreground text-sm">{{ description }}</p>
			<USeparator class="mt-4 -scale-x-[1.042]" />
			<UTable
				:ui="{
					thead: 'border-b-0 hidden',
					base: 'divide-y-0!',
					td: 'whitespace-normal! px-2.5 py-2.5',
					tr: '[&_:nth-child(1)]:text-(--ui-text) [&_:nth-child(1)]:font-semibold!',
				}"
				:columns="[
					{
						accessorKey: 'label',
						cell: (d) => {
							const data = d.row.original;
							if (data.isLevelStat) {
								return h(
									UTooltip,
									{
										text: 'This stat is level dependent',
										delayDuration: 0,
										content: { align: 'center', side: 'bottom', positionStrategy: 'absolute' },
									},
									{
										default: () => h('p', { class: 'underline decoration-dashed underline-offset-4 !w-fit' }, data.label),
									}
								);
							}
							return h('p', {}, data.label);
						},
					},
					{ accessorKey: 'value', header: 'Value' },
				]"
				:data="tableData"
				class="w-full"
			/>
		</div>
	</div>
</template>
