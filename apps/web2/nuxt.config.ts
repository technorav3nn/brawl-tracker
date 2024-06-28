import { createResolver } from "@nuxt/kit";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
	extends: ["@nuxt/ui-pro"],
	modules: ["@nuxt/ui", "@nuxt/devtools", "@nuxt/fonts", "@nuxt/image", "@pinia/nuxt", "@nuxt/content"],
	// srcDir: "src/app",
	// serverDir: "src/server",
	srcDir: "src",
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},
	ui: {
		icons: ["heroicons", "simple-icons", "tabler", "lucide"],
	},
	uiPro: {
		routerOptions: false,
	},
	fonts: {
		defaults: {
			preload: true,
		},
	},
	app: {
		head: {
			// eslint-disable-next-line unicorn/text-encoding-identifier-case
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			title: "BrawlTrack",
			htmlAttrs: { lang: "en" },
			titleTemplate: "%s | BrawlTrack",
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ name: "theme-color", content: "#000000" },
				{
					name: "description",
					content: "BrawlTrack is a website that allows you to track your Brawl Stars profile.",
				},
				// @ts-expect-error - Og:title does work
				{ name: "og:title", content: "BrawlTrack" },
				{
					// @ts-expect-error - Og:description does work
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
			"brawlstars.inbox.supercell.com",
		],
		provider: "ipx",
	},
	tailwindcss: {
		exposeConfig: true,
	},
	css: ["~/assets/css/tailwind.css", "~/assets/css/global.css"],
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
	components: [{ path: "$components/features", extensions: [".vue"], prefix: "" }, "$components"],
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
