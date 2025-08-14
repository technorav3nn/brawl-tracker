import { ELEMENT_NODE, TEXT_NODE, transform } from "ultrahtml";
import sanitize from "ultrahtml/transformers/sanitize";

const ALLOWED_ELEMENTS = [
	"a",
	"p",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"ul",
	"ol",
	"li",
	"strong",
	"em",
	"checkbox",
	"input",
	"s",
	"hr",
	"code",
	"pre",
	"img",
	"iframe",
	"table",
	"thead",
	"tbody",
	"tr",
	"th",
	"td",
	"blockquote",
	"div",
	"label",
	"span",
];

export async function sanitizeHtml(html: string) {
	let characterCount = 0;
	let iframesValid = true;

	const sanitized = await transform(html, [
		sanitize({
			allowElements: ALLOWED_ELEMENTS,
		}),
		(node) => {
			if (node.type === TEXT_NODE) {
				characterCount += node.value.length;
			}

			return node;
		},
		(node) => {
			if (
				node.type === ELEMENT_NODE &&
				node.name === "iframe" &&
				!node.attributes.src?.startsWith("https://www.youtube.com/embed/")
			) {
				iframesValid = false;
			}

			return node;
		},
	]);

	return {
		sanitized,
		characterCount,
		iframesValid,
	};
}
