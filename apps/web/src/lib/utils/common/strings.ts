export function kebabCaseToNormalCase(string: string) {
	return string.replaceAll("-", " ");
}

export function capitalizeLetters(string: string) {
	return string.replaceAll(/\b\w/g, (letter) => letter.toUpperCase());
}

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
