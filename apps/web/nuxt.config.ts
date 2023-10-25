import process from "node:process";
import { createResolver } from "@nuxt/kit";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
				modules: ["@nuxtjs/color-mode", "@nuxtjs/tailwindcss", "@hypernym/nuxt-font", "@vueuse/nuxt", "@nuxt/ui"],
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
				components: [
								{
												path: "$components/ui",
												// this is required else Nuxt will autoImport `.ts` file
												extensions: [".vue"],
												// prefix for your components, eg: UiButton
												prefix: "Ui",
								},
								{
												path: "$components",
												extensions: ["vue"],
								},
				],
				css: ["$assets/css/tailwind.css", "$assets/css/global.css"],
				routeRules: {
								"/": { static: true },
				},
				app: {
								pageTransition: { name: "page", mode: "out-in" },
				},
				runtimeConfig: {
								brawlStarsApiToken: process.env.BRAWL_STARS_API_TOKEN,
				},
				experimental: {
								typedPages: true,
								componentIslands: true,
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