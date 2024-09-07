export default defineAppConfig({
	ui: {
		primary: "sky",
		gray: "cool",
		variables: {
			light: {
				background: "255 255 255",
				foreground: "var(--color-gray-700)",
				border: "var(--color-gray-200)",
			},
			dark: {
				background: "var(--color-gray-900)",
				foreground: "var(--color-gray-200)",
				border: "var(--color-gray-800)",
			},
			header: {
				height: "4rem",
			},
		},
	},
});
