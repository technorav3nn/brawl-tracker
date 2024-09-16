import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as usersSchema from "./schema/users";

neonConfig.fetchEndpoint = (host) => {
	const [protocol, port] = host === "db.localtest.me" ? ["http", 4444] : ["https", 4444];
	const a = `${protocol}://${host}:${port}/sql`;
	console.log(a);
	return a;
};

const { postgresUrl } = useRuntimeConfig();

const sql = neon(postgresUrl);

export const db = drizzle(sql, {
	logger: import.meta.dev,
	schema: {
		...usersSchema,
	},
});
