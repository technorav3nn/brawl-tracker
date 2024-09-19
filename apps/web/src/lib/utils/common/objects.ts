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

export function omit<T extends Record<string, any>>(
	obj: T,
	keys: T extends Record<string, any> ? (keyof T)[] : never
): Record<string, any> {
	const result: Record<string, any> = {};
	for (const key in obj) {
		if (!keys.includes(key)) {
			result[key] = obj[key];
		}
	}

	return result;
}
