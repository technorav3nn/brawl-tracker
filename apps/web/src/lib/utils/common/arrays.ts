export function newFromLength<T extends any[]>(array: T, length: number) {
	// Remove items from the end of the array until it is the length `length` withotu a loop
	array.length = Math.min(array.length, length);
	return array;
}

/**
 * Splits specific part of an string
 *
 * @param inputString - The string to split
 * @param splitArray - The parts of the string to split
 * @returns The split array
 */
export function splitByArray<T extends any[]>(inputString: string, splitArray: T) {
	return splitArray.reduce(
		(result: T, splitString) => {
			return result.reduce((newResult, str) => {
				const parts = str.split(splitString);
				for (let i = 0; i < parts.length - 1; i++) {
					newResult.push(parts[i], splitString);
				}

				newResult.push(parts[parts.length - 1]);
				return newResult;
			}, []);
		},
		[inputString]
	);
}

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) => {
	return list.reduce(
		(previous, currentItem) => {
			const group = getKey(currentItem);
			if (!previous[group]) previous[group] = [];
			previous[group].push(currentItem);
			return previous;
		},
		 
		{} as Record<K, T[]>
	);
};

export function chunk<T>(array: T[], size: number) {
	const result = [];
	for (let i = 0; i < array.length; i += size) {
		result.push(array.slice(i, i + size));
	}

	return result;
}
