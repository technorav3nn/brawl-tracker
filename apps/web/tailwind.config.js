import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...fontFamily.sans],
			},
			colors: {
				green: {
					50: "#EFFDF5",
					100: "#D9FBE8",
					200: "#B3F5D1",
					300: "#75EDAE",
					400: "#00DC82",
					500: "#00C16A",
					600: "#00A155",
					700: "#007F45",
					800: "#016538",
					900: "#0A5331",
					950: "#052e16",
				},
			},
			gridRow: {
				"span-8": "span 8 / span 8",
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), utils],
};
/** @type {import('tailwindcss/types/config').PluginCreator} */
function utils(api) {
	api.addUtilities({
		".hstack": {
			"@apply flex items-center  flex-row": {},
		},
		".vstack": {
			"@apply flex items-center  flex-col": {},
		},
		".center": {
			"@apply flex items-center justify-center": {},
		},
	});
}
