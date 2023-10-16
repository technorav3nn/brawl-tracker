/* eslint-disable require-atomic-updates */
import { exec as execCallback } from "node:child_process";
import { promisify } from "node:util";
import { createResolver, defineNuxtModule, useLogger } from "@nuxt/kit";

const exec = promisify(execCallback);

// @ts-expect-error unknown
const resolver = createResolver(import.meta.url);

export default defineNuxtModule({
	async setup(_, nuxt) {
		const logger = useLogger("panda-css");
		if (nuxt.options.dev) return;
		try {
			const output = await exec("pnpm panda");
			logger.info(output.stdout);

			nuxt.options.css = [resolver.resolve("../../../styled-system/styles.css")];
			nuxt.options.postcss = { plugins: {} };

			logger.info("Added styled-system CSS to build");
		} catch {
			logger.info("Failed to add styled-system CSS to build");
		}
	},
});
