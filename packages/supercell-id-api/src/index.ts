import { $fetch } from "ofetch";
import { generateRfpHeader } from "./lib/generate-rfp";
import type { ScidFriendsResponse, ScidProfileResponse, ScidProfilesResponse, SupercellGame } from "./lib/types";

export * from "./lib/types";

const randomUUID = crypto.randomUUID.bind(crypto);

const BASE_URL = "https://id.supercell.com/api/ingame";

const DEFAULT_USER_AGENT = "scid/1.5.8-f (iPadOS 18.1; laser-prod; iPad8,6) com.supercell.laser/59.197";
const RECAPTCHA_SITE_KEY = "6Lf3ThsqAAAAABuxaWIkogybKxfxoKxtR-aq5g7l";

const DEFAULT_HEADERS = {
	"User-Agent": DEFAULT_USER_AGENT,
	"Accept-Language": "en",
	"Accept-Encoding": "gzip",
	// "X-Supercell-Device-Id": randomUUID().toUpperCase(),
	"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
};

export async function sendLoginCode(email: string, game: SupercellGame) {
	const uuid = randomUUID().toUpperCase();
	const body = new URLSearchParams({
		lang: "en",
		email,
		remember: "true",
		game,
		env: "prod",
		recaptchaToken: "FAILED_INIT",
		recaptchaSiteKey: RECAPTCHA_SITE_KEY,
	});

	const headers = {
		"User-Agent": DEFAULT_USER_AGENT,
		"X-Supercell-Device-Id": uuid,
	};
	const rfp = generateRfpHeader("/api/ingame/account/login", "POST", body.toString(), headers);

	return $fetch<{ ok: boolean }>(`${BASE_URL}/account/login`, {
		headers: { ...DEFAULT_HEADERS, ...headers, "X-Supercell-Request-Forgery-Protection": rfp },
		method: "POST",
		body,
	});
}

export async function validateLoginCode(email: string, pin: number | string) {
	const uuid = randomUUID().toUpperCase();
	const body = new URLSearchParams({ email, pin: String(pin) });

	const headers = {
		"User-Agent": DEFAULT_USER_AGENT,
		"X-Supercell-Device-Id": uuid,
	};
	const rfp = generateRfpHeader("/api/ingame/account/login.validate", "POST", body.toString(), headers);

	return $fetch<{ ok: boolean }>(`${BASE_URL}/account/login.validate`, {
		headers: { ...DEFAULT_HEADERS, ...headers, "X-Supercell-Request-Forgery-Protection": rfp },
		method: "POST",
		body,
	});
}

export async function confirmLoginCode(email: string, pin: number | string) {
	const uuid = randomUUID().toUpperCase();
	const body = new URLSearchParams({ email, pin: String(pin) });
	//	const rfp = generateRfpHeader("POST", "/api/ingame/account/login.confirm", body, DEFAULT_USER_AGENT, uuid);
	const headers = {
		"User-Agent": DEFAULT_USER_AGENT,
		"X-Supercell-Device-Id": uuid,
	};
	const rfp = generateRfpHeader("/api/ingame/account/login.confirm", "POST", body.toString(), headers);

	return $fetch<Record<string, any>>(`${BASE_URL}/account/login.confirm`, {
		headers: { ...DEFAULT_HEADERS, ...headers, "X-Supercell-Request-Forgery-Protection": rfp },
		method: "POST",
		body: `email=${encodeURIComponent(email)}&pin=${pin}`,
	});
}

export async function getSessionToken(scidToken: string) {
	const uuid = randomUUID().toUpperCase();

	const headers = {
		"User-Agent": DEFAULT_USER_AGENT,
		"X-Supercell-Device-Id": uuid,
	};
	const rfp = generateRfpHeader("/api/security/v1/sessionToken", "POST", "", headers);

	return $fetch<{ ok: boolean; token: string }>("https://security.id.supercell.com/api/security/v1/sessionToken", {
		headers: {
			...DEFAULT_HEADERS,
			...headers,
			Authorization: `Bearer ${scidToken}`,
			"X-Supercell-Request-Forgery-Protection": rfp,
		},
	});
}

export async function initalizeSession(sessionToken: string, scidToken: string) {
	const uuid = randomUUID().toUpperCase();
	const body = new URLSearchParams({ applicationAccountToken: scidToken });
	const headers = {
		"User-Agent": DEFAULT_USER_AGENT,
		"X-Supercell-Device-Id": uuid,
		Authorization: `Bearer ${sessionToken}`,
	};

	const rfp = generateRfpHeader("/api/social/v3/session.init", "POST", body.toString(), headers);
	return $fetch<ScidProfileResponse>("https://id.supercell.com/api/social/v3/session.init", {
		method: "POST",
		headers: {
			...DEFAULT_HEADERS,
			...headers,
			"X-Supercell-Request-Forgery-Protection": rfp,
		},
		body,
	});
}

