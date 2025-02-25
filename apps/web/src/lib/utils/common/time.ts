import { TimeTypes, type DurationFormatAssetsTime, DurationFormatter } from "@sapphire/duration";

// eslint-disable-next-line no-promise-executor-return
export const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

export const durationFormatter = new DurationFormatter(FORMATTER_UNITS);

export function secondsToDate(seconds: number) {
	const date = new Date(1970, 0, 1);
	date.setSeconds(seconds);
	return date;
}
