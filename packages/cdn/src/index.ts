import { $fetch } from "ofetch";
import type { BrawlerData } from "./lib/types/brawler";
import type { GearData } from "./lib/types/gears";

export const CDN_URL = "https://cdn.deathblows.xyz";

export function normalizeNameToCdnName(name: string) {
	// "El Primo" -> "el_primo" for example
	return name.toLowerCase().replaceAll(" ", "_").replace("&", "_").replace(".", "_");
}

export function isNameNormalized(name: string) {
	return name === normalizeNameToCdnName(name);
}

/**
 * Converts lowercase property names to valid case
 *
 * @param str - String to convert
 * @example attackrange becomes Attack Range
 */
export function convertLowercaseToTitleCase(str: string) {
	// eslint-disable-next-line prefer-named-capture-group
	return str.replaceAll(/([a-z])([A-Z])/g, "$1 $2");
}

/**
 * Get brawler data from CDN
 *
 * @param name - Normalized brawler name
 */
export async function getBrawlerData(name: string) {
	return $fetch<BrawlerData>(`${CDN_URL}/brawlers/${name}/data.json`);
}

export async function getAllGears() {
	return $fetch<GearData>(`${CDN_URL}/gears/all-info.json`);
}

/**
 * Get brawler avatar URL from CDN
 *
 * @param name - Normalized brawler name
 */
export function getBrawlerAvatarUrl(name: string, format: string = "png") {
	return `${CDN_URL}/brawlers/${name}/avatar.${format}`;
}

/**
 * Get brawler model URL from CDN
 *
 * @param name - Normalized brawler name
 */
export function getBrawlerModelUrl(name: string, format: string = "png") {
	return `${CDN_URL}/brawlers/${name}/model.${format}`;
}

/**
 * Get skins -\> ids json
 */
export async function getSkinsIdsToNames() {
	return $fetch<Record<string, { name: string; path: string }>>(`${CDN_URL}/skin-ids-to-name.json`);
}

export * from "./lib/types/brawler";
