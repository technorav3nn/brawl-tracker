import process from "node:process";
import { defineConfig } from "vitest/config";
import GithubActionsReporter from "vitest-github-actions-reporter";

export const configShared = defineConfig({
	test: {
		reporters: process.env.GITHUB_ACTIONS ? ["default", new GithubActionsReporter()] : "default",
		exclude: ["**/node_modules", "**/dist", ".idea", ".git", ".cache", ".yarn"],
		passWithNoTests: true,
		coverage: {
			enabled: true,
			reporter: ["text", "json-summary", "json", "html"],
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

export default defineConfig(configShared);
