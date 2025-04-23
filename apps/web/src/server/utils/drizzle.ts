import { drizzle } from "drizzle-orm/d1";
import * as schema from "../database/schema";

export { and, asc, desc, eq, isNull, or, sql, sum } from "drizzle-orm";

export function useDrizzle() {
	const db = drizzle(hubDatabase(), { schema });
	return {
		db,
		...schema,
	};
}

export * as tables from "../database/schema";
