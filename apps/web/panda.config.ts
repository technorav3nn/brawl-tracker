import { defineConfig } from "@pandacss/dev";
import { conditions } from "./theme/conditions";
import { keyframes } from "./theme/keyframes";
import { details } from "./theme/recipes/details";
import { typographyRecipes } from "./theme/recipes/typography";
import { semanticTokens } from "./theme/semantic-tokens";
import { textStyles } from "./theme/text-styles";
import { tokens } from "./theme/tokens";
import { utilities } from "./theme/utilities";

export default defineConfig({
	preflight: true,
	include: [
		"./src/components/**/*.{js,jsx,ts,tsx,vue}",
		"./src/pages/**/*.{js,jsx,ts,tsx,vue}",
		"./src/layouts/**/*.{js,jsx,ts,tsx,vue}",
		"./src/app.vue",
	],
	exclude: [],
	presets: ["@pandacss/dev/presets", "@park-ui/presets"],
	staticCss: {
		recipes: {
			button: ["*"],
		},
	},
	jsxFramework: "vue",
	theme: {
		extend: {
			recipes: {
				...typographyRecipes,
				details,
			},
			tokens,
			semanticTokens,
			keyframes,
			textStyles,
		},
	},
	globalCss: {
		extend: {
			pre: {
				fontFamily: "var(--font-code)",
				overflowX: "auto",
				fontSize: "14px !important",
				"--shiki-color-text": "white",
				"--shiki-color-background": "colors.grayPalette.800",
				"--shiki-token-constant": "colors.grayPalette.300",
				"--shiki-token-string": "colors.grayPalette.400",
				"--shiki-token-comment": "colors.grayPalette.400",
				"--shiki-token-keyword": "colors.accent.emphasized",
				"--shiki-token-parameter": "colors.grayPalette.400",
				"--shiki-token-function": "colors.red.300",
				"--shiki-token-string-expression": "colors.grayPalette.400",
				"--shiki-token-punctuation": "colors.grayPalette.400",
				"--shiki-token-link": "colors.grayPalette.400",
				"& code": {
					fontFamily: "inherit",
				},
			},
		},
	},
	conditions,
	utilities,
});
