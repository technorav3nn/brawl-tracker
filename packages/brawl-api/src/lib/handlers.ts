import type {
	BrawlApiEvents,
	BrawlApiBrawler,
	BrawlApiGetAllBrawlersResponse,
	BrawlApiMaps,
	BrawlApiMap,
	BrawlApiGameMode,
	BrawlApiGameModes,
	BrawlApiIconsResponse,
	BrawlApiLocation,
} from "./types";
import { createApiHandler } from "./util/create-api-handler";

export * as fankit from "./handlers/fankit";
export * as csv from "./handlers/csv";

export const brawlers = {
	getAllBrawlers: createApiHandler<BrawlApiGetAllBrawlersResponse>("/brawlers"),
	getBrawlerById: createApiHandler<BrawlApiBrawler, [id: number | string]>(
		(id: number | string) => `/brawlers/${id}`
	),
};

export const events = {
	getEventRotation: createApiHandler<BrawlApiEvents>("/events"),
};

export const maps = {
	getAllMaps: createApiHandler<BrawlApiMaps>("/maps"),
	getMapById: createApiHandler<BrawlApiMap, [id: number | string]>((id: number | string) => `/maps/${id}`),
};

export const gamemodes = {
	getAllGamemodes: createApiHandler<BrawlApiGameModes>("/gamemodes"),
	getGamemodeById: createApiHandler<BrawlApiGameMode, [id: number | string]>(
		(id: number | string) => `/gamemodes/${id}`
	),
};

export const icons = {
	getAllIcons: createApiHandler<BrawlApiIconsResponse>("/icons"),
};

export const locations = {
	getLocations: createApiHandler<BrawlApiLocation>("/locations"),
};
