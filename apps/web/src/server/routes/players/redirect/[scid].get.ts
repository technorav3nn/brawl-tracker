import { getProfile } from "@brawltracker/supercell-id-api";
import { highLowToId, idToTag } from "@brawltracker/supercell-id-api/browser";

export default eventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({
			statusCode: 401,
			message: "Unauthorized",
		});
	}

	const { sessionToken } = event.context.user;

	if (!sessionToken) {
		throw createError({
			statusCode: 400,
			statusMessage: "User has no SCID token, not logged in with Supercell ID",
		});
	}

	const params = event.context.params;
	if (!params?.scid) {
		throw createError({
			statusCode: 400,
			message: "Missing SCID",
		});
	}

	const { scid } = params;
	const profile = await getProfile(sessionToken, scid);

	if (!profile.ok) {
		throw createError({
			statusCode: 400,
			statusMessage: "Failed to fetch profile",
		});
	}

	const connectedSystem = profile.data?.connectedSystems?.find((system) => system.application === "laser-prod");
	if (!connectedSystem) {
		throw createError({
			statusCode: 400,
			statusMessage: "User has no connected system to Brawl Stars",
		});
	}

	const { applicationAccountId } = connectedSystem;
	const tag = idToTag(highLowToId(applicationAccountId));

	return await sendRedirect(event, `/players/${encodeURIComponent(tag)}`, 302);
});
