import type { User } from "lucia";

export const useUser = () => {
	// eslint-disable-next-line sonarjs/prefer-immediate-return
	const user = useState<User | null>("user", () => null);
	return user;
};
