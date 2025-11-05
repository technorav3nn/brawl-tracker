export function useIpToCountry(_ip: string) {
	const event = useEvent();
	const cloudflareCountry = event.headers.get("cf-ipcountry");
	if (cloudflareCountry) {
		return cloudflareCountry;
	}

	return "US"; // Default to US for now
}
