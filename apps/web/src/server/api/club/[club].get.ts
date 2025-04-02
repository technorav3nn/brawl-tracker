import { getAlliance } from "@brawltracker/gene-brawl-api";

export default eventHandler(async (event) => {
	const club = event.context.params?.club;
	if (!club) {
		throw createError({
			statusCode: 400,
			statusMessage: "Missing club tag",
		});
	}

	const type = getQuery(event).meowApi;
	if (type) {
		return await getAlliance(club.replace("#", ""));
	} else {
		const api = useBrawlStarsApi();
		return await api.clubs.getClub(club);
	}
});
