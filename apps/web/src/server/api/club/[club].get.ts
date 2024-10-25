import { formatTag, verifyTag } from "@brawltracker/supercell-api-utils";
import { z } from "zod";

const schema = z.object({
	club: z
		.string()
		.transform((t) => formatTag(decodeURIComponent(t)))
		.refine((t) => verifyTag(t)),
});

export default eventHandler(async (event) => {
	const { club } = schema.parse(event.context.params!);

	const api = useBrawlStarsApi();
	return await api.clubs.getClub(club);
});
