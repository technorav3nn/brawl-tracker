import type { BrawlApiBrawler, BrawlApiGetAllBrawlersResponse } from "./types";
import { createApiHandler } from "./util/create-api-handler";

export const brawlers = {
	getAllBrawlers: createApiHandler<BrawlApiGetAllBrawlersResponse>("/brawlers"),
	getBrawlerById: createApiHandler<BrawlApiBrawler, [id: number]>(
		(id: number) => `/brawlers/${id}`
	),
};
