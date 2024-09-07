import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as usersSchema from "./schema/users";

export const db = drizzle(sql, {
	logger: import.meta.dev,
	schema: {
		...usersSchema,
	},
});
