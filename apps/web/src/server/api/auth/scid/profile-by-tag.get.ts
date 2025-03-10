import { getProfile, listProfiles } from "@brawltracker/supercell-id-api";
import { z } from "zod";

const schema = z.object({
	accountHighLowId: z.string(),
});

export default defineEventHandler(async (event) => {
	const { success, data, error } = await getValidatedQuery(event, (s) => schema.safeParse(s));
	if (!success) {
		throw error.issues;
	}

	const { accountHighLowId } = data;

	const { scidAccountToken } = useRuntimeConfig(event);
	const sessionToken = await getCachedScidSessionToken(scidAccountToken);
	if (!sessionToken?.ok) {
		throw createError({ status: 500, message: "Failed to get session token" });
	}

	const initalProfileData = await listProfiles(sessionToken.token, [accountHighLowId], "appAccountIds");
	if (
		!initalProfileData.ok &&
		initalProfileData.data.profiles.length <= 0 &&
		!initalProfileData.data.profiles.some((e) => e.applicationAccountId === accountHighLowId)
	) {
		throw createError({ status: 404, message: "Profile not found" });
	}

	const initialProfile = initalProfileData.data.profiles[0];
	try {
		return await getProfile(sessionToken.token, initialProfile.scid, "scid");
	} catch {
		throw createError({ status: 500, message: "Failed to get profile" });
	}
});
