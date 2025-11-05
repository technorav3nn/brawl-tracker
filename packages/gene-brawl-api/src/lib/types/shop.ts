 
export interface Offer {
	Items: Item[];
	PurchaseResource: number;
	Cost: number;
	SecondsUtilEnd: number;
	State: number;
	ValueMul: number;
	Purchased: boolean;
	ChronosEventId: number;
	ChronosVariantId: number;
	MiniOffer: boolean;
	TitleText: TitleText;
	DisplayPopup: boolean;
	BgFrameName: string;
	BillingPackageInstanceId: number;
	IAPOfferPurchaseInProgress: boolean;
	TagType: number;
	TagValue: number;
	ShopAssetName: any;
	ShowOneTimeText: boolean;
	ShopPanelLayoutData: any;
	Variety: number;
}

export interface Item {
	Type: number;
	Count: number;
	Hero: any;
	ExtraData: number;
}

export interface TitleText {
	ChronosType: number;
	Text: string;
}

export interface ShopResponse {
	state: number;
	apiInfo: string;
	lastUpdate: number;
	response: Offer[];
}
