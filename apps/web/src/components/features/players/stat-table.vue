<script setup lang="ts">
import { Image } from "@unpic/vue";
import type { TableColumn } from "#ui/types";

const props = defineProps<{
	title?: string;
	uneven?: boolean;
	loading?: boolean;
	stats: {
		stat: string;
		value?: any;
		color?: string;
		valueImage?: {
			src?: string;
			width?: number;
			height?: number;
			class?: string;
		};
		image?: {
			src?: string;
			width?: number;
			height?: number;
			class?: string;
		};
		valueImageClass?: string;
		valueRender?: Component;
	}[];
}>();
</script>

<template>
	<section>
		<div v-if="title" class="rounded-t-md border border-b-0 border-neutral-200 bg-inherit text-center dark:border-neutral-800">
			<h3 class="text-foreground px-4 py-2 text-lg font-semibold">{{ title }}</h3>
		</div>

		<USkeleton v-if="loading" class="h-full w-full rounded-t-none border border-(--ui-border)" />
		<UTable
			v-else
			:ui="{
				thead: 'border-b-0 hidden',
				td: 'whitespace-normal! py-2 px-3',
				tr: `[&_:nth-child(1)]:font-semibold! ${uneven ? 'last:border-border! last:border-b!' : ''}`,
				base: 'bg-inherit divide-y-0',
			}"
			:data="stats"
			:columns="
				[
					{
						accessorKey: 'stat',
						header: 'Stat',
						cell: ({ row }) => {
							return h('div', { class: 'flex flex-row items-center gap-x-2' }, [
								h(Image, {
									alt: row.original.stat,
									src: row.original.image?.src ?? '',
									width: row.original.image?.width ?? 25,
									height: row.original.image?.height ?? 25,
									class: [row.original.image?.class, 'size-[24px] object-scale-down'],
								}),
								h('p', { class: 'text-foreground text-sm font-semibold text-(--ui-text)' }, row.original.stat),
							]);
						},
					},
					{
						accessorKey: 'value',
						header: 'Value',
						cell: ({ row }) => {
							return row.original.valueRender
								? h(row.original.valueRender, {})
								: h(
										'p',
										{ class: [row.original.color ?? '', row.original.valueImage ? 'flex flex-row items-center gap-x-2' : ''] },
										[
											row.original.valueImage
												? h(Image, {
														alt: row.original.stat,
														src: row.original.valueImage.src ?? '',
														width: row.original.valueImage.width ?? 25,
														height: row.original.valueImage.height ?? 25,
														class: [row.original.valueImage.class, 'size-[24px] object-scale-down'],
													})
												: null,
											row.original.value,
										]
									);
						},
					},
				] as TableColumn<(typeof props)['stats'] extends (infer U)[] ? U : never>[]
			"
			class="h-full border border-neutral-200 dark:border-neutral-800"
			:class="[title ? 'rounded-b-md' : 'rounded-md']"
		>
			<template #empty>
				<p class="px-2">Data for this player is not available. Please check back later.</p>
			</template>
		</UTable>
	</section>
</template>
