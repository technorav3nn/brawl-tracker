/**
 * Creates a singleton object, which is a global object that is only created once
 *
 * @param name - Name of the singleton
 * @param value - Value of the singleton
 * @returns The singleton
 */
export function singleton<T>(name: string, value: T) {
	if (process.server) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const storage = globalThis as any;
		storage.__singletons ??= {};
		storage.__singletons[name] ??= value;
		return storage.__singletons[name] as T;
	}
}

/**
 * Turns a class into a pojo that can be serialzed with devalue
 *
 * @param cls - Class to turn into a pojo
 * @returns The pojo serialized
 */
export function serdeClass<T>(cls: T) {
	return { ...cls } as T;
}

export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
/**
 * Simple Object.entries that is typed
 *
 * @param obj - Object to get entries from
 * @returns The entries of the object
 */
export function typedObjectEntries<T extends object>(obj: T): Entries<T>[] {
	return Object.entries(obj) as any;
}
