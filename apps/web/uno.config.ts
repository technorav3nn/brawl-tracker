/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable prefer-named-capture-group */
import { defineConfig, presetIcons, presetUno } from "unocss";
import type { Theme } from "unocss/preset-mini";
import { presetShadcn } from "./theme.config";

export default defineConfig({
	presets: [presetUno(), presetIcons(), presetShadcn()],
	content: {
		pipeline: {
			include: ["./**/*.{jsx,tsx,vue,md,html,svelte,astro,js,ts}"],
		},
	},
	blocklist: [/^m\d+$/],
	shortcuts: [
		{
			"flex-center": "flex justify-center items-center",
			"flex-col-center": "flex flex-col justify-center items-center",
		},
	],
	preflights: [
		{
			getCSS: () => `
			:root {
				--background: 0, 0%, 100%;
				--foreground: 240, 10%, 3.9%;
				--card: 0, 0%, 100%;
				--card-foreground: 240, 10%, 3.9%;
				--popover: 0, 0%, 100%;
				--popover-foreground: 240, 10%, 3.9%;
				--primary: 240, 5.9%, 10%;
				--primary-foreground: 0, 0%, 98%;
				--secondary: 240, 4.8%, 95.9%;
				--secondary-foreground: 240, 5.9%, 10%;
				--muted: 240, 4.8%, 95.9%;
				--muted-foreground: 240, 3.8%, 46.1%;
				--accent: 240, 4.8%, 95.9%;
				--accent-foreground: 240, 5.9%, 10%;
				--destructive: 0, 84.2%, 60.2%;
				--destructive-foreground: 0, 0%, 98%;
				--border: 240, 5.9%, 90%;
				--input: 240, 5.9%, 90%;
				--ring: 240, 5.9%, 10%;
				--radius: 0.5rem;
			}
			
			.dark {
				--background: 240, 10%, 3.9%;
				--foreground: 0, 0%, 98%;
				--card: 240, 10%, 3.9%;
				--card-foreground: 0, 0%, 98%;
				--popover: 240, 10%, 3.9%;
				--popover-foreground: 0, 0%, 98%;
				--primary: 0, 0%, 98%;
				--primary-foreground: 240, 5.9%, 10%;
				--secondary: 240, 3.7%, 15.9%;
				--secondary-foreground: 0, 0%, 98%;
				--muted: 240, 3.7%, 15.9%;
				--muted-foreground: 240, 5%, 64.9%;
				--accent: 240, 3.7%, 15.9%;
				--accent-foreground: 0, 0%, 98%;
				--destructive: 0, 62.8%, 30.6%;
				--destructive-foreground: 0, 0%, 98%;
				--border: 240, 3.7%, 15.9%;
				--input: 240, 3.7%, 15.9%;
				--ring: 240, 4.9%, 83.9%;
			}
			
      `,
		},
	],
	theme: {
		colors: {
			border: "hsl(var(--border))",
			input: "hsl(var(--input))",
			ring: "hsl(var(--ring))",
			background: "hsl(var(--background))",
			foreground: "hsl(var(--foreground))",
			primary: {
				DEFAULT: "hsl(var(--primary))",
				foreground: "hsl(var(--primary-foreground))",
			},
			secondary: {
				DEFAULT: "hsl(var(--secondary))",
				foreground: "hsl(var(--secondary-foreground))",
			},
			destructive: {
				DEFAULT: "hsl(var(--destructive))",
				foreground: "hsl(var(--destructive-foreground))",
			},
			muted: {
				DEFAULT: "hsl(var(--muted))",
				foreground: "hsl(var(--muted-foreground))",
			},
			accent: {
				DEFAULT: "hsl(var(--accent))",
				foreground: "hsl(var(--accent-foreground))",
			},
			popover: {
				DEFAULT: "hsl(var(--popover))",
				foreground: "hsl(var(--popover-foreground))",
			},
			card: {
				DEFAULT: "hsl(var(--card))",
				foreground: "hsl(var(--card-foreground))",
			},
		},
		borderRadius: {
			lg: `var(--radius)`,
			md: `calc(var(--radius) - 2px)`,
			sm: "calc(var(--radius) - 4px)",
		},
		fontFamily: {
			sans: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
		},
	} as Theme,
});
