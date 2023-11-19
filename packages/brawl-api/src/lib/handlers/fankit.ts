import { FANKIT_URL } from "../constants";

export function createFanKitAssetUrl(asset: string) {
	return `${FANKIT_URL}/${asset}`;
}
