import process from "node:process";
import { createResolver } from "@nuxt/kit";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
	nitro: {
		preset: "vercel",
	},
	routeRules: {},
	modules: [
		"@nuxt/image",
		"@nuxtjs/color-mode",
		"@nuxtjs/tailwindcss",
		"@hypernym/nuxt-font",
		"@vueuse/nuxt",
		"@vite-pwa/nuxt",
		"@pinia/nuxt",
		"@formkit/auto-animate/nuxt",
		"@vee-validate/nuxt",
		"nuxt-time",
	],
	srcDir: "src/",
	app: {
		head: {
			// eslint-disable-next-line unicorn/text-encoding-identifier-case
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			title: "BrawlTrack",
			htmlAttrs: { lang: "en" },
			titleTemplate: (title) => (title ? `${title} - BrawlTrack` : "BrawlTrack"),
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ name: "theme-color", content: "#000000" },
				{
					name: "description",
					content: "BrawlTrack is a website that allows you to track your Brawl Stars profile.",
				},
				{ name: "og:title", content: "BrawlTrack" },
				{
					name: "og:description",
					content: "BrawlTrack is a website that allows you to track your Brawl Stars profile.",
				},
				{
					name: "keywords",
					content: "brawl stars, brawl, stars, brawltrack, brawl track, brawl stats",
				},
			],
		},
	},
	experimental: {
		typedPages: true,
		asyncContext: true,
	},
	image: {
		domains: [
			"cdn-old.brawlify.com",
			"cdn-fankit.brawlify.com",
			"cdn.deathblows.tech",
			"images.unsplash.com",
			"github.com",
		],
	},
	devtools: {
		enabled: true,
	},
	font: {
		autoImport: true,
	},
	colorMode: {
		classSuffix: "",
		preference: "system",
		fallback: "dark",
	},
	veeValidate: {
		// disable or enable auto imports
		autoImports: true,
		// Use different names for components
		componentNames: {
			Form: "VeeForm",
			Field: "VeeField",
			FieldArray: "VeeFieldArray",
			ErrorMessage: "VeeErrorMessage",
		},
	},
	pwa: {
		registerType: "autoUpdate",
		manifest: {
			name: "BrawlTrack",
			short_name: "BrawlTrack",
			theme_color: "#f3a812",
		},
		workbox: {
			globPatterns: ["**/*.{js,css,html,png,svg,ico,woff2}"],
			navigateFallback: null,
		},
		client: {
			installPrompt: true,
			periodicSyncForUpdates: 20,
		},
		devOptions: {
			enabled: false,
			type: "module",
		},
	},
	alias: {
		$assets: resolve("./src/assets"),
		$components: resolve("./src/components"),
		$pages: resolve("./src/pages"),
		$layouts: resolve("./src/layouts"),
		$server: resolve("./src/server"),
		$composables: resolve("./src/hooks"),
		$lib: resolve("./src/lib"),
		$: resolve("./src"),
	},
	components: [
		{
			path: "$components/ui",
			extensions: [".vue"],
			prefix: "Ui",
		},
		{
			path: "$components",
			extensions: ["vue"],
		},
		{ path: "$components/features", extensions: [".vue"], prefix: "" },
	],
	css: ["$assets/css/tailwind.css", "$assets/css/global.css"],
	runtimeConfig: {
		brawlStarsApiToken: process.env.BRAWL_STARS_API_TOKEN,
	},
	hooks: {
		"prepare:types": ({ tsConfig }) => {
			const aliasesToRemoveFromAutocomplete = ["~~", "~~/*", "@@", "@@/*", "@/*", "@", "~/", "~/*"];
			for (const alias of aliasesToRemoveFromAutocomplete) {
				if (tsConfig.compilerOptions?.paths[alias]) {
					// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
					delete tsConfig.compilerOptions!.paths[alias];
				}
			}
		},
	},
});
