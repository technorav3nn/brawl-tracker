export const HEADER_ITEMS = [
	{ label: "Brawlers", path: "/brawlers" },
	{ label: "Events", path: "/events" },
	{ label: "Clubs", path: "/test" },
	{ label: "Leaderboards", path: "/leaderboards" },
] as const;

export const NAVIGATION_DRAWER_ITEMS = [{ label: "Home", path: "/" }, ...HEADER_ITEMS] as const;

export const COLOR_MODES = ["Light", "Dark", "System"];
