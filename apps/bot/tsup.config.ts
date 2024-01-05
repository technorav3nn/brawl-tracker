import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/**/*.ts", "!src/**/*.d.ts"],
	format: ["esm"],
	silent: false,
	target: "esnext",
	minify: false,
	clean: true,
	sourcemap: true,
	keepNames: true,
	splitting: false,
});
