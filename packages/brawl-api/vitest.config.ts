import { mergeConfig, defineConfig } from "vitest/config";
import { configShared } from "../../vitest.config";

export default mergeConfig(
	configShared,
	defineConfig({
		test: {
			setupFiles: ["__tests__/setup.ts"],
		},
	})
);
