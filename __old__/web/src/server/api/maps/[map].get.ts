export default eventHandler(
	cachedFunction(() => {
		const brawlApi = useBrawlifyApi();
		const {
			context: { params },
		} = useEvent();

		return brawlApi.maps.getMapById(params!.map!);
	})
);
