import { ofetch } from "ofetch";
import { API_URL } from "../constants";

type UrlCreator<T = any> = string | ((...args: T[]) => string);

export function createApiHandler<T extends Record<string, any>, R extends any[] = []>(
	urlCreator: UrlCreator
) {
	return async (...args: R) => {
		const url = `${API_URL}${typeof urlCreator === "function" ? urlCreator(...args) : urlCreator}`;
		return ofetch<T>(url);
	};
}
