const ROMAN_NUMERALS: Record<number, string> = {
	1: "I",
	4: "IV",
	5: "V",
	9: "IX",
	10: "X",
	40: "XL",
	50: "L",
	90: "XC",
	100: "C",
	400: "CD",
	500: "D",
	900: "CM",
	1000: "M",
};

export function numberToRomanNumerals(value: number) {
	let roman = "";
	let newValue = value;

	for (const key of Object.keys(ROMAN_NUMERALS).reverse()) {
		const number = Number.parseInt(key, 10);
		while (newValue >= number) {
			roman += ROMAN_NUMERALS[number];
			newValue -= number;
		}
	}

	return roman;
}
