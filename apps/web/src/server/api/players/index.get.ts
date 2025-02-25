// Query param version of /players/[id].ts

import { verifyTag } from "@brawltracker/supercell-api-utils";
import { listProfiles } from "@brawltracker/supercell-id-api";
import { idToTag, highLowToId } from "@brawltracker/supercell-id-api/browser";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	if (!query.tag) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required query parameter "tag"',
		});
	}

	let resolvedTag = query.tag as string;

	if (!verifyTag(query.tag as string)) {
		if (query.isScid) {
			const { scidAccountToken } = useRuntimeConfig(event);
			const sessionToken = (await getCachedScidSessionToken(scidAccountToken))!.token;

			const player = await listProfiles(sessionToken, [query.tag as string], "handles");
			if (!player.ok || player.data.profiles.length === 0) {
				throw createError({
					statusCode: 404,
					message: "Player with that SCID handle was not found",
				});
			}

			const [profile] = player.data.profiles;
			if (!profile.applicationAccountId) {
				throw createError({
					statusCode: 400,
					message: "Invalid SCID handle entered. User has never played Brawl Stars",
				});
			}

			const playerTag = idToTag(highLowToId(profile.applicationAccountId).toString());

			resolvedTag = playerTag;
		} else {
			throw createError({
				statusCode: 400,
				message: "Invalid tag entered",
			});
		}
	}

	setHeader(event, "Cache-Control", "public, max-age=180, stale-while-revalidate=60, stale-if-error=900");

	const api = useBrawlStarsApi();
	try {
		return await api.players.getPlayer(resolvedTag.replaceAll("%23", ""));
	} catch {
		throw createError({
			statusCode: 404,
			message: "Player with that tag was not found",
		});
	}
});
