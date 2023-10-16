// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferRecipeSlots<T extends { (...args: any[]): any; raw: (...args: any[]) => any }> =
	ReturnType<T>;
