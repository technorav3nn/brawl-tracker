export default defineAppConfig({
	ui: {
		colors: {
			primary: "amber",
			neutral: "zinc",
		},
		icons: {
			light: "i-heroicons-sun-20-solid",
			dark: "i-heroicons-moon-20-solid",
			close: "i-heroicons-x-mark-20-solid",
			chevronDown: "i-heroicons-chevron-down-20-solid",
			chevronUp: "i-heroicons-chevron-up-20-solid",
			chevronLeft: "i-heroicons-chevron-left-20-solid",
			chevronRight: "i-heroicons-chevron-right-20-solid",
			loading: "i-heroicons-arrow-path-20-solid",
			menu: "i-heroicons-bars-3-20-solid",
		},
		slideover: {
			compoundVariants: [
				{
					transition: true,
					side: "right",
					class: {
						content:
							"data-[state=open]:animate-[slide-in-from-right_300ms_cubic-bezier(0.42,0,0.2,1)] data-[state=closed]:animate-[slide-out-to-right_190ms_cubic-bezier(0.42,0,0.2,1)]",
					},
				},
			],
		},
		select: {
			slots: {
				content: "animate-none!",
			},
		},
		selectMenu: {
			slots: {
				content: "animate-none!",
			},
		},
	},
});
