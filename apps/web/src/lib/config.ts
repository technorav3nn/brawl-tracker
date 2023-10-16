export const NAVBAR_ITEMS = [
	{ label: "Brawlers", path: "/brawlers" },
	{ label: "Events", path: "/events" },
	{ label: "Clubs", path: "/test" },
	{ label: "Leaderboards", path: "/leaderboards" },
] as const;

export const NAVIGATION_DRAWER_ITEMS = [{ label: "Home", path: "/" }, ...NAVBAR_ITEMS] as const;
