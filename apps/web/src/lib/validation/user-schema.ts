import { z } from "zod";
import type { ToZodSchema } from "$lib/types/zod";
import type { User } from "$server/db/schema/users";

export type UserBaseSchema = Pick<User, "email" | "savedClubTags" | "savedPlayerTags" | "username">;

export const userSchema = z.object({
	savedPlayerTags: z.array(z.string()),
	savedClubTags: z.array(z.string()),
	email: z.string().email(),
	username: z.string().min(3).max(32),
} satisfies ToZodSchema<UserBaseSchema>);

export const userProfileSettingsSchema = userSchema.pick({
	savedPlayerTags: true,
	savedClubTags: true,
});

export const loginUserSchema = userSchema.merge(
	z.object({
		password: z.string().min(6).max(64),
	})
);

export const signupUserSchema = loginUserSchema;
