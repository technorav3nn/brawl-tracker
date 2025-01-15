import { createDecipheriv, createCipheriv, randomBytes } from "node:crypto";

export function aes256cbcDecrypt(data: string, key: string, iv: Buffer) {
	const decipher = createDecipheriv("aes-128-cbc", key, iv);
	const decrypted = decipher.update(data, "base64", "utf8");
	return decrypted + decipher.final("utf8");
}

export function aes256cbcEncrypt(data: string, key: string, iv: Buffer) {
	const cipher = createCipheriv("aes-128-cbc", key, iv);
	let encrypted = cipher.update(data, "utf8", "base64");
	encrypted += cipher.final("base64");
	return encrypted;
}

export function generateIV() {
	return randomBytes(16);
}
