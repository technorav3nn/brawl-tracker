<script setup lang="ts">
const props = defineProps<{
	title: string;
	tableData: Record<any, any>[];
	description: string;
	icon: string;
	spanColumns?: boolean;
}>();
</script>

<template>
	<div class="flex flex-col gap-4 rounded-lg border border-border p-4 shadow-sm">
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
			<p class="text-sm text-muted-foreground">{{ description }}</p>
			<USeparator class="mt-4 -scale-x-[1.042]" />
			<UTable
				:ui="{
					thead: 'border-b-0 hidden',
					divide: 'divide-y-0! ',
					td: {
						base: 'whitespace-normal! ',
						padding: 'px-2.5 py-2.5',
					},
					tr: { base: '[&_:nth-child(1)]:text-foreground! [&_:nth-child(1)]:font-semibold! ' },
				}"
				:columns="[
					{ key: 'label', label: 'Name' },
					{ key: 'value', label: 'Value' },
				]"
				:rows="tableData"
				class="w-full"
			>
				<template #label-data="{ row }">
					<div v-if="row.isLevelStat">
						<UTooltip :ui="{ base: '[@media(pointer:coarse)]:block!' }" text="This stat is level dependent">
							<p class="underline decoration-dashed underline-offset-4">{{ row.label }}</p>
						</UTooltip>
					</div>
					<p v-else>{{ row.label }}</p>
				</template>
			</UTable>
		</div>
	</div>
</template>
