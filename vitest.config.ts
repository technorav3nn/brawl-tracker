import process from "node:process";
import { defineConfig } from "vitest/config";
import GithubActionsReporter from "vitest-github-actions-reporter";

export const configShared = defineConfig({
	test: {
		reporters: process.env.GITHUB_ACTIONS ? ["default", new GithubActionsReporter()] : "default",
		exclude: ["**/node_modules", "**/dist", ".idea", ".git", ".cache", ".yarn", "apps", "src", "*.get.ts"],
		include: ["__tests__/**/*.{spec,test}.{js,ts}"],
		passWithNoTests: true,
		coverage: {
			enabled: true,
			reporter: ["json-summary", "json"],
		},
	},
});

export default defineConfig(configShared);
