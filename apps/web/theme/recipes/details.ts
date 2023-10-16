import { defineSlotRecipe } from "@pandacss/dev";

export const details = defineSlotRecipe({
	className: "details",
	description: "Details element with custom styling",
	base: {
		root: {
			borderWidth: "1px",
			borderColor: "border.emphasized",
			rounded: "l2",
			padding: "0.5em 1em 0",
			marginX: "5",
			_open: {
				padding: "0.5em 1em",
				"& > summary": {
					borderBottomWidth: "1px",
					borderBottomStyle: "solid",
					borderBottomColor: "border.emphasized",
					marginBottom: "0.5em",
				},
			},
		},
		summary: {
			fontWeight: "bold",
			margin: "-0.5em -1em 0",
			padding: "0.5em 1em",
			"::marker": {
				marginRight: "0.5em",
			},
		},
	},
	variants: {
		textAlign: {
			center: {
				root: { textAlign: "center" },
			},
			left: {
				root: { textAlign: "left" },
			},
			right: {
				root: { textAlign: "right" },
			},
		},
	},
	slots: ["root", "summary", "content"],
});
