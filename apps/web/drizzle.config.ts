import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
	schema: "./src/server/db/schema",
	out: "./src/server/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.IS_DEV === "1" ? process.env.DEV_POSTGRES_URL! : process.env.POSTGRES_URL!,
	},
} satisfies Config;
