export async function login(body: { username: string; password: string }) {
	return $fetch("/api/auth/login", { method: "POST", body: new URLSearchParams(body) });
}

export async function signout() {
	return $fetch("/api/auth/signout", { method: "POST" });
}

export async function signup(body: { username: string; password: string; email: string }) {
	return $fetch("/api/auth/signup", { method: "POST", body: new URLSearchParams(body) });
}
