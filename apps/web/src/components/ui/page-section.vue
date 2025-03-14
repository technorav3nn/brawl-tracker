<template>
	<div :class="[config.wrapper, props.class]">
		<div :class="config.container">
			<div :class="config.inner">
				<div v-if="icon || $slots.icon" :class="config.icon.wrapper">
					<slot name="icon">
						<UIcon :name="icon as string" :class="config.icon.base" />
					</slot>
				</div>

				<div>
					<p v-if="title || $slots.title" :class="config.title">
						<slot name="title">
							{{ title }}
						</slot>
					</p>

					<div v-if="description || $slots.description" :class="config.description">
						<slot name="description">
							{{ description }}
						</slot>
					</div>
				</div>
			</div>

			<div v-if="links?.length || $slots.links" :class="config.links">
				<slot name="links">
					<UButton v-for="(link, index) in links" :key="index" v-bind="link" @click="link.click" />
				</slot>
			</div>
		</div>

		<slot />
	</div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { ButtonProps } from "#ui/components/Button.vue";

const props = defineProps({
	icon: {
		type: String,
		default: undefined,
	},
	title: {
		type: String,
		default: undefined,
	},
	description: {
		type: String,
		default: undefined,
	},
	links: {
		type: Array as PropType<(ButtonProps & { click?(...args: any[]): void })[]>,
		default: () => [],
	},
	orientation: {
		type: String as PropType<"horizontal" | "vertical">,
		default: "vertical",
	},
	class: {
		type: [String, Object, Array] as PropType<any>,
		default: undefined,
	},
});

defineOptions({
	inheritAttrs: false,
});

const config = computed(() => {
	const wrapper: string = {
		vertical: "divide-y divide-neutral-200 dark:divide-neutral-800 space-y-6 *:pt-6 first:*:pt-2 mb-6",
		horizontal: "grid lg:grid-cols-3 pt-2 pb-6 items-start first:*:col-span-2 lg:first:*:col-span-1 last:*:col-span-2 gap-6",
	}[props.orientation];

	const container: string = {
		vertical: "flex flex-wrap items-center justify-between gap-4",
		horizontal: "flex lg:flex-col justify-between flex-row flex-wrap gap-4",
	}[props.orientation];

	return {
		wrapper,
		container,
		inner: "flex items-start gap-4",
		title: "text-neutral-900 dark:text-white font-semibold",
		description: "mt-1 text-sm text-neutral-500 dark:text-neutral-400",
		links: "flex flex-wrap items-center gap-1.5",
		icon: {
			wrapper: "inline-flex",
			base: "w-12 h-12 flex-shrink-0 text-neutral-900 dark:text-white",
		},
	};
});
</script>
