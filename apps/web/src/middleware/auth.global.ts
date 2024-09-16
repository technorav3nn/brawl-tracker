import { jwtDecode as decode } from "jwt-decode";
import type { User } from "$server/db/schema/users";

// interface LocalStorageToken {
// 	value: string;
// 	expiration: number;
// }

// const EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours

export default defineNuxtRouteMiddleware(async () => {
	const user = useUser();
	const data = (await useRequestFetch()("/api/auth/user")) as User;

	if (data) {
		if (data.scidApiSessionToken) {
			console.log("SCID token exists, checking expiration", data);
			const { exp } = decode(data.scidApiSessionToken);
			if (exp && Date.now() >= exp * 1000) {
				console.log("SCID token expired, fetching new one", data);
				const token = (await useRequestFetch()("/api/auth/scid/api-token")) as string;
				user.value = { ...data, scidApiSessionToken: token };
			} else {
				console.log("SCID token still valid", data);
				user.value = data;
			}
		} else {
			console.log("No SCID token, fetching new one", data);
			const token = (await useRequestFetch()("/api/auth/scid/api-token")) as string;
			user.value = { ...data, scidApiSessionToken: token };
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

// CURL DATA
// curl 'https://security.id.supercell.com/api/security/v1/sessionToken' \
// -H 'Host: security.id.supercell.com' \
// -H 'Accept: */*' \
// -H 'Connection: keep-alive' \
// -H 'baggage: sentry-environment=production,sentry-public_key=54ea4e6fb96a4952a4913faa741f9900,sentry-release=com.supercell.laser.D4Q55SMVB9%4057.325%2B57.325,sentry-trace_id=39d63a4834e04eafb8f29c410479424b' \
// -H 'sentry-trace: 39d63a4834e04eafb8f29c410479424b-ec9a33df2175443e-0' \
// -H 'User-Agent: scid/1.4.16-f (iPadOS 17.1; laser-prod; iPad8,6)' \
// -H 'Accept-Language: en' \
// -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJjNzVhN2Y4M2U5MzMiLCJhbGciOiJFUzI1NiJ9.eyJnYW1lIjoibGFzZXIiLCJodHRwczovL2lkLnN1cGVyY2VsbC5jb20vdHlwZSI6ImFjY291bnQiLCJodHRwczovL2lkLnN1cGVyY2VsbC5jb20vYXBwRW52IjoicHJvZCIsImh0dHBzOi8vaWQuc3VwZXJjZWxsLmNvbS9hcHBBY2NvdW50SWQiOiIyOS0yMzYzNjIyMSIsImh0dHBzOi8vaWQuc3VwZXJjZWxsLmNvbS9pbml0aWFsUmVmcmVzaFRva2VuSXNzdWVkQXQiOjE3MjU4NDY1NzAsInBpZCI6IjI5LTIzNjM2MjIxIiwiaHR0cHM6Ly9pZC5zdXBlcmNlbGwuY29tL2FwcCI6Imxhc2VyIiwiZW52IjoicHJvZCIsInNjaWQiOiIwNy0xZTJiNjI4Ni0zYzc5LTQ3YmEtODc1Yi1hOGNlMzRmYjM5ODgiLCJpc3MiOiJpZC5zdXBlcmNlbGwuY29tIiwic3ViIjoiMDctMWUyYjYyODYtM2M3OS00N2JhLTg3NWItYThjZTM0ZmIzOTg4IiwiaWF0IjoxNzI1ODQ2NTcwfQ.b6ke42iie5sqmwAMzgFoRtVX4fJuxxa5R8UNBYN8PgFPTzpE6MgD7WLqYprCjLe7YT4Iu4VL00ZOEfuuY-Xk0g' \
// -H 'X-Supercell-Device-Id: 0D2CB22F-243F-5843-8A60-3E8F0685BBD0' \
// --proxy http://localhost:9090
