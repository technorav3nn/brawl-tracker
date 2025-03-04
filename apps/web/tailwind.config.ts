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
		"src/lib/utils/brawl-stars/color-tags.ts",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...fontFamily.sans],
				brawlstars: ["Lilita One", "Inter", ...fontFamily.sans],
			},
			colors: {
				border: "var(--color-border)",
			},
		},
	},
} satisfies Partial<Config>;
