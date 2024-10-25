import { getProfile } from "@brawltracker/supercell-id-api";

export default defineEventHandler(async (event) => {
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

	const { scid } = await readBody<{ scid: string }>(event);

	const profile = await getProfile(sessionToken, scid);

	if (!profile.ok) {
		throw createError({
			statusCode: 400,
			statusMessage: "Failed to fetch profile",
		});
	}

	return profile.data;
});
