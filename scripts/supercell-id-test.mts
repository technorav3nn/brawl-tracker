import { writeFile } from "node:fs/promises";
import process from "node:process";
import { URLSearchParams } from "node:url";
import { confirmLoginCode } from "@brawltracker/supercell-id-api";

const BASE_URL = "https://id.supercell.com/api/ingame";

const HEADERS = {
	accept: "application/json, text/plain, */*",
	"accept-language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
	"content-type": "application/x-www-form-urlencoded",
	"User-Agent": "scid/1.4.16-f (iPadOS 17.1; laser-prod; iPad8,6)",
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
	// read code from stdin
	const code = await new Promise<string>((resolve) => {
		process.stdin.once("data", (data) => {
			resolve(data.toString().trim());
		});
	});

	const json = await confirmLoginCode(DATA.email, code);
	const scidToken = json.data.scidToken;
	const scid = json.data.scid;
	console.log(json, scidToken);

	await fetch(`${BASE_URL}/account/links.get`, {
		headers: {
			...HEADERS,
			Authorization: `Bearer ${scid}`,
		},
		method: "POST",
		body: new URLSearchParams({ scid_token: scidToken }),
	})
		.then(async (res) => res.json())
		.then(writeData);
	await fetch(`${BASE_URL}/account/settings.get`, {
		headers: {
			...HEADERS,
			Authorization: `Bearer ${scid}`,
		},
		method: "POST",
		body: new URLSearchParams({ scid_token: scidToken }),
	})
		.then(async (res) => res.json())
		.then(writeData);
})();

async function writeData(data: any) {
	await writeFile(`data.json-${Math.random()}`, JSON.stringify(data, null, 2));
}
