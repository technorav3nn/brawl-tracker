/* eslint-disable */
/**
 * @type {import('prettier').Options}
 */
module.exports = {
	...require("../../prettier.config.cjs"),
	plugins: ["prettier-plugin-tailwindcss"],
	tailwindStylesheet: "./src/assets/css/tailwind.css",
	tailwindConfig: "./tailwind.config.ts",
	tailwindFunctions: ["clsx", "cn", "tw"],
	tailwindPreserveWhitespace: true,
	tailwindPreserveDuplicates: false,
};
