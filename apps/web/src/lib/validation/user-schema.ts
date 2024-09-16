import { z } from "zod";
import type { User } from "$server/db/schema/users";

export type UserChangableProperties = Pick<User, "email" | "username">;

export const userSchema = z.object({
	email: z.string().email(),
	username: z.string().min(3).max(32),
	password: z.string().min(6).max(64),
}) satisfies z.Schema<UserChangableProperties>;

export const loginUserSchema = userSchema.pick({
	email: true,
	password: true,
});

export const signupUserSchema = userSchema;
