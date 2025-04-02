import { getSessionToken } from "@brawltracker/supercell-id-api";

export const getCachedScidSessionToken = cachedFunction(
	async (scidToken: string) => {
		try {
			return await getSessionToken(scidToken);
		} catch {}
	},
	{
		maxAge: 60 * 60 * 24, // 24 hours
		swr: true,
	}
);
