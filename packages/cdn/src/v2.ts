import { $fetch } from "ofetch";
import { type CdnBrawler } from "./lib/types/brawler-v2";
import { type GearData } from "./lib/types/gears";

export const CDN_URL_V2 = "https://cdn.deathblows.dev";

export * from "./lib/types/brawler-v2";
export * from "./lib/types/gears";

/**
 * Get brawler data from CDN
 *
 * @param id - Normalized brawler name
 */
export async function getBrawlerData(id: string) {
	return $fetch<CdnBrawler>(`${CDN_URL_V2}/brawlers/${id}/data.json`);
}

export async function getAllGears() {
	return $fetch<GearData>(`${CDN_URL_V2}/gears/all-info.json`);
}

/**
 * Get brawler avatar URL from CDN
 *
 * @param id - Brawler ID
 */
export function getBrawlerPortraitUrl(id: string) {
	return `${CDN_URL_V2}/brawlers/${id}/portrait.webp`;
}

/**
 * Get brawler model URL from CDN
 *
 * @param id - Brawler ID
 */
export function getBrawlerModelUrl(id: string) {
	return `${CDN_URL_V2}/brawlers/${id}/model.webp`;
}

export * from "./lib/types/brawler";
