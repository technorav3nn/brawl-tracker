export async function login(body: { username: string; password: string }) {
	// eslint-disable-next-line n/prefer-global/url-search-params
	return $fetch("/api/auth/login", { method: "POST", body: new URLSearchParams(body) });
}

export async function signout() {
	return $fetch("/api/auth/signout", { method: "POST" });
}

export async function signup(body: { username: string; password: string; email: string }) {
	// eslint-disable-next-line n/prefer-global/url-search-params
	return $fetch("/api/auth/signup", { method: "POST", body: new URLSearchParams(body) });
}
