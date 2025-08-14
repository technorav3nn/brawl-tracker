export default eventHandler(async (event) => {
	console.log(await getCachedScidSessionToken(event, useRuntimeConfig(event).scidAccountToken));
	return "look in console";
});
