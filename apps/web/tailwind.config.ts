import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	content: [
		"src/components/**/*.{vue,js,ts}",
		"src/layouts/**/*.vue",
		"src/pages/**/*.vue",
		"src/composables/**/*.{js,ts}",
		"src/plugins/**/*.{js,ts}",
		"src/app.{js,ts,vue}",
		"src/error.{js,ts,vue}",
		"src/content/**/*.md",
	],
	theme: {
		extend: {
			colors: {
				border: "var(--border)",
			},
			fontFamily: {
				sans: ["Inter", ...fontFamily.sans],
			},
		},
	},
} satisfies Partial<Config>;
