export function objectToFormData(obj: Record<string, any>): FormData {
	const formData = new FormData();
	for (const key in obj) {
		if (obj[key] !== undefined) {
			formData.append(key, obj[key]);
		}
	}

	return formData;
}

export function pick<T extends Record<string, any>>(
	obj: T,
	keys: T extends Record<string, any> ? (keyof T)[] : never
): Record<string, any> {
	const result: Record<string, any> = {};
	for (const key of keys) {
		if (obj[key] !== undefined) {
			result[key] = obj[key];
		}
	}

	return result;
}

export function omit<T extends Record<string, any>>(obj: T, keys: string[]): Record<string, any> {
	const result: Record<string, any> = {};
	for (const key in obj) {
		if (!keys.includes(key)) {
			result[key] = obj[key];
		}
	}

	return result;
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
