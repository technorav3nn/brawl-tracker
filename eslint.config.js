// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";
import { globalIgnores } from "eslint/config";
import pluginN from "eslint-plugin-n";

export default createConfigForNuxt({
	features: {
		stylistic: false,
		tooling: true,
		formatters: false,
		// typescript: {
		//   tsconfigPath: 'tsconfig.json',
		// },
		import: true,
	},
	dirs: {
		src: ["packages", "apps"],
		componentsPrefixed: ["playground/components-prefixed"],
	},
})
	.append(globalIgnores(["**/*.config.cjs"]))
	.overrideRules({
		"vue/multi-word-component-names": "off",
		"vue/max-attributes-per-line": ["error", { singleline: 5 }],
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/no-empty-object-type": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"no-restricted-globals": "off",
		"@typescript-eslint/consistent-type-definitions": [2, "interface"],
		"@typescript-eslint/lines-between-class-members": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-argument": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"typescript-sort-keys/interface": "off",
		"typescript-sort-keys/string-enum": "off",
		"@typescript-eslint/sort-type-constituents": "off",
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
	})
	.override("nuxt/typescript/rules", {
		rules: {
			"@typescript-eslint/unified-signatures": "off",
		},
	})
	.override("nuxt/import/rules", {
		rules: {
			"import/order": [
				2,
				{
					alphabetize: {
						caseInsensitive: false,
						order: "asc",
					},
					groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
					"newlines-between": "never",
				},
			],
		},
	})
	.append([
		pluginN.configs["flat/recommended-module"],
		{
			rules: {
				"n/no-unpublished-bin": 2,
				"n/no-unpublished-import": 0,
				"n/no-unpublished-require": 0,
				"n/no-unsupported-features/es-builtins": 0,
				"n/no-unsupported-features/es-syntax": 0,
				"n/no-unsupported-features/node-builtins": 0,
				"n/prefer-global/buffer": [2, "never"],
				"n/prefer-global/console": [2, "always"],
				"n/prefer-global/process": [2, "never"],
				"n/prefer-global/text-decoder": [2, "never"],
				"n/prefer-global/text-encoder": [2, "never"],
				"n/prefer-global/url": [2, "never"],
				"n/prefer-global/url-search-params": 0,
				"n/prefer-promises/dns": 0,
				"n/prefer-promises/fs": 0,
				// unicorn rule for this
				"n/prefer-node-protocol": 0,
				"n/process-exit-as-throw": 2,
				"n/no-missing-import": 0,
				"n/no-extraneous-import": 0,
			},
		},
	]);
