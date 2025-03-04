export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface Price {
	coins: number;
	powerpoints: number;
}

export interface GearSlot {
	type: "epic" | "mythic" | "super_rare";
	price: 1_000 | 1_500 | 2_000;
}

interface GetTotalOptions {
	currentLevel: Level | (number & {});
	wantedLevel: Level | (number & {});
	gadgets?: number;
	starPowers?: number;
	hypercharge?: boolean;
	gears?: {
		slot1?: GearSlot;
		slot2?: GearSlot;
	};
}

const HYPERCHARGE_COINS_PRICE = 5_000;
const STAR_POWER_COINS_PRICE = 2_000;
const GADGET_COINS_PRICE = 1_000;

const PRICES: Record<number, Price> = {
	// every brawler is level 1 when you unlock it
	1: {
		powerpoints: 0,
		coins: 0,
	},
	2: {
		powerpoints: 20,
		coins: 20,
	},
	3: {
		powerpoints: 30,
		coins: 35,
	},
	4: {
		powerpoints: 50,
		coins: 75,
	},
	5: {
		powerpoints: 80,
		coins: 140,
	},
	6: {
		powerpoints: 130,
		coins: 290,
	},
	7: {
		powerpoints: 210,
		coins: 480,
	},
	8: {
		powerpoints: 340,
		coins: 800,
	},
	9: {
		powerpoints: 550,
		coins: 1_250,
	},
	10: {
		powerpoints: 890,
		coins: 1_875,
	},
	11: {
		powerpoints: 1_440,
		coins: 2_800,
	},
};

export function getBrawlerTotalLevelPrice({
	hypercharge,
	currentLevel,
	wantedLevel,
	starPowers,
	gadgets,
	gears,
}: GetTotalOptions): Price {
	const basePrice = Object.entries(PRICES)
		.slice(currentLevel, wantedLevel)
		.reduce<Price>(
			(acc, [, price]) => {
				acc.coins += price.coins;
				acc.powerpoints += price.powerpoints;
				return acc;
			},
			{ coins: 0, powerpoints: 0 }
		);

	if (hypercharge) {
		basePrice.coins += HYPERCHARGE_COINS_PRICE;
	}

	if (starPowers) {
		basePrice.coins += STAR_POWER_COINS_PRICE * starPowers;
	}

	if (gadgets) {
		basePrice.coins += GADGET_COINS_PRICE * gadgets;
	}

	if (gears?.slot1) {
		basePrice.coins += gears.slot1.price;
	}

	if (gears?.slot2) {
		basePrice.coins += gears.slot2.price;
	}

	return basePrice;
}
