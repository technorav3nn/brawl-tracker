/* eslint-disable tsdoc/syntax */
/**
 * @type {import('prettier').Options}
 */
module.exports = {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	...require("../../prettier.config.cjs"),
	plugins: ["prettier-plugin-tailwindcss"],
	tailwindStylesheet: "./src/assets/css/tailwind.css",
	tailwindConfig: "./tailwind.config.ts",
	tailwindFunctions: ["clsx", "cn", "tw"],
	tailwindPreserveWhitespace: true,
	tailwindPreserveDuplicates: false,
};
