import { type Models } from "appwrite";
import type { UseFetchOptions } from "nuxt/app";
import { type User } from "$server/db/users/types";

export const useUser = () => {
	// eslint-disable-next-line sonarjs/prefer-immediate-return
	const user = useState<Models.User<Models.Preferences> | null>("user", () => null);
	return user;
};

export function useDatabaseUser(options: UseFetchOptions<User> = {}) {
	return useFetch<User>("/api/auth/database-user", { key: "database-user", ...options });
}
