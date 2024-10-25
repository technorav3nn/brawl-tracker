export default eventHandler(() => {
	const storage = useStorage("cache");
	return storage.getKeys();
});
