import process from "node:process";
import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
	dts: true,
	entry: ["src/index.ts", "src/v2.ts"],
	format: ["esm", "cjs"],
	minify: isProduction,
});
