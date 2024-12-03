import { ofetch } from "ofetch";
import { CSV_CLIENT_URL, CSV_LOGIC_URL } from "../constants";
import type { CsvBrawler, CsvSkinCampaign, CsvSkin, ShopBillingPackages, ShopItem } from "../types";

export async function getBrawlers() {
	return ofetch<Record<string, CsvBrawler>>(`${CSV_LOGIC_URL}/characters`);
}

export async function getSkinCampaign() {
	return ofetch<Record<string, CsvSkinCampaign>>(`${CSV_LOGIC_URL}/skin_campaigns`);
}

export async function getSkins() {
	return ofetch<Record<string, CsvSkin>>(`${CSV_LOGIC_URL}/skins`);
}

export async function getBillingPackages() {
	return ofetch<ShopBillingPackages>(`${CSV_CLIENT_URL}/billing_packages`);
}

export async function getShopItems() {
	return ofetch<Record<string, ShopItem>>(`${CSV_CLIENT_URL}/shop_items`);
}
