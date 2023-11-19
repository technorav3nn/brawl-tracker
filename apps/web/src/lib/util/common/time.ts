import { TimeTypes, type DurationFormatAssetsTime } from "@sapphire/duration";

export const FORMATTER_UNITS: DurationFormatAssetsTime = {
	[TimeTypes.Day]: {
		1: "d",
		DEFAULT: "d",
	},
	[TimeTypes.Hour]: {
		1: "h",
		DEFAULT: "h",
	},
	[TimeTypes.Minute]: {
		1: "m",
		DEFAULT: "m",
	},
	[TimeTypes.Second]: {
		1: "s",
		DEFAULT: "s",
	},
	[TimeTypes.Week]: {
		1: "w",
		DEFAULT: "w",
	},
	[TimeTypes.Year]: {
		1: "y",
		DEFAULT: "y",
	},
	[TimeTypes.Month]: {
		1: "mo",
		DEFAULT: "mo",
	},
};
