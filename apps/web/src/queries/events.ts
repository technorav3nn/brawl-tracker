const eventKeys = {
	all: () => ["events"] as const,
	type: (type: string) => [...eventKeys.all(), type] as const,
};

export const eventsTypeQuery = (type: string) =>
	queryOptions({
		queryKey: eventKeys.type(type),
		queryFn: async () => {
			const [events, brawlers] = await Promise.all([
				$fetch("/api/events", {
					query: { type },
				}),
				$fetch("/api/brawlers"),
			]);
			return { events, brawlers };
		},
		select: ({ events, brawlers }) => {
			const newImages = brawlers.list.reduce(
				(acc, brawler) => {
					acc[brawler.id] = {
						id: brawler.id,
						imageUrl: brawler.imageUrl2,
					};
					return acc;
				},
				{} as Record<string, { id: number; imageUrl: string }>
			);
			// sort events if their showdown to the top, then the rest doesn't matter, solo showdown first, then duo showdown, then trio showdown
			const newEvents = events.sort((a, b) => {
				const aIsShowdown = a.map.gameMode.name.includes("Showdown");
				const bIsShowdown = b.map.gameMode.name.includes("Showdown");
				if (aIsShowdown && !bIsShowdown) {
					return -1;
				}

				if (!aIsShowdown && bIsShowdown) {
					return 1;
				}

				if (aIsShowdown && bIsShowdown) {
					const aIsSolo = a.map.gameMode.name.includes("Solo");
					const bIsSolo = b.map.gameMode.name.includes("Solo");
					if (aIsSolo && !bIsSolo) {
						return -1;
					}

					if (!aIsSolo && bIsSolo) {
						return 1;
					}

					const aIsDuo = a.map.gameMode.name.includes("Duo");
					const bIsDuo = b.map.gameMode.name.includes("Duo");
					if (aIsDuo && !bIsDuo) {
						return -1;
					}

					if (!aIsDuo && bIsDuo) {
						return 1;
					}
				}

				return 0;
			});
			return { events: newEvents, images: newImages };
		},
	});
