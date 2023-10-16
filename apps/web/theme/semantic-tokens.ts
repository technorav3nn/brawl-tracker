import { defineSemanticTokens } from "@pandacss/dev";

export const semanticTokens = defineSemanticTokens({
	colors: {
		accent: {
			default: { value: { base: "{colors.sky.600}", _dark: "{colors.sky.300}" } },
			emphasized: { value: { base: "{colors.sky.700}", _dark: "{colors.sky.400}" } },
			fg: { value: { base: "{colors.white}", _dark: "{colors.gray-palette.950}" } },
		},
		border: {
			accent: { value: { base: "{colors.sky.500}", _dark: "{colors.sky.500}" } },
		},
	},
	radii: {
		l1: { value: "{radii.sm}" },
		l2: { value: "{radii.md}" },
		l3: { value: "{radii.lg}" },
		radius: { value: "0.5rem" },
	},
	lineHeights: {
		3: { value: ".75rem" },
		4: { value: "1rem" },
		5: { value: "1.25rem" },
		6: { value: "1.5rem" },
		7: { value: "1.75rem" },
		8: { value: "2rem" },
		9: { value: "2.25rem" },
		10: { value: "2.5rem" },
		11: { value: "2.75rem" },
		12: { value: "3rem" },
		13: { value: "3.25rem" },
		14: { value: "3.5rem" },
		15: { value: "3.75rem" },
		none: { value: "1" },
		tight: { value: "1.25" },
		snug: { value: "1.375" },
		normal: { value: "1.5" },
		relaxed: { value: "1.625" },
		loose: { value: "2" },
	},
	borders: {
		base: { value: "1px solid {colors.border.default}" },
		primary: { value: "1px solid {colors.border.accent}" },
	},
});
