import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
	schema: "./src/server/db/schema",
	out: "./src/server/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.POSTGRES_URL!,
	},
} satisfies Config;
