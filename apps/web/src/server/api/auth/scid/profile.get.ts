import { getProfile } from "@brawltracker/supercell-id-api";
import { db } from "$server/db";
import { supercellIdProfiles, type SupercellIdProfileInsert } from "$server/db/schema/users";

export default defineEventHandler(async (event) => {
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

	const existingProfile = await db.query.supercellIdProfiles.findFirst({
		where: (profile, { eq }) => eq(profile.userId, id),
	});

	if (existingProfile?.updatedAt) {
		// check updated at, if it's a day old then we should fetch the api to update the profile
		const profileExpired = Date.now() - existingProfile.updatedAt.getTime() > 86400000; // 1 day
		if (!profileExpired) {
			// update the profile's updatedAt
			return { exists: true, data: existingProfile };
		}
	}

	const tokens = await db.query.tokens.findFirst({
		where: (tokens, { eq }) => eq(tokens.userId, id),
		columns: { scidToken: true },
	});

	if (!tokens) {
		return { exists: false, data: null };
	}

	const profile = await getProfile(sessionToken);

	if (!profile.ok) {
		throw createError({
			statusCode: 400,
			statusMessage: "Failed to fetch profile",
		});
	}

	const columns: SupercellIdProfileInsert = {
		universalLink: profile.data!.universalLink,
		name: profile.data!.name.name,
		qrCodeUrl: profile.data!.qrCodeURL,
		scid: profile.data!.scid,
		avatarImage: profile.data!.avatarImage.image,
		userId: id,
	};

	await db
		.insert(supercellIdProfiles)
		.values(columns)
		.onConflictDoUpdate({
			target: [supercellIdProfiles.userId],
			set: columns,
		})
		.returning();

	return { exists: true, data: columns };
});
