/* eslint-disable vue/one-component-per-file */
import {
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogRoot,
	type DialogRootProps,
	DialogTitle,
	DialogTrigger,
	type DialogTriggerProps,
} from "radix-vue";
import { Teleport } from "vue";
import type { InferRecipeSlots } from "../../lib/types/slot-recipes";
import type { ExtendProps } from "../../lib/types/vue";
import type { DrawerVariantProps } from "$styled-system/recipes";
import { drawer } from "$styled-system/recipes";

const CONTEXT_NAME = Symbol("drawer symbol");

function getMenuRecipeContext() {
	return inject<InferRecipeSlots<typeof drawer>>(CONTEXT_NAME);
}

function setMenuRecipeContext(props: DrawerVariantProps) {
	return provide(CONTEXT_NAME, drawer(props));
}

export const Drawer = defineComponent({
	props: {} as ExtendProps<DialogRootProps & DrawerVariantProps>,
	setup(props, { slots }) {
		setMenuRecipeContext(props);
		// have to use hyperscript, jsx was bugging out
		return () => h(DialogRoot, {}, { default: () => slots.default?.() });
	},
});

export const DrawerTrigger = defineComponent({
	props: {} as ExtendProps<DialogTriggerProps>,
	setup(props, { slots }) {
		return () => <DialogTrigger {...props}>{slots.default?.()}</DialogTrigger>;
	},
});

export const DrawerOverlay = defineComponent({
	setup(_props, { slots }) {
		const classes = getMenuRecipeContext();
		return () => (
			<DialogOverlay class={classes?.backdrop} {..._props}>
				{slots.default?.()}
			</DialogOverlay>
		);
	},
});

export const DrawerContent = defineComponent({
	inheritAttrs: false,
	setup(_props, { slots }) {
		const classes = getMenuRecipeContext();
		return () => (
			<Teleport to="body">
				<div class={classes?.container}>
					<DialogContent class={classes?.content}>{slots.default?.()}</DialogContent>
				</div>
			</Teleport>
		);
	},
});

export const DrawerTitle = defineComponent({
	setup(_props, { slots }) {
		const classes = getMenuRecipeContext();
		return () => <DialogTitle class={classes?.title}>{slots.default?.()}</DialogTitle>;
	},
});

export const DrawerDescription = defineComponent({
	setup(_props, { slots }) {
		const classes = getMenuRecipeContext();
		return () => <DialogDescription class={classes?.description}>{slots.default?.()}</DialogDescription>;
	},
});
