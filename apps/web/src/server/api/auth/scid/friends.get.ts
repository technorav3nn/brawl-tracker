import { getFriends } from "@brawltracker/supercell-id-api";
import { db } from "$server/db";

export default eventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({
			statusCode: 401,
			message: "Unauthorized",
		});
	}

	const { sessionToken, id } = event.context.user;

	if (!sessionToken) {
		throw createError({
			statusCode: 400,
			statusMessage: "User has no SCID token, not logged in with Supercell ID",
		});
	}

	const tokens = await db.query.tokens.findFirst({
		where: (tokenProfile, { eq }) => eq(tokenProfile.userId, id),
	});

	if (!tokens) {
		throw createError({
			statusCode: 400,
			statusMessage: "User has no SCID token",
		});
	}

	const friends = await getFriends(sessionToken);

	if (!friends.ok) {
		throw createError({
			statusCode: 400,
			statusMessage: "Failed to fetch friends",
		});
	}

	return friends.data;
});
