import { ofetch } from "ofetch";
import { CSV_URL } from "../constants";
import type { CsvBrawler } from "../types";

export async function getCsvBrawlers() {
	return ofetch<Record<string, CsvBrawler>>(`${CSV_URL}/characters`);
}
