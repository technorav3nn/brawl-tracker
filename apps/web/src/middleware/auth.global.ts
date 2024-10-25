import { jwtDecode as decode } from "jwt-decode";
import type { User } from "lucia";

// interface LocalStorageToken {
// 	value: string;
// 	expiration: number;
// }

// const EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours

export default defineNuxtRouteMiddleware(async () => {
	const user = useUser();
	const data = (await useRequestFetch()("/api/auth/user")) as User;

	if (data) {
		if (data.sessionToken) {
			const { exp } = decode(data.sessionToken);
			if (exp && Date.now() >= exp * 1000) {
				const token = (await useRequestFetch()("/api/auth/scid/api-token")) as string;
				user.value = { ...data, sessionToken: token };
			} else {
				user.value = data;
			}
		} else {
			const token = (await useRequestFetch()("/api/auth/scid/api-token")) as string;
			user.value = { ...data, sessionToken: token };
		}

		// const token = localStorage.getItem("sc-api-token");
		// const tokenData = token ? (JSON.parse(token) as LocalStorageToken) : null;
		// if (!token ?? !tokenData ?? tokenData.expiration < Date.now()) {
		// 	// Remove token from local storage (if it exists, this doesn't throw an error)
		// 	localStorage.removeItem("sc-api-token");
		// 	// fetch new token
		// 	const token = await $fetch("/api/auth/scid/api-token");
		// 	localStorage.setItem(
		// 		"sc-api-token",
		// 		// TODO: add fetch code from api
		// 		JSON.stringify({ value: token, expiration: Date.now() + EXPIRATION_TIME })
		// 	);
		// }
		// // token is still valid so we can use it
	}
});
