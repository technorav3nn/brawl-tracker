import { sendLoginCode } from "@brawltracker/supercell-id-api";

export default eventHandler(async (event) => {
	const { email }: { email: string } = getQuery(event);

	try {
		await sendLoginCode(email, "laser");
		setResponseStatus(event, 200, "OK");
		return { success: true };
	} catch (error) {
		console.error(error);
		setResponseStatus(event, 500, "Internal Server Error");
		return { success: false };
	}
});
