import type { BrawlApiEvent } from "@brawltracker/brawl-api";

export const usePassedDownEvents = () => {
	const events = computed(() => {
		const { events: _events } = useAttrs() as {
			events: {
				active: BrawlApiEvent[];
				upcoming: BrawlApiEvent[];
				league: BrawlApiEvent[];
				images: Record<string, BrawlApiBrawlerWithOnlyImages>;
			};
		};
		return _events;
	});

	const currentEvents = computed(() => events.value.active);
	const upcomingEvents = computed(() => events.value.upcoming);
	const leagueEvents = computed(() => events.value.league);

	return { leagueEvents, currentEvents, upcomingEvents, events };
};
