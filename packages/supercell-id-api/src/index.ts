import { $fetch } from "ofetch";
import type { ScidProfileResponse, SupercellGame } from "./lib/types";

const BASE_URL = "https://id.supercell.com/api/ingame";
const AVATAR_CDN_BASE_URL = "https://cdn.id.supercell.com/assets/web/portraits";

const HEADERS = {
	accept: "application/json, text/plain, */*",
	"accept-language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
	"content-type": "application/x-www-form-urlencoded",
};

// const LOGIN_BODY = {
// 	lang: "en",
// 	env: "prod",
// };

export async function sendLoginCode(email: string, game: SupercellGame) {
	const formData = new FormData();
	formData.append("email", email);
	formData.append("game", game);
	formData.append("lang", "en");
	formData.append("env", "prod");

	return $fetch<{ ok: boolean }>(`${BASE_URL}/account/login`, {
		headers: HEADERS,
		method: "POST",
		body: new URLSearchParams({ email, game }),
	});
}

export async function validateLoginCode(email: string, pin: number | string) {
	const formData = new FormData();
	formData.append("email", email);
	formData.append("pin", pin.toString());

	return $fetch<{ ok: boolean }>(`${BASE_URL}/account/login.validate`, {
		headers: HEADERS,
		method: "POST",
		body: formData,
	});
}

export async function confirmLoginCode(email: string, pin: number | string) {
	const formData = new FormData();
	formData.append("email", email);
	formData.append("pin", pin.toString());

	return $fetch<Record<string, any>>(`${BASE_URL}/account/login.confirm`, {
		headers: HEADERS,
		method: "POST",
		body: formData,
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
	const formData = new FormData();
	formData.append("applicationAccountToken", scidToken);

	return $fetch<ScidProfileResponse>("https://id.supercell.com/api/social/v3/session.init", {
		method: "POST",
		headers: {
			...HEADERS,
			Authorization: `Bearer ${sessionToken}`,
			"X-Supercell-Request-Forgery-Protection":
				"RFPv1 Timestamp=1725847185,SignedHeaders=authorization;user-agent;x-supercell-device-id,Signature=dt4nQA2ZRLQPSvsst8TsF7Ct65_Jcuu6iRI6qZ4FYik",
			"User-Agent": "scid/1.4.16-f (iPadOS 17.1; laser-prod; iPad8,6)",
			"X-Supercell-Device-Id": "0D2CB22F-243F-5843-8A60-3E8F0685BBD0",
			// "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
		},
		body: formData,
	});
}

export async function getProfile(sessionToken: string) {
	const formData = new FormData();
	formData.append("fetchConnectedSystems", true);
	return $fetch<ScidProfileResponse>("https://id.supercell.com/api/social/v3/profile.get", {
		headers: {
			...HEADERS,
			Authorization: `Bearer ${sessionToken}`,
			"X-Supercell-Request-Forgery-Protection":
				"RFPv1 Timestamp=1725847185,SignedHeaders=authorization;user-agent;x-supercell-device-id,Signature=dt4nQA2ZRLQPSvsst8TsF7Ct65_Jcuu6iRI6qZ4FYik",
			"User-Agent": "scid/1.4.16-f (iPadOS 17.1; laser-prod; iPad8,6)",
			"X-Supercell-Device-Id": "0D2CB22F-243F-5843-8A60-3E8F0685BBD0",
		},
		body: {
			fetchConnectedSystems: true,
		},
	});
}

export function getCdnUrlForAvatarId(avatarId: string) {
	return `${AVATAR_CDN_BASE_URL}/${avatarId.replaceAll("#", "")}.png`;
}
