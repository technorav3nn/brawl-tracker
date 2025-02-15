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

const TAG_CHARACTERS = ["0", "2", "8", "9", "P", "Y", "L", "Q", "G", "R", "J", "C", "U", "V"];

export function idToTag(id: number) {
	// eslint-disable-next-line no-param-reassign
	id *= 1;

	const hashtag = [];

	while (id > 0) {
		hashtag.unshift(TAG_CHARACTERS[id % TAG_CHARACTERS.length]);
		// eslint-disable-next-line no-param-reassign
		id = Math.floor(id / TAG_CHARACTERS.length);
	}

	return "#" + hashtag.join("");
}
