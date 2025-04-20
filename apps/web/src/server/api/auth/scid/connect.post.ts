import { listProfiles } from "@brawltracker/supercell-id-api";
import { getCdnUrlForAvatarId, idToHighLow, tagToId } from "@brawltracker/supercell-id-api/browser";
import { z } from "zod";
import { createSessionClient } from "$server/utils/appwrite";
import { upsertProfileDoc, userWithTagExists } from "$server/db/users/actions";
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
	const sessionToken = await getCachedScidSessionToken(scidAccountToken);
	const profiles = (await listProfiles(
		sessionToken!.token,
		[idToHighLow(Number(tagToId(player.tag))).join("-")],
		"appAccountIds"
	)) as any;

	if (!profiles.ok || profiles.data.profiles.length === 0) {
		throw createError({ status: 404, statusMessage: "Profile not found, do you have an Supercell ID connected?" });
	}

	const profile = profiles.data.profiles[0];
	const { databases } = createSessionClient(event);
	const userExists = await userWithTagExists(player.tag, databases);

	if (userExists) {
		throw createError({ status: 409, statusMessage: "User with tag already exists, only one account can have one player tag" });
	}

	try {
		await upsertProfileDoc(
			event.context.user.$id,
			{
				avatar: profile?.imageURL ?? getCdnUrlForAvatarId(profile.avatarImage),
				isConnected: true,
				scid: profile.scid,
				username: profile.name,
				tag: player.tag,
			},
			databases
		);
	} catch (error) {
		console.error(error);
		throw createError({ status: 500, statusMessage: "Failed to update profile" });
	}

	return { success: true };
});
