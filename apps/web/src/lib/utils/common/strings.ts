export function truncate(str: string, maxLength: number) {
	if (str.length <= maxLength) return str;
	return str.slice(0, maxLength - 3) + "...";
}

export function kebabCaseToNormalCase(string: string) {
	return string.replaceAll("-", " ");
}

export function normalCaseToKebabCase(string: string) {
	return string.replaceAll(" ", "-");
}

export function camelCaseToNormalCase(string: string, capitalizeLetters: boolean = false) {
	return string
		.replaceAll(/(?<g>[A-Z])/g, " $1")
		.replaceAll(/(?<g>\d+)v(?<h>\d+)/g, "$1v$2") // Keep NvN pattern intact
		.replaceAll(/(?<g>\d+)/g, " $1")
		.toLowerCase()
		.trim()
		.replaceAll(/\s+/g, " ")
		.replaceAll(/\b\w/g, (letter) => (capitalizeLetters ? letter.toUpperCase() : letter.toLowerCase()));
}

export function capitalizeLetters(string: string) {
	return string.replaceAll(/\b\w/g, (letter) => letter.toUpperCase());
}

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowercaseFirstLetter(string: string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}

// const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getCountryFlagEmoji(countryCode: string) {
	return (
		[...countryCode.toUpperCase()]
			// eslint-disable-next-line unicorn/prefer-code-point
			.map((char) => String.fromCodePoint(127_397 + char.charCodeAt(0)))
			.reduce((a, b) => `${a}${b}`)
	);
}
