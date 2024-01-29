import { $fetch } from "ofetch";
import type { BrawlerData } from "./lib/types/brawler";

export const CDN_URL = "https://cdn.deathblows.tech/file/bs-api";

export function normalizeNameToCdnName(name: string) {
	// "El Primo" -> "el_primo" for example
	return name.toLowerCase().replaceAll(" ", "_");
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

/**
 * Get brawler avatar URL from CDN
 *
 * @param name - Normalized brawler name
 */
export function getBrawlerAvatarUrl(name: string) {
	return `${CDN_URL}/brawlers/${name}/avatar.webp`;
}

/**
 * Get brawler model URL from CDN
 *
 * @param name - Normalized brawler name
 */
export function getBrawlerModelUrl(name: string) {
	return `${CDN_URL}/brawlers/${name}/model.webp`;
}
