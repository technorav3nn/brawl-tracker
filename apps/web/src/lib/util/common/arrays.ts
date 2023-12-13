export function newFromLength<T extends any[]>(array: T, length: number) {
	// Remove items from the end of the array until it is the length `length` withotu a loop
	array.length = Math.min(array.length, length);
	return array;
}

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) => {
	return list.reduce(
		(previous, currentItem) => {
			const group = getKey(currentItem);
			if (!previous[group]) previous[group] = [];
			previous[group].push(currentItem);
			return previous;
		},
		// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
		{} as Record<K, T[]>
	);
};
