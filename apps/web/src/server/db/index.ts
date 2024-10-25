import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as usersSchema from "./schema/users";

const { postgresUrl, devPostgresUrl } = useRuntimeConfig();
const sql = singleton("postgres-client", postgres(import.meta.dev ? devPostgresUrl : postgresUrl));

export const db = drizzle(sql!, {
	schema: {
		...usersSchema,
	},
});
