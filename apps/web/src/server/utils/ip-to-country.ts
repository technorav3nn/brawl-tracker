import geoip from "geoip-country";

export function useIpToCountry(ip: string) {
	const event = useEvent();
	const cloudflareCountry = event.headers.get("cf-ipcountry");
	if (cloudflareCountry) {
		return cloudflareCountry;
	}

	// Check if its localhost, since the browser doesn't send the IP in development
	if (ip === "127.0.0.1") {
		return "US";
	}

	const result = geoip.lookup(ip);
	if (!result) {
		throw createError({
			statusMessage: "Failed to get IP location",
			statusCode: 500,
		});
	}

	return result.country;
}
