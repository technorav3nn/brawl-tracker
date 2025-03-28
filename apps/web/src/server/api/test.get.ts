export default eventHandler(async () => {
	// eslint-disable-next-line no-promise-executor-return
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return Math.random();
});
