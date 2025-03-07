import { type Models } from "appwrite";
import { type User } from "$server/db/users/types";

export const useUser = () => {
	// eslint-disable-next-line sonarjs/prefer-immediate-return
	const user = useState<Models.User<Models.Preferences> | null>("user", () => null);
	return user;
};

export function useDatabaseUser() {
	// eslint-disable-next-line sonarjs/prefer-immediate-return
	const dbUser = useState<Omit<User, "savedPlayers"> | null>("dbUser", () => null);
	return dbUser;
}
