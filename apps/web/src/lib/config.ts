import { HomeIcon, TrophyIcon, CalendarIcon, ShieldIcon, SwordsIcon } from "lucide-vue-next";

export const LINKS = [
	{ label: "Brawlers", path: "/brawlers", icon: SwordsIcon },
	{ label: "Events", path: "/events", icon: CalendarIcon },
	{ label: "Clubs", path: "/test", icon: ShieldIcon },
	{ label: "Leaders", path: "/leaderboards", icon: TrophyIcon },
] as const;

export const NAVIGATION_DRAWER_ITEMS = [{ label: "Home", path: "/", icon: HomeIcon }, ...LINKS] as const;
export const SEARCH_BAR_LINKS = NAVIGATION_DRAWER_ITEMS;

export const COLOR_MODES = ["Light", "Dark", "System"];
