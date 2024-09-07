import { getPlayerProfile } from "@brawltracker/gene-brawl-api";
import { formatTag } from "@brawltracker/supercell-api-utils";
import { FetchError } from "ofetch";

export default defineCachedEventHandler(
	async (event) => {
		const brawlStarsApi = useBrawlStarsApi();
		const tag = getRouterParam(event, "tag");
		if (!tag) {
			throw createError({ message: "Missing tag", statusCode: 400 });
		}

		const formattedTag = formatTag(tag);
		const fixedTag = formattedTag.startsWith("#") ? formattedTag.replace("#", "") : formattedTag;

		try {
			return {
				datamined: await getPlayerProfile(fixedTag),
				official: await brawlStarsApi.players.getPlayer(formattedTag),
			};
		} catch (error) {
			if (error instanceof FetchError) {
				throw createError({ message: "Player not found", statusCode: 404 });
			}

			throw createError({ message: "Internal server error", statusCode: 500 });
		}
	},
	{
		maxAge: 600, // 10 minutes in seconds
	}
);
