import process from "node:process";
import { createResolver } from "@nuxt/kit";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
	modules: ["@nuxtjs/color-mode", "@nuxtjs/tailwindcss", "@hypernym/nuxt-font"],
	css: ["$assets/global.css"],
	srcDir: "src/",
	alias: {
		$assets: resolve("./src/assets"),
		$components: resolve("./src/components"),
		$pages: resolve("./src/pages"),
		$layouts: resolve("./src/layouts"),
		$composables: resolve("./src/hooks"),
		$lib: resolve("./src/lib"),
		$: resolve("./src"),
	},
	routeRules: {
		"/": { static: true },
	},
	app: {
		pageTransition: { name: "page", mode: "out-in" },
	},
	runtimeConfig: {
		brawlStarsApiToken: process.env.BRAWL_STARS_API_TOKEN,
	},
	components: {
		dirs: [],
	},
	experimental: {
		typedPages: true,
	},
	devtools: {
		enabled: true,
	},
	font: {
		autoImport: true,
	},
	colorMode: {
		dataValue: "color-scheme",
		classSuffix: "",
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
