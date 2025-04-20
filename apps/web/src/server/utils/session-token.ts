import { getSessionToken } from "@brawltracker/supercell-id-api";
import type { H3Event } from "h3";

export const getCachedScidSessionToken = cachedFunction(
	async (_: H3Event, scidToken: string) => {
		try {
			return await getSessionToken(scidToken);
		} catch {}
	},
	{
		maxAge: 60 * 60 * 24, // 24 hours
		swr: true,
	}
);
