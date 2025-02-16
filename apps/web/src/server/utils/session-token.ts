import { getSessionToken } from "@brawltracker/supercell-id-api";

export const getCachedScidSessionToken = cachedFunction(async (scidToken: string) => getSessionToken(scidToken), {
	maxAge: 60 * 60 * 24, // 24 hours
});
