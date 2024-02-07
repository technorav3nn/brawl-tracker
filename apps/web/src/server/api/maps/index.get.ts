export default cachedEventHandler(() => useBrawlifyApi().maps.getAllMaps(), {
	swr: true,
	maxAge: 60 * 60 * 24,
});
