import { css, cva } from "$styled-system/css";

export const navbarLink = css({
	textStyle: "md",
	fontWeight: "medium",
	color: "fg.subtle",
	cursor: "pointer",
	display: "inline-flex",
	alignItems: "center",
	gap: "2",
	_hover: {
		color: "fg.muted",
	},
	_currentPage: {
		color: "fg.emphasized",
		_hover: {
			color: "fg.emphasized",
		},
	},
	transitionDuration: "normal",
	transitionProperty: "color, font-weight",
	transitionTimingFunction: "default",
});

export const colorSchemeToggle = cva({
	base: {},
	variants: {
		variant: {
			sun: {
				display: {
					_light: "none",
					_dark: "block",
				},
			},
			moon: {
				display: {
					_light: "block",
					_dark: "none",
				},
			},
		},
	},
});
