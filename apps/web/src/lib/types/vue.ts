import type { AllowedComponentProps, Component, FunctionalComponent, VNodeProps } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VueSfcComponentProps<C extends Component> = C extends new (...args: any) => any
	? Omit<InstanceType<C>["$props"], keyof AllowedComponentProps | keyof VNodeProps>
	: never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VueJsxComponentProps<C extends Component> = C extends new (...args: any) => any
	? Omit<InstanceType<C>["props"], keyof AllowedComponentProps | keyof VNodeProps>
	: never;

export type ExtendProps<Props> = RemoveDynamicKeys<
	Required<{
		[key in keyof Props]: {
			required: undefined extends Props[key] ? false : true;
			type: PropType<Props[key]>;
		};
	}>
>;

export type FunctionalComponentProps<T> = T extends FunctionalComponent<infer Props>
	? Props
	: never;

type RemoveDynamicKeys<T> = {
	[K in keyof T as string extends K
		? never
		: K extends number | typeof Symbol.iterator
		? never
		: K]: T[K];
};
