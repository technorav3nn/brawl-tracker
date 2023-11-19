import type {
	BrawlApiEvents,
	BrawlApiBrawler,
	BrawlApiGetAllBrawlersResponse,
	BrawlApiMaps,
	BrawlApiMap,
} from "./types";
import { createApiHandler } from "./util/create-api-handler";

export const brawlers = {
	getAllBrawlers: createApiHandler<BrawlApiGetAllBrawlersResponse>("/brawlers"),
	getBrawlerById: createApiHandler<BrawlApiBrawler, [id: string]>((id: string) => `/brawlers/${id}`),
};

export const events = {
	getEventRotation: createApiHandler<BrawlApiEvents>("/events"),
};

export const maps = {
	getAllMaps: createApiHandler<BrawlApiMaps>("/maps"),
	getMapById: createApiHandler<BrawlApiMap, [id: string]>((id: string) => `/maps/${id}`),
};
