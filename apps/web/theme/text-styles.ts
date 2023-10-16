import { type TextStyles } from "@pandacss/dev";

const defineTextStyles = <T extends TextStyles>(config: T) => config;

const textStyles = defineTextStyles({
	h1: {
		description: "Heading 1",
		value: {
			fontSize: {
				base: "4xl",
				lg: "5xl",
			},
			leading: {
				base: "10",
				lg: "none",
			},
			fontWeight: "extrabold",
			tracking: "tight",
		},
	},
	h2: {
		description: "Heading 2",
		value: {
			fontSize: "3xl",
			leading: "9",
			fontWeight: "semibold",
			tracking: "tight",
		},
	},
	h3: {
		description: "Heading 3",
		value: {
			fontSize: "2xl",
			leading: "8",
			fontWeight: "semibold",
			tracking: "tight",
		},
	},
	h4: {
		description: "Heading 4",
		value: {
			fontSize: "xl",
			leading: "7",
			fontWeight: "semibold",
			tracking: "tight",
		},
	},
	// eslint-disable-next-line id-length
	p: {
		description: "Paragraph",
		value: {
			leading: "7",
		},
	},
	lead: {
		description: "Lead paragraph",
		value: {
			fontSize: "xl",
			leading: "7",
		},
	},
	large: {
		description: "Large text",
		value: {
			fontSize: "lg",
			fontWeight: "semibold",
			leading: "7",
		},
	},
	small: {
		description: "Small text",
		value: {
			fontSize: "sm",
			fontWeight: "medium",
			leading: "none",
		},
	},
	xs: {},
	sm: {},
	md: {},
	lg: {},
	xl: {},
	"2xl": {},
	"3xl": {},
	"4xl": {},
	"5xl": {},
	"6xl": {},
});

textStyles.xs = textStyles.small;
textStyles.sm = {
	...textStyles.p,
	fontSize: "sm",
};
textStyles.md = textStyles.p;
textStyles.lg = textStyles.large;
textStyles.xl = textStyles.h4;
textStyles["2xl"] = textStyles.h3;
textStyles["3xl"] = textStyles.h2;
textStyles["4xl"] = textStyles.h1;
textStyles["5xl"] = {
	description: textStyles.h1.description,
	value: {
		...textStyles.h1.value,
		fontSize: { base: "5xl", lg: "6xl" },
		leading: "13",
	},
};

textStyles["6xl"] = {
	description: textStyles.h1.description,
	value: {
		...textStyles.h1.value,
		fontSize: {
			base: "6xl",
			lg: "7xl",
		},
		leading: "15",
	},
};

export { textStyles };
