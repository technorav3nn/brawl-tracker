/**
 * Creates a singleton object, which is a global object that is only created once
 *
 * @param name - Name of the singleton
 * @param value - Value of the singleton
 * @returns The singleton
 */
export function singleton<T>(name: string, value: T) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const storage = globalThis as any;
	storage.__singletons ??= {};
	storage.__singletons[name] ??= value;
	return storage.__singletons[name] as T;
}
