export function newFromLength<T extends any[]>(array: T, length: number) {
	// Remove items from the end of the array until it is the length `length` withotu a loop
	array.length = Math.min(array.length, length);
	return array;
}
