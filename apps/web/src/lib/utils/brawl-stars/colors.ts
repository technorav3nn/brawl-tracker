export interface ParsedColor {
	insideText: string;
	color: string;
}

const COLOR_TO_TAILWIND_COLOR: Record<string, string> = {
	c0: "text-black",
	c1: "text-white",
	c2: "text-red-300",
	c3: "text-green-400",
	c4: "text-blue-500",
	c6: "text-pink-500",
	c7: "text-yellow-400",
	c10: "text-white",
	default: "text-white",
};

/**
 * Parses a color tag from a string and gets the string inside as well as the color
 *
 * @param text - The test with the color tag wrapped around it
 */
export function parseColorTag(text: string): ParsedColor {
	// Example: <c1>text</c>
	const colorTag = /<c(?<text>\d+)>/.exec(text);
	if (!colorTag) return { insideText: text, color: "text-white" };
	const color = colorTag.groups?.text;
	const insideText = text.replace(/<c\d+>/, "").replace("</c>", "");

	return { insideText, color: COLOR_TO_TAILWIND_COLOR[`c${color}`] ?? COLOR_TO_TAILWIND_COLOR.default };
}

export function convertHexToHexColor(hex: string) {
	// 0xffcb5aff -> #ffcb5a
	return `#${hex.slice(2, 8)}`;
}
