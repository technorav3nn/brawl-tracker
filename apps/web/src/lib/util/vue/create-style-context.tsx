// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { mergeProps } from "vue";
// import type {
// 	AllowedComponentProps,
// 	ComponentCustomProps,
// 	IntrinsicElementAttributes,
// 	VNodeProps,
// } from "vue";
// import type { HTMLStyledProps, Styled } from "$styled-system/types/jsx";

// type AnyProps = Record<string, unknown>;
// interface AnyRecipe {
// 	(props?: AnyProps): Record<string, string>;
// 	splitVariantProps: (props: AnyProps) => any;
// }

// export type DOMElements = keyof IntrinsicElementAttributes;
// export type ElementType = ReturnType<Styled>;

// export interface ComponentWithAs<
// 	Component extends ElementType,
// 	P extends Record<string, unknown> = Record<never, never>,
// > {
// 	new (): {
// 		$props: AllowedComponentProps &
// 			ComponentCustomProps &
// 			VNodeProps &
// 			ExtractPropTypes<Component> &
// 			(Component extends DOMElements
// 				? IntrinsicElementAttributes[Component]
// 				: Record<never, never>) &
// 			HTMLStyledProps<Component> &
// 			P & {
// 				as?: ElementType;
// 			};
// 	};
// }

// export function createStyleContext<R extends AnyRecipe, Component extends ElementType>(recipe: R) {
// 	const withProvider = (Dynamic: Component, part?: string) => {
// 		return defineComponent({
// 			setup(props, { slots, attrs }) {
// 				const splittedProps = computed(() => {
// 					return recipe.splitVariantProps(props);
// 				});
// 				const styles = computed(() => {
// 					const [variantProps] = splittedProps.value;
// 					return recipe(variantProps);
// 				});

// 				provide("styles", styles);
// 				return () =>
// 					h(
// 						Dynamic as any,
// 						{ ...mergeProps(attrs, props, { class: styles.value[part ?? ""] }) },
// 						{
// 							default: () => slots.default?.(),
// 						}
// 					);
// 			},
// 		}) as ComponentWithAs<Component>;
// 	};

// 	const withContext = (Dynamic: Component, part?: string) => {
// 		return defineComponent({
// 			setup(props, { slots, attrs }) {
// 				const styles = inject<ComputedRef<Record<string, string>>>("styles");
// 				return () =>
// 					h(
// 						Dynamic as any,
// 						{ ...mergeProps(attrs, props, { class: styles?.value[part ?? ""] }) },
// 						{
// 							default: () => slots.default && slots.default(),
// 						}
// 					);
// 			},
// 		}) as ComponentWithAs<Component>;
// 	};

// 	return {
// 		withProvider,
// 		withContext,
// 	};
// }
