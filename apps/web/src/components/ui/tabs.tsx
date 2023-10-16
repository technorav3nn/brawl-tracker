import {
	TabsRoot as TabsRootPrimitive,
	TabsContent as TabsContentPrimitive,
	TabsList as TabsListPrimitive,
	TabsTrigger as TabsTriggerPrimitive,
	type TabsRootProps,
	type TabsTriggerProps,
	type TabsContentProps,
} from "radix-vue";
import type { InferRecipeSlots } from "$lib/types/slot-recipes";
import type { ExtendProps } from "$lib/types/vue";
import { cx, css } from "$styled-system/css";
import { tabs, type TabsVariantProps } from "$styled-system/recipes";
import { token } from "$styled-system/tokens";

const CONTEXT_NAME = Symbol("tabs symbol");

function getRecipeContext() {
	return inject<InferRecipeSlots<typeof tabs>>(CONTEXT_NAME);
}

function setRecipeContext(props: TabsVariantProps) {
	return provide(CONTEXT_NAME, tabs(props));
}

export const Tabs = defineComponent({
	props: {} as ExtendProps<TabsRootProps & TabsVariantProps>,
	setup(props, { slots }) {
		setRecipeContext(props);
		// have to use hyperscript, jsx was bugging out
		return () => h(TabsRootPrimitive, {}, { default: () => slots.default?.() });
	},
});

export const TabsList = defineComponent({
	setup(_props, { slots }) {
		const classes = getRecipeContext();
		return () => (
			<TabsListPrimitive class={classes?.list} {..._props}>
				{slots.default?.()}
			</TabsListPrimitive>
		);
	},
});

export const TabsTrigger = defineComponent({
	props: {} as ExtendProps<TabsTriggerProps>,
	setup(_props, { slots }) {
		const classes = getRecipeContext();
		return () => (
			<TabsTriggerPrimitive
				class={cx(
					classes?.trigger,
					css({
						"&[data-state='active']": { shadow: "inset 0 -2px 0 0 var(--color)" },
					})
				)}
				style={{ "--color": token("colors.accent.default") }}
				{..._props}
			>
				{slots.default?.()}
			</TabsTriggerPrimitive>
		);
	},
});

export const TabContent = defineComponent({
	props: {} as ExtendProps<TabsContentProps>,
	setup(_props, { slots }) {
		const classes = getRecipeContext();
		return () => (
			<TabsContentPrimitive class={classes?.content} {..._props}>
				{slots.default?.()}
			</TabsContentPrimitive>
		);
	},
});
