import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
	id: varchar("id", {
		length: 255,
	}).primaryKey(),
	supercellId: varchar("supercell_id", { length: 255 }).unique(),
	scidToken: varchar("scid_token", { length: 800 }).unique(),
	scidApiSessionToken: varchar("scid_api_session_token", { length: 800 }).unique(),
	username: varchar("username", { length: 30 }).unique().notNull(),
	email: varchar("email", { length: 60 }).unique().notNull(),
	hashedPassword: varchar("hashed_password", { length: 255 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(() => new Date()),
});

export const sessions = pgTable("session", {
	id: varchar("id", {
		length: 255,
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 255,
	})
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
});

export type User = typeof users.$inferSelect;
