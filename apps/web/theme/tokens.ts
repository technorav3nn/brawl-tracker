import { defineTokens } from "@pandacss/dev";

export const tokens = defineTokens({
	colors: {
		grayPalette: {
			25: { value: "{colors.zinc.25}" },
			50: { value: "{colors.zinc.50}" },
			100: { value: "{colors.zinc.100}" },
			200: { value: "{colors.zinc.200}" },
			300: { value: "{colors.zinc.300}" },
			400: { value: "{colors.zinc.400}" },
			500: { value: "{colors.zinc.500}" },
			600: { value: "{colors.zinc.600}" },
			700: { value: "{colors.zinc.700}" },
			800: { value: "{colors.zinc.800}" },
			900: { value: "{colors.zinc.900}" },
			950: { value: "{colors.zinc.950}" },
		},
	},
	fonts: {
		inter: {
			value: "Inter, sans-serif",
		},
		"plus-jakarta-sans": {
			value: "var(--font-plus-jakarta), sans-serif",
		},
	},
});
