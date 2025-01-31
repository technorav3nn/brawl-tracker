import { createResolver } from "@nuxt/kit";
// import { isDevelopment } from "std-env";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
	extends: ["@nuxt/ui-pro"],
	modules: [
		"@nuxt/ui",
		"@nuxt/devtools",
		"@nuxt/fonts",
		"@nuxt/image",
		"@nuxt/eslint",
		"@pinia/nuxt",
		"@nuxt/content",
		"@vueuse/nuxt",
		"@sentry/nuxt/module",
		"nuxt-time",
	],
	srcDir: "src/",
	devtools: {
		enabled: true,
		timeline: {
			enabled: true,
		},
	},
	content: {
		database: {
			type: "postgres",
			url: process.env.POSTGRES_URL!,
		},
	},
	eslint: {
		config: {
			standalone: false,
		},
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
			"cdn.deathblows.xyz",
			"images.unsplash.com",
			"github.com",
			"brawlstars.inbox.supercell.com",
			"cdn.brawlify.com",
		],
		alias: {
			cdn: "https://cdn.deathblows.xyz",
		},
	},
	tailwindcss: {
		exposeConfig: true,
	},
	sentry: {
		sourceMapsUploadOptions: {
			org: "technorav3nn",
			project: "javascript-nuxt",
			authToken: process.env.SENTRY_AUTH_TOKEN,
		},
	},
	runtimeConfig: {
		databaseUrl: "",
		brawlStarsApiToken: "",
		discord: {
			clientId: "",
			clientSecret: "",
		},
		authOrigin: "https://brawl-tracker-pr-1-web.vercel.app",
		apiEncryptionSecret: "",
		public: {
			sentryDsn: "",
		},
	},
	nitro: {
		storage: {
			kv: {
				driver: "vercelKV",
			},
		},
		preset: "vercel",
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
	compatibilityDate: "2024-09-03",
});
