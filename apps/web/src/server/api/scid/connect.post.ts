import { formatTag } from "@brawltracker/supercell-api-utils";
import { listProfiles } from "@brawltracker/supercell-id-api";
import { getCdnUrlForAvatarId, idToHighLow, tagToId } from "@brawltracker/supercell-id-api/browser";
import { z } from "zod";
import { getCachedScidSessionToken } from "$server/utils/session-token";

const schema = z.object({
	tag: z.string(),
	originalIcon: z.string(),
	iconToCheck: z.string(),
});

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({ status: 401, statusMessage: "Unauthorized" });
	}

	const body = await readValidatedBody(event, (body) => schema.safeParse(body));
	if (!body.success) throw body.error.issues;
	const { data } = body;

	const api = useBrawlStarsApi();
	const player = await api.players.getPlayer(data.tag);

	if (data.iconToCheck !== player.icon.id.toString()) {
		throw createError({ status: 400, statusMessage: "Invalid icon or not changed" });
	}

	// Icon is valid
	const { scidAccountToken } = useRuntimeConfig(event);
	const sessionToken = await getCachedScidSessionToken(event, scidAccountToken);
	const profiles = (await listProfiles(
		sessionToken!.token,
		[idToHighLow(Number(tagToId(player.tag))).join("-")],
		"appAccountIds"
	)) as any;

	if (!profiles.ok || profiles.data.profiles.length === 0) {
		throw createError({ status: 404, statusMessage: "Profile not found, do you have an Supercell ID connected?" });
	}

	const profile = profiles.data.profiles[0];

	const formattedTag = formatTag(player.tag);

	const { db } = useDrizzle();
	const existingUser = await db.query.user.findFirst({
		where: (user) => eq(user.tag, formattedTag),
	});

	if (existingUser) {
		throw createError({ status: 409, statusMessage: "User with tag already exists, only one account can have one player tag" });
	}

	const auth = useServerAuth();
	try {
		await auth.api.updateUser({
			body: {
				image: profile?.imageURL ?? getCdnUrlForAvatarId(profile.avatarImage),
				scid: profile.scid,
				name: profile.name,
				tag: formattedTag,
			},
			headers: event.headers,
		});
	} catch (error) {
		console.error(error);
		throw createError({ status: 500, statusMessage: "Failed to update profile" });
	}

	return { success: true };
});
