import process from "node:process";
import { defineConfig } from "vitest/config";

export const configShared = defineConfig({
	test: {
		reporters: process.env.GITHUB_ACTIONS
			? ["verbose", "github-actions", "hanging-process"]
			: ["verbose", "hanging-process", "html"],
		exclude: ["**/node_modules", "**/dist", ".idea", ".git", ".cache", ".yarn", "apps", "src", "*.get.ts"],
		include: ["__tests__/**/*.{spec,test}.{js,ts}"],
		passWithNoTests: true,
	},
});

export default defineConfig(configShared);
