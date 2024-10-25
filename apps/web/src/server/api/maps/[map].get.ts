export default eventHandler(
	cachedFunction(() => {
		const brawlApi = useBrawlApi();
		const {
			context: { params },
		} = useEvent();

		return brawlApi.maps.getMapById(params!.map!);
	})
);
