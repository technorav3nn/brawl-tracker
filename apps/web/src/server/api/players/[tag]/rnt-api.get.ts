export default defineEventHandler(async (event) => {
	if (!event.context.params!.tag) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required parameter "tag"',
		});
	}

	setHeader(event, "Cache-Control", "public, max-age=180, stale-while-revalidate=60, stale-if-error=900");

	const tag = event.context.params!.tag.replaceAll("%23", "");

	const rntApi = useRntApi();
	return rntApi.profiles.get(tag);
});
