import { $fetch } from "ofetch";
import type { BrawlerData } from "./lib/types/brawler";

const CDN_URL = "https://cdn.deathblows.tech/file/bs-api/assets";

export function normalizeNameToCdnName(name: string) {
	// "El Primo" -> "el_primo" for example
	return name.toLowerCase().replaceAll(" ", "_");
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
	return `${CDN_URL}/brawlers/${name}/avatar.png`;
}

/**
 * Get brawler model URL from CDN
 *
 * @param name - Normalized brawler name
 */
export function getBrawlerModelUrl(name: string) {
	return `${CDN_URL}/brawlers/${name}/model.png`;
}
