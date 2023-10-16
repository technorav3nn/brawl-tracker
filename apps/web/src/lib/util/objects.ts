/**
 * Creates a singleton object, which is a global object that is only created once
 * @param name Name of the singleton
 * @param value Value of the singleton
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
 * @param cls Class to turn into a pojo
 */
export function serdeClass<T>(cls: T) {
	return { ...cls } as T;
}
