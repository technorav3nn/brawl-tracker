import { createResolver } from "@nuxt/kit";
// import { isDevelopment } from "std-env";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
	extends: ["@nuxt/ui-pro"],
	modules: [
		"@nuxt/devtools",
		"@nuxt/fonts",
		"@nuxt/image",
		"@nuxt/ui",
		"@nuxt/content",
		"@nuxtjs/turnstile",
		"@pinia/nuxt",
		"@vueuse/nuxt",
		"nuxt-time",
		"nuxt-appwrite",
	],
	srcDir: "src/",
	devtools: {
		enabled: true,
	},
	routeRules: {},
	fonts: {
		defaults: {
			preload: true,
		},
	},
	turnstile: {
		siteKey: "0x4AAAAAAA_43EZEMfkIqXqY",
	},
	app: {
		head: {
			htmlAttrs: { lang: "en" },
			meta: [
				{ name: "theme-color", content: "#000000" },
				{ name: "keywords", content: "brawl stars, brawl, stars, brawltrack, brawl track, brawl stats" },
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
			"cdn.id.supercell.com",
		],
		alias: {
			cdn: "https://cdn.deathblows.xyz",
		},
		screens: {
			300: 300,
			600: 600,
		},
	},
	colorMode: {
		fallback: "dark",
	},
	icon: {
		customCollections: [
			{
				prefix: "local",
				dir: "./src/assets/icons",
				height: 24,
				width: 24,
			},
		],
	},
	// sentry: {
	// 	autoInjectServerSentry: "top-level-import",
	// 	sourceMapsUploadOptions: {
	// 		org: "technorav3nn",
	// 		project: "javascript-nuxt",
	// 		authToken: process.env.NUXT_SENTRY_AUTH_TOKEN,
	// 	},
	// },
	runtimeConfig: {
		appwriteApiToken: "",
		databaseUrl: "",
		brawlStarsApiToken: "",
		discord: {
			clientId: "",
			clientSecret: "",
		},
		authOrigin: "https://brawl-tracker-pr-1-web.vercel.app",
		apiEncryptionSecret: "",
		appwriteEndpoint: "https://cloud.appwrite.io/v1",
		appwriteProjectId: "6786db24001e31cc452a",
		scidAccountToken: "",
		// not private, don't worry im not leaking anything
		scidAccountId: "85-0e066b52-b348-4256-b6c1-4f12a18f54d9",
		public: {
			sentryDsn: "https://76fedfafe72ede2cdf24b27f409a6e62@o4508064842514432.ingest.us.sentry.io/4508064854245376",
		},
		turnstile: {
			// This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
			// environment variable.
			secretKey: "",
		},
	},
	appwrite: {
		endpoint: "https://cloud.appwrite.io/v1",
		project: "6786db24001e31cc452a",
	},
	nitro: {
		preset: "",
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
