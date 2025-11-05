 
const AVATAR_CDN_BASE_URL = "https://cdn.id.supercell.com/assets/web/portraits";

export function getCdnUrlForAvatarId(avatarId: string) {
	return `${AVATAR_CDN_BASE_URL}/${avatarId.replaceAll("#", "")}.png`;
}

export function highLowToId(hl: string) {
	const splitHl = hl.split("-").map(Number) as [high: number, low: number];

	let id = 0;
	id += splitHl[0];
	id += Math.floor(splitHl[1] * 256); // << 8

	return id;
}

/**
 * Encode tag string into 64bit unsigned integer string.
 */
export function tagToId(tag: string) {
	if (!/^#?[0289PYLQGRJCUV]{3,}$/.test(tag)) {
		throw new Error("Cannot encode tag " + tag);
	}

	if (tag.startsWith("#")) {
		 
		tag = tag.slice(1);
	}

	// oxlint-disable-next-line prefer-spread
	const result = tag.split("").reduce((sum, c) => sum * BigInt(14) + BigInt("0289PYLQGRJCUV".indexOf(c)), BigInt(0));
	return result.toString();
}

/**
 * Decode 64bit unsigned integer string into tag string with hash.
 */
export function idToTag(idString: string) {
	let id = BigInt(idString);

	let tag = "";
	while (id !== BigInt(0)) {
		const i = Number(id % BigInt(14));
		tag = "0289PYLQGRJCUV"[i] + tag;
		id /= BigInt(14);
	}

	return "#" + tag;
}

export function idToHighLow(id: number) {
	const highLow = [];
	highLow[0] = id % 256;
	highLow[1] = Math.floor(id / 256);

	return highLow;
}
