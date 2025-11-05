 
import { Buffer } from "node:buffer";
import { createHmac } from "node:crypto";

const RFP_KEY_HEX = "ae584daf58a3757be21fb506dfcfc478fad4600e688d5bb6f3e51ccb2ebfc373";

export function generateRfpHeader(path: string, method: string, body: string, headers: { [key: string]: string }): string {
	const timestamp = Math.floor(Date.now() / 1000);
	const key = Buffer.from(RFP_KEY_HEX, "hex");

	let headersStr = "";
	let headersValueStr = "";
	const headerList = ["Authorization", "User-Agent", "X-Supercell-Device-Id"];

	for (const header of headerList) {
		// eslint-disable-next-line no-prototype-builtins
		if (headers.hasOwnProperty(header)) {
			const headerLower = header.toLowerCase();
			if (headersStr.length > 0) {
				headersStr += ";";
			}

			headersStr += headerLower;
			headersValueStr += `${headerLower}=${headers[header]}`;
		}
	}

	const toSign = `${timestamp}${method}${path}${body}${headersValueStr}`;
	const hmac = createHmac("sha256", key);
	hmac.update(toSign, "utf8");

	const signature = hmac.digest("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

	return `RFPv1 Timestamp=${timestamp},SignedHeaders=${headersStr},Signature=${signature}`;
}