export async function getProfile(sessionToken: string, scid?: string) {
	const uuid = randomUUID().toUpperCase();
	const body = scid ? `scid=${scid}` : `fetchGameData=false`;

	const headers = {
		Authorization: `Bearer ${sessionToken}`,
		"User-Agent": DEFAULT_USER_AGENT,
		"X-Supercell-Device-Id": uuid,
	};

	const rfp = generateRfpHeader("/api/social/v3/profile.get", "POST", body, headers);

	return $fetch<ScidProfileResponse>("https://id.supercell.com/api/social/v3/profile.get", {
		method: "POST",
		headers: {
			...DEFAULT_HEADERS,
			...headers,
			"X-Supercell-Request-Forgery-Protection": rfp,
			"Content-Length": String(body.length),
		},
		body,
	});
}

export async function listProfiles(sessionToken: string, list: string[], type: "appAccountIds" | "handles" | "scids") {
	const uuid = randomUUID().toUpperCase();

	const body = new URLSearchParams({
		[type]: `[${list.map((id) => `"${id}"`).join(",")}]`,
		format: "BASIC",
	});

	const headers = {
		Authorization: `Bearer ${sessionToken}`,
		"User-Agent": DEFAULT_USER_AGENT,
		"X-Supercell-Device-Id": uuid,
	};

	const rfp = generateRfpHeader("/api/social/v3/profiles.list", "POST", body.toString(), headers);
	return $fetch<ScidProfilesResponse>("https://id.supercell.com/api/social/v3/profiles.list", {
		method: "POST",
		headers: {
			...DEFAULT_HEADERS,
			...headers,
			"X-Supercell-Request-Forgery-Protection": rfp,
			"Content-Length": body.toString().length.toString(),
		},
		body,
	});
}

export async function getFriends(sessionToken: string, scid?: string) {
	const uuid = randomUUID().toUpperCase();
	const body = new URLSearchParams(scid ? { scid } : { fetchPresence: "false" });

	const headers = {
		Authorization: `Bearer ${sessionToken}`,
		"User-Agent": DEFAULT_USER_AGENT,
		"X-Supercell-Device-Id": uuid,
	};
	const rfp = generateRfpHeader("/api/social/v3/friends.list", "POST", body.toString(), headers);

	return $fetch<ScidFriendsResponse>("https://id.supercell.com/api/social/v3/friends.list", {
		method: "POST",
		headers: {
			...DEFAULT_HEADERS,
			...headers,
			"X-Supercell-Request-Forgery-Protection": rfp,
		},
		body,
	});
}

export async function sendFriendRequest(sessionToken: string, scids: string[]) {
	const body = new URLSearchParams({
		scids: `[${scids.map((id) => `"${id}"`).join(",")}]`,
	});

	const uuid = randomUUID().toUpperCase();

	const headers = {
		Authorization: `Bearer ${sessionToken}`,
		"User-Agent": DEFAULT_USER_AGENT,
		"X-Supercell-Device-Id": uuid,
	};

	const rfp = generateRfpHeader("/api/social/v3/friends.createRequest", "POST", body.toString(), headers);

	return $fetch<{ data: Record<string, any>; ok: boolean }>("https://id.supercell.com/api/social/v3/friends.createRequest", {
		method: "POST",
		headers: {
			...DEFAULT_HEADERS,
			...headers,
			"X-Supercell-Request-Forgery-Protection": rfp,
		},
		body,
	});
}

export async function acceptFriendRequest(sessionToken: string, scids: string[]) {
	const body = new URLSearchParams({
		scids: `[${scids.map((id) => `"${id}"`).join(",")}]`,
	});

	const uuid = randomUUID().toUpperCase();

	const headers = {
		Authorization: `Bearer ${sessionToken}`,
		"User-Agent": DEFAULT_USER_AGENT,
		"X-Supercell-Device-Id": uuid,
	};

	const rfp = generateRfpHeader("/api/social/v3/friends.acceptRequest", "POST", body.toString(), headers);

	return $fetch<{ data: Record<string, any>; ok: boolean }>("https://id.supercell.com/api/social/v3/friends.acceptRequest", {
		method: "POST",
		headers: {
			...DEFAULT_HEADERS,
			...headers,
			"X-Supercell-Request-Forgery-Protection": rfp,
		},
		body,
	});
}

export async function removeFriend(sessionToken: string, scid: string) {
	const body = new URLSearchParams({
		scid,
	});

	const uuid = randomUUID().toUpperCase();

	const headers = {
		Authorization: `Bearer ${sessionToken}`,
		"User-Agent": DEFAULT_USER_AGENT,
		"X-Supercell-Device-Id": uuid,
	};

	const rfp = generateRfpHeader("/api/social/v3/friends.remove", "POST", body.toString(), headers);

	return $fetch<{ data: Record<string, any>; ok: boolean }>("https://id.supercell.com/api/social/v3/friends.remove", {
		method: "POST",
		headers: {
			...DEFAULT_HEADERS,
			...headers,
			"X-Supercell-Request-Forgery-Protection": rfp,
		},
		body,
	});
}
