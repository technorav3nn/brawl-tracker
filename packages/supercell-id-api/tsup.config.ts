import { defineConfig } from "tsup";

export default defineConfig({
	dts: true,
	entry: ["src/index.ts", "src/browser.ts", "src/crypto.ts"],
	format: ["esm", "cjs"],
	splitting: true,
	treeshake: true,
});
