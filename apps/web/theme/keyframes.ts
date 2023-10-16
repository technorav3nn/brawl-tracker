import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
	bounce: {
		"10%": {
			transform: "scaleY(0.90)",
		},
		"30%": {
			transform: "scaleY(0.4)",
		},
		"60%": {
			transform: "scaleY(0.5)" /* scale down to 50% */,
		},
		"80%": {
			transform: "scaleY(0.75)",
		},
		"100%": {
			transform: " scaleY(0.90)",
		},
	},
});
