import { common, browser, node, typescript, vue, vuetypescript, prettier } from "eslint-config-neon/flat";

export default [
	{
		ignores: [
			"**/dist/*",
			// eslint configs
			"eslint.config.js",
		],
	},
	...common,
	...browser,
	...node,
	...typescript,
	...vue,
	...vuetypescript,
	...prettier,
	{
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.eslint.json",
			},
		},
	},
];
