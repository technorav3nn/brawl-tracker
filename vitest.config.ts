import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		exclude: ["**/node_modules", "**/dist", ".idea", ".git", ".cache", ".yarn"],
		passWithNoTests: true,
		coverage: {
			enabled: true,
			reporter: ["text", "json-summary", "json"],
			exclude: [
				// All ts files that only contain types, due to ALL
				"**/*.{interface,type,d}.ts",
				"**/{interfaces,types}/*.ts",
				// All index files that *should* only contain exports from other files
				"**/index.{js,ts}",
				// All exports files that make subpackages available as submodules
				"**/exports/*.{js,ts}",
				// Config files
				"**/**{config}.{js,ts}",
			],
		},
	},
});
