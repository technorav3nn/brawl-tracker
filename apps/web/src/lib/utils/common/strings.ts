export function kebabCaseToNormalCase(string: string) {
	return string.replaceAll("-", " ");
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
