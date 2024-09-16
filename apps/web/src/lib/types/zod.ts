import type { z } from "zod";

export type ToZod<T extends Record<string, any>> = {
	[K in keyof T]-?: z.ZodType<T[K]>;
};

export type InferZodMap<T extends abstract new (...args: any) => any> = {
	[k in keyof Partial<InstanceType<T>>]?: unknown;
};
