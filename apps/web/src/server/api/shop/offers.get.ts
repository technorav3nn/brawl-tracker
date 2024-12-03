import type { ShopBillingPackage, ShopItem } from "@brawltracker/brawl-api";
import { getShop, type Offer } from "@brawltracker/gene-brawl-api";

export interface Item {
	name?: string;
	typeId?: number;
	count: number;
	skinId?: number;
}

export interface NewOffer {
	title: string;
	items: Item[];
	endDate: Date;
	costUSD?: number;
	costGems?: number;
}

function filterOffers(offer: Offer, billingPackage: ShopBillingPackage | null) {
	// Ignore chain offers for now
	if (offer.ValueMul === 2) {
		return false;
	}

	// Ignore bling offers from the side of the shop, since they're random for everybody
	if (offer.PurchaseResource === 6 && offer.ChronosEventId === -1) {
		return false;
	}

	// Offer that has no end time is not valid.
	if (
		offer.SecondsUtilEnd === 2147483647 ||
		offer.SecondsUtilEnd === 1935275 ||
		offer.SecondsUtilEnd === 183022464 ||
		offer.SecondsUtilEnd === 22530426 ||
		offer.SecondsUtilEnd === 22481272
	) {
		return false;
	}

	// Ignore offers that are from Supercell Store.
	if (billingPackage?.SCIDStore) {
		return false;
	}

	// Ignore weird offers without text like PSG skins
	if (offer.TitleText.Text === "") {
		offer.TitleText.Text = "SPECIAL OFFER";
	}

	return true;
}

function mapOffers(offer: Offer, billingPackage: ShopBillingPackage | null, shopItems: ShopItem[]) {
	const items = offer.Items.map((item) => {
		const shopItem = shopItems.find((si) => si.OfferType === item.Type);
		const newItem: Item = {
			name: shopItem?.Name,
			typeId: shopItem?.OfferType,
			count: item.Count,
		};
		if (item.ExtraData !== 0 && item.Type === 4 ? "skinId" : "") {
			newItem.skinId = 29000000 + item.ExtraData;
		}

		return newItem;
	});
	const newOffer: NewOffer = {
		title: offer.TitleText.Text,
		items,
		endDate: new Date(Date.now() + offer.SecondsUtilEnd * 1000),
	};
	if (offer.Cost === 1) {
		newOffer.costUSD = formatUSD(billingPackage!.USD);
	} else {
		newOffer.costGems = offer.Cost;
	}

	return newOffer;
}

function formatUSD(oldUSD: number) {
	return oldUSD / 100;
}

export default eventHandler(
	async () => {
		const brawlApi = useBrawlApi();

		const { response: shop } = await getShop();
		console.log("got shop");
		const shopItems = Object.values(await brawlApi.csv.getShopItems());
		console.log("got shop items");
		const billingPackages = Object.values(await brawlApi.csv.getBillingPackages());
		console.log("got billing packages");
		// return shop.filter(filterOffers);

		return shop
			.filter((offer) => {
				const bp = billingPackages.find((bp) => bp.id === 2000000 + offer.BillingPackageInstanceId);
				return filterOffers(offer, bp ?? null);
			})
			.map((offer) => {
				console.log("mapping offer ", offer.TitleText.Text);
				const bp = billingPackages.find((bp) => bp.id === 2000000 + offer.BillingPackageInstanceId);
				return mapOffers(offer, bp ?? null, shopItems);
			});
	}
	// {
	// 	maxAge: 43200, // 12 hours in seconds
	// }
);
