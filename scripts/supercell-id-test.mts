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
	// const res = await fetch(`https://id.supercell.com/api/social/v3/profile.get`, {
	// 	headers: HEADERS,
	// 	method: "POST",
	// 	body: new URLSearchParams(DATA),
	// });
	// const text = await res.text();
	// console.log(text);
	// // read code from stdin
	// const code = await new Promise<string>((resolve) => {
	// 	process.stdin.once("data", (data) => {
	// 		resolve(data.toString().trim());
	// 	});
	// });

	// const json = await confirmLoginCode(DATA.email, code);
	// const scidToken = json.data.scidToken;
	// const scid = json.data.scid;
	// console.log(json, scidToken);

	// await fetch(`${BASE_URL}/account/links.get`, {
	// 	headers: {
	// 		...HEADERS,
	// 		Authorization: `Bearer ${scid}`,
	// 	},
	// 	method: "POST",
	// 	body: new URLSearchParams({ scid_token: scidToken }),
	// })
	// 	.then(async (res) => res.json())
	// 	.then(writeData);
	// await fetch(`${BASE_URL}/account/settings.get`, {
	// 	headers: {
	// 		...HEADERS,
	// 		Authorization: `Bearer ${scid}`,
	// 	},
	// 	method: "POST",
	// 	body: new URLSearchParams({ scid_token: scidToken }),
	// })
	// 	.then(async (res) => res.json())
	// 	.then(writeData);

	const res = await fetch("https://id.supercell.com/api/social/v3/profile.get", {
		method: "POST",
		headers: {
			...HEADERS,
			Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImM3NWE3ZjgzZTkzMyJ9.eyJzdWIiOiI4Ni1kNDU4MzE0ZS02MDhiLTQ3ZDItOTBlOC02OGYwYzg0YTYxMjIiLCJnYW1lIjoibGFzZXIiLCJpc3MiOiJpZC5zdXBlcmNlbGwuY29tIiwicGlkIjoiMjgtMjI3NTM5MjciLCJodHRwczovL2lkLnN1cGVyY2VsbC5jb20vYXBwIjoibGFzZXIiLCJlbnYiOiJwcm9kIiwiYXVkIjoic2Vzc2lvbiIsImh0dHBzOi8vaWQuc3VwZXJjZWxsLmNvbS90eXBlIjoic2Vzc2lvbiIsImh0dHBzOi8vaWQuc3VwZXJjZWxsLmNvbS9hcHBFbnYiOiJwcm9kIiwiaHR0cHM6Ly9pZC5zdXBlcmNlbGwuY29tL2FwcEFjY291bnRJZCI6IjI4LTIyNzUzOTI3IiwiaHR0cHM6Ly9pZC5zdXBlcmNlbGwuY29tL2luaXRpYWxSZWZyZXNoVG9rZW5Jc3N1ZWRBdCI6MTcyNzcxNjIxOCwiZXhwIjoxNzI4MDc5NTE4LCJpYXQiOjE3Mjc5MDY3MTgsInNjaWQiOiI4Ni1kNDU4MzE0ZS02MDhiLTQ3ZDItOTBlOC02OGYwYzg0YTYxMjIifQ.x4UZt9MBErYOdeNBybQbw7ar6YtY8EtyTiqpI4rqMEAQ7a1liMCO8DiAfpw7QA3T9YLmNf72HFX7_xLz0TbtlQ`,
			"X-Supercell-Request-Forgery-Protection":
				"RFPv1 Timestamp=198004252345,SignedHeaders=authorization;user-agent;x-supercell-device-id,Signature=dt4nQA2ZRLQPSvsst8TsF7Ct65_Jcuu6iRI6qZ4FYik",
			"User-Agent": "scid/1.4.16-f (iPadOS 17.1; laser-prod; iPad8,6)",
			"X-Supercell-Device-Id": "0ASCB22F-243F-5843-8A60-3E8F0685BBD0",
		},
		body: "fetchConnectedSystems=true",
	});
	const json = await res.json();
	console.log(json);
})();

async function writeData(data: any) {
	await writeFile(`data.json-${Math.random()}`, JSON.stringify(data, null, 2));
}
