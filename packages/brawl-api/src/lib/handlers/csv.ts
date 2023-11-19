import { ofetch } from "ofetch";
import { CSV_URL } from "../constants";
import type { CsvBrawler, CsvSkinCampaign, CsvSkin } from "../types";

export async function getBrawlers() {
	return ofetch<Record<string, CsvBrawler>>(`${CSV_URL}/characters`);
}

export async function getSkinCampaign() {
	return ofetch<Record<string, CsvSkinCampaign>>(`${CSV_URL}/skin_campaigns`);
}

export async function getSkins() {
	return ofetch<Record<string, CsvSkin>>(`${CSV_URL}/skins`);
}
