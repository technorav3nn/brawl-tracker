import tsParser from "@typescript-eslint/parser";
import common from "eslint-config-neon/flat/common.js";
import node from "eslint-config-neon/flat/node.js";
import prettier from "eslint-config-neon/flat/prettier.js";
import typescript from "eslint-config-neon/flat/typescript.js";
import vuetypescript from "eslint-config-neon/flat/vue-typescript.js";
import vue from "eslint-config-neon/flat/vue.js";
import merge from "lodash.merge";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

const commonFiles = "{vue,js,mjs,cjs,ts,mts,cts,jsx,tsx}";

const commonRuleset = merge(...common, {
	files: [`**/*${commonFiles}`],
	rules: {
		"import/no-duplicates": ["error", { "prefer-inline": true }],
		"import/no-extraneous-dependencies": "off",
		"import/newline-after-import": "off",
		"import/extensions": "off",
		"no-warning-comments": "off",
		"no-use-before-define": "off",
		"unicorn/prefer-math-trunc": "off",
		"unicorn/numeric-separators-style": "off",
		"id-length": "off",
		"no-undef": "off",
		"no-extra-parens": "off",
		"comma-dangle": "off",
		"object-curly-newline": "off",
	},
});
const nodeRuleset = merge(...node, { files: [`**/*${commonFiles}`] });
const typeScriptRuleset = merge(...typescript, {
	files: [`**/*${commonFiles}`],
	languageOptions: {
		parserOptions: {
			project: ["tsconfig.eslint.json", "apps/*/tsconfig.eslint.json", "packages/*/tsconfig.eslint.json"],
		},
	},
	rules: {
		"@typescript-eslint/consistent-type-definitions": [2, "interface"],
		"@typescript-eslint/lines-between-class-members": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-argument": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unsafe-call": "off",
		"@typescript-eslint/no-unsafe-return": "off",
		"@typescript-eslint/consistent-type-assertions": [
			"error",
			{ assertionStyle: "as", objectLiteralTypeAssertions: "allow-as-parameter" },
		],
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				fixStyle: "inline-type-imports",
			},
		],
	},
	settings: {
		"import/resolver": {
			typescript: {
				project: ["tsconfig.eslint.json", "apps/*/tsconfig.eslint.json", "packages/*/tsconfig.eslint.json"],
			},
		},
	},
});

const vueRuleset = merge(...vue, {
	files: [`apps/**/*${commonFiles}`],
	rules: {
		"typescript-sort-keys/interface": "off",
		"@typescript-eslint/consistent-type-definitions": "off",
		"@typescript-eslint/no-return-await": "off",
		"@typescript-eslint/return-await": "off",
		"no-restricted-globals": "off",
		"n/prefer-global/process": "off",
		"vue/sort-keys": "off",
		"vue/html-comment-indent": "off",
		"vue/no-v-model-argument": "off",
		"vue/max-attributes-per-line": "off",
		"vue/no-unused-properties": "off",
		"vue/require-default-prop": "off",
		"vue/no-empty-component-block": "off", // typescript in template
		"vue/no-multiple-template-root": "off",
		"vue/first-attribute-linebreak": "off",
		"vue/require-emit-validator": "off",
		"vue/attribute-hyphenation": "off",
		"vue/html-self-closing": "off",
		"vue/comma-dangle": "off",
		"vue/operator-linebreak": "off",
		"vue/html-indent": "off",
		"vue/html-closing-bracket-newline": "off",
		"vue/multi-word-component-names": "off",
		"vue/one-component-per-file": "off",
		"vue/comment-directive": "off",
		// Rule is broken
		"vue/valid-v-for": "off",
		"vue/no-static-inline-styles": "off",
		"vue/no-unused-refs": "off",
	},
	languageOptions: {
		parser: vueParser,
		parserOptions: {
			parser: tsParser,
			sourceType: "module",
			extraFileExtensions: [".vue"],
			project: ["tsconfig.eslint.json", "apps/*/tsconfig.eslint.json", "packages/*/tsconfig.eslint.json"],
		},
	},
});
const vueTypeScriptRuleset = merge(...vuetypescript, { files: [`apps/**/*${commonFiles}`] });
const prettierRuleset = merge(...prettier, { files: [`**/*${commonFiles}`] });

export default tseslint.config(
	{
		ignores: [
			"**/node_modules/",
			".git/",
			"**/dist/",
			"**/template/",
			"**/coverage/",
			"**/storybook-static/",
			"**/.next/",
			"**/.nuxt/",
			"**/.output/",
			"**/__old__/",
		],
	},
	commonRuleset,
	nodeRuleset,
	typeScriptRuleset,
	vueRuleset,
	vueTypeScriptRuleset,
	prettierRuleset,
	{
		rules: {
			"import/no-extraneous-dependencies": "off",
		},
	}
);
