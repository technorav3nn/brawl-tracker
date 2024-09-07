import { URLSearchParams } from "node:url";

const BASE_URL = "https://id.supercell.com/api/ingame";

const HEADERS = {
	accept: "application/json, text/plain, */*",
	"accept-language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
	"content-type": "application/x-www-form-urlencoded",
};

const DATA = {
	email: "colin01460@outlook.com",
	game: "laser",
	lang: "en",
	env: "prod",
};

(async () => {
	const res = await fetch(`${BASE_URL}/account/login`, {
		headers: HEADERS,
		method: "POST",
		body: new URLSearchParams(DATA),
	});
	const text = await res.text();
	console.log(text);
})();
