import { HomeIcon, TrophyIcon, CalendarIcon, ShieldIcon, SwordsIcon, CalculatorIcon } from "lucide-vue-next";

export const MAIN_LINKS = [
	{ label: "Brawlers", path: "/brawlers", icon: SwordsIcon },
	{ label: "Events", path: "/events/current", icon: CalendarIcon },
	{ label: "Clubs", path: "/test", icon: ShieldIcon },
	{ label: "Leaders", path: "/leaderboards", icon: TrophyIcon },
] as const;

export const MORE_LINKS = [{ label: "Calculators", path: "/calculators", icon: CalculatorIcon }];

export const NAVIGATION_DRAWER_ITEMS = [
	{ label: "Home", path: "/", icon: HomeIcon },
	...MAIN_LINKS,
	...MORE_LINKS,
] as const;
export const SEARCH_BAR_LINKS = NAVIGATION_DRAWER_ITEMS;

export const COLOR_MODES = ["Light", "Dark", "System"];
