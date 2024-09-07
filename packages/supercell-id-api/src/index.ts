import { $fetch } from "ofetch";

const BASE_URL = "https://id.supercell.com/api/ingame";

const HEADERS = {
	accept: "application/json, text/plain, */*",
	"accept-language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
	"content-type": "application/x-www-form-urlencoded",
};

const LOGIN_BODY = {
	lang: "en",
	env: "prod",
};

export function sendLoginCode(email: string, game: SupercellGame) {
	return $fetch<{ ok: boolean }>(`${BASE_URL}/account/login`, {
		headers: HEADERS,
		method: "POST",
		body: new URLSearchParams({ ...LOGIN_BODY, email, game }),
	});
}

export function validateLoginCode(email: string, pin: string | number) {
	return $fetch<{ ok: boolean }>(`${BASE_URL}/account/login.validate`, {
		headers: HEADERS,
		method: "POST",
		body: new URLSearchParams({ email, pin: pin.toString() }),
	});
}

type SupercellGame = "laser" | "magic" | "soil" | "scroll" | "squad" | "sand";
