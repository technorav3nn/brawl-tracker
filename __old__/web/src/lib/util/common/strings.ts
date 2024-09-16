/**
 * Uppercase the first character of a string
 *
 * @param str - The string to uppercase the first character of
 */
export function upperFirstCharacter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
