import { defineRecipe } from "@pandacss/dev";

const h1 = defineRecipe({
	className: "h1",
	description: "Typography - h1 style",
	base: {
		textStyle: "h1",
		scrollMargin: "20",
	},
});

const h2 = defineRecipe({
	className: "h2",
	description: "Typography - h2 style",
	base: {
		textStyle: "h2",
		scrollMargin: "20",
		borderBottom: "base",
		pb: "2",
		transition: "colors",
	},
});

const h3 = defineRecipe({
	className: "h3",
	description: "Typography - h3 style",
	base: {
		textStyle: "h3",
		scrollMargin: "20",
	},
});

const h4 = defineRecipe({
	className: "h4",
	description: "Typography - h4 style",
	base: {
		textStyle: "h4",
		scrollMargin: "20",
	},
});

const p = defineRecipe({
	className: "p",
	description: "Typography - p style",
	base: {
		textStyle: "p",
		"&:not(:first-child)": {
			mt: "6",
		},
	},
});

const lead = defineRecipe({
	className: "lead",
	description: "Typography - Lead style",
	base: {
		textStyle: "lead",
		color: "fg.subtle",
	},
});

const large = defineRecipe({
	className: "large",
	description: "Typography - Large style",
	base: {
		textStyle: "large",
	},
});

const small = defineRecipe({
	className: "small",
	description: "Typography - Small style",
	base: {
		textStyle: "small",
	},
});

const muted = defineRecipe({
	className: "muted",
	description: "Typography - Muted style",
	base: {
		textStyle: "sm",
		color: "fg.subtle",
	},
});

const link = defineRecipe({
	className: "link",
	description: "Typography - Link style",
	base: {
		color: "primary",
		fontWeight: "medium",
		textDecoration: "underline",
		textUnderlineOffset: "4px",
		cursor: "pointer",
	},
});

export const typographyRecipes = {
	h1,
	h2,
	h3,
	h4,
	p,
	lead,
	large,
	small,
	muted,
	link,
};
