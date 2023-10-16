import { ofetch } from "ofetch";
import { API_URL } from "./lib/constants";
import { getCsvBrawlers } from "./lib/routes/csv";
import type {
	BrawlApiBrawler,
	BrawlApiEvents,
	BrawlApiGameMode,
	BrawlApiGameModes,
	BrawlApiGetAllBrawlersResponse,
	BrawlApiIconsResponse,
	BrawlApiMap,
	BrawlApiMaps,
} from "./lib/types";

// Brawlers
async function getBrawlerById(id: number) {
	return ofetch<BrawlApiBrawler>(`${API_URL}/brawlers/${id}`);
}

async function getAllBrawlers() {
	return ofetch<BrawlApiGetAllBrawlersResponse>(`${API_URL}/brawlers`);
}

// Events
async function getEvents() {
	return ofetch<BrawlApiEvents>(`${API_URL}/events`);
}

// Maps
async function getMapById(id: number) {
	return ofetch<BrawlApiMap>(`${API_URL}/maps/${id}`);
}

async function getAllMaps() {
	return ofetch<BrawlApiMaps>(`${API_URL}/maps`);
}

// Game Modes
async function getGameModeById(id: number) {
	return ofetch<BrawlApiGameMode>(`${API_URL}/gamemodes/${id}`);
}

async function getAllGameModes() {
	return ofetch<BrawlApiGameModes>(`${API_URL}/gamemodes`);
}

// Icons
async function getAllIcons() {
	return ofetch<BrawlApiIconsResponse>(`${API_URL}/icons`);
}

export const brawlApi = {
	brawlers: {
		getAllBrawlers,
		getBrawlerById,
	},
	csvData: {
		getCsvBrawlers,
	},
	events: {
		getEvents,
	},
	gameModes: {
		getAllGameModes,
		getGameModeById,
	},
	icons: {
		getAllIcons,
	},
	maps: {
		getAllMaps,
		getMapById,
	},
};

export * from "./lib/types";
