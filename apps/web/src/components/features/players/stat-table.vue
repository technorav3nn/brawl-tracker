<script setup lang="ts">
import { Image } from "@unpic/vue";

defineProps<{
	title?: string;
	uneven?: boolean;
	stats: { stat: string; value: any; color?: string; image?: string; valueImage?: string; valueRender?: Component }[];
}>();
</script>

<template>
	<section>
		<div v-if="title" class="rounded-t-md bg-inherit border border-b-0 text-center border-gray-200 dark:border-gray-800">
			<h3 class="text-foreground font-semibold text-lg py-2 px-4">{{ title }}</h3>
		</div>
		<UTable
			:ui="{
				thead: 'border-b-0 hidden',
				divide: '!divide-y-0 ',
				td: {
					base: '!whitespace-normal',
					padding: 'py-2 px-3',
				},
				tr: { base: `[&_:nth-child(1)]:!font-semibold ${uneven ? 'last:!border-border last:!border-b' : ''}` },
				base: 'bg-inherit',
			}"
			:rows="stats"
			:columns="[
				{ key: 'stat', label: 'Stat' },
				{ key: 'value', label: 'Value' },
			]"
			class="h-full border border-gray-200 dark:border-gray-800"
			:class="[title ? 'rounded-b-md' : 'rounded-md']"
		>
			<template #stat-data="{ row }">
				<div class="flex flex-row gap-x-2 items-center">
					<Image v-if="row.image" :alt="row.stat" :src="row.image" width="30" height="30" class="object-scale-down size-[24px]" />
					<p class="text-foreground font-semibold text-sm">{{ row.stat }}</p>
				</div>
			</template>

			<template #value-data="{ row }">
				<p v-if="row.color" :class="[row.color ?? '', row.valueImage ? 'flex flex-row gap-x-2 items-center' : '']">
					<Image
						v-if="row.valueImage"
						:alt="row.value"
						:src="row.valueImage"
						width="25"
						height="25"
						class="object-scale-down size-[24px]"
					/>
					{{ row.value }}
				</p>
				<component :is="row.valueRender" v-else-if="row.valueRender" />
				<template v-else>{{ row.value }}</template>
			</template>
		</UTable>
	</section>
</template>
