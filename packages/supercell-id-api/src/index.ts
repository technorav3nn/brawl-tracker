import { $fetch } from "ofetch";
import type { ScidFriendsResponse, ScidProfileResponse, SupercellGame } from "./lib/types";

export * from "./lib/types";

const BASE_URL = "https://id.supercell.com/api/ingame";
const AVATAR_CDN_BASE_URL = "https://cdn.id.supercell.com/assets/web/portraits";

const HEADERS = {
	Host: "id.supercell.com",
	Accept: "*/*",
	baggage:
		"sentry-environment=production,sentry-public_key=54ea4e6fb96a4952a4913faa741f9900,sentry-release=com.supercell.laser.D4Q55SMVB9%4057.325%2B57.325,sentry-trace_id=9841d06156d74bd982c43815de9a9e1f",
	"X-Supercell-Device-Id": "0D2CB22F-243F-5843-8A60-3E8F0685BBD0",
	"Accept-Language": "en",
	"sentry-trace": "9841d06156d74bd982c43815de9a9e1f-2ce6920d43e244ec-0",
	"User-Agent": "scid/1.4.16-f (iPadOS 18.0; laser-prod; iPad8,6)",
	Connection: "keep-alive",
	"X-Supercell-Request-Forgery-Protection":
		"RFPv1 Timestamp=1726888916,SignedHeaders=user-agent;x-supercell-device-id,Signature=knrq54n8oN3MT6q8w1dtzzy1NSizWuA0y4_5MQ2Q-Bw",
	"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
};

// const LOGIN_BODY = {
// 	lang: "en",
// 	env: "prod",
// 	recaptchaToken: "FAILED_INIT",
// 	recaptchaSiteKey: "6Lf3ThsqAAAAABuxaWIkogybKxfxoKxtR-aq5g",
// 	remember: "true",
// };

export async function sendLoginCode(email: string, game: SupercellGame) {
	return $fetch<{ ok: boolean }>(`${BASE_URL}/account/login`, {
		headers: HEADERS,
		method: "POST",
		body: `lang=en&email=${encodeURIComponent(email)}&remember=true&game=${game}&env=prod&recaptchaToken=FAILED_INIT&recaptchaSiteKey=6Lf3ThsqAAAAABuxaWIkogybKxfxoKxtR-aq5g7l`,
	});
}

export async function validateLoginCode(email: string, pin: number | string) {
	return $fetch<{ ok: boolean }>(`${BASE_URL}/account/login.validate`, {
		headers: HEADERS,
		method: "POST",
		body: `email=${encodeURIComponent(email)}&pin=${pin}`,
	});
}

export async function confirmLoginCode(email: string, pin: number | string) {
	return $fetch<Record<string, any>>(`${BASE_URL}/account/login.confirm`, {
		headers: HEADERS,
		method: "POST",
		body: `email=${encodeURIComponent(email)}&pin=${pin}`,
	});
}

export async function getSessionToken(scidToken: string) {
	return $fetch<{ ok: boolean; token: string }>("https://security.id.supercell.com/api/security/v1/sessionToken", {
		headers: {
			...HEADERS,
			Authorization: `Bearer ${scidToken}`,
			"User-Agent": "scid/1.4.16-f (iPadOS 17.1; laser-prod; iPad8,6)",
			"X-Supercell-Device-Id": "0D2CB22F-243F-5843-8A60-3E8F0685BBD0",
		},
	});
}

export async function initalizeSession(sessionToken: string, scidToken: string) {
	return $fetch<ScidProfileResponse>("https://id.supercell.com/api/social/v3/session.init", {
		method: "POST",
		headers: {
			...HEADERS,
			Authorization: `Bearer ${sessionToken}`,
			"X-Supercell-Request-Forgery-Protection":
				"RFPv1 Timestamp=1725847185,SignedHeaders=authorization;user-agent;x-supercell-device-id,Signature=dt4nQA2ZRLQPSvsst8TsF7Ct65_Jcuu6iRI6qZ4FYik",
			"User-Agent": "scid/1.4.16-f (iPadOS 17.1; laser-prod; iPad8,6)",
			"X-Supercell-Device-Id": "0D2CB22F-243F-5843-8A60-3E8F0685BBD0",
		},
		body: new URLSearchParams({ applicationAccountToken: scidToken }),
	});
}

export async function getProfile(sessionToken: string, scid?: string) {
	return $fetch<ScidProfileResponse>("https://id.supercell.com/api/social/v3/profile.get", {
		method: "POST",
		headers: {
			...HEADERS,
			Authorization: `Bearer ${sessionToken}`,
			"X-Supercell-Request-Forgery-Protection":
				"RFPv1 Timestamp=1725847185,SignedHeaders=authorization;user-agent;x-supercell-device-id,Signature=dt4nQA2ZRLQPSvsst8TsF7Ct65_Jcuu6iRI6qZ4FYik",
			"User-Agent": "scid/1.4.16-f (iPadOS 17.1; laser-prod; iPad8,6)",
			"X-Supercell-Device-Id": "0D2CB22F-243F-5843-8A60-3E8F0685BBD0",
		},
		body: scid ? `scid=${encodeURIComponent(scid)}` : "fetchConnectedSystems=true",
	});
}

export async function getFriends(sessionToken: string) {
	return $fetch<ScidFriendsResponse>("https://id.supercell.com/api/social/v3/friends.list", {
		method: "POST",
		headers: {
			...HEADERS,
			Authorization: `Bearer ${sessionToken}`,
		},
		body: "fetchPresence=false",
	});
}

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
