/* eslint-disable @typescript-eslint/no-use-before-define */
import { relations, sql } from "drizzle-orm";
import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const tokens = pgTable("scid_api_tokens", {
	userId: varchar("user_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	sessionToken: varchar("session_token", { length: 800 }).unique().notNull(),
	//	.references((): AnyPgColumn => users.__ATTRIBUTES__sessionToken, { onUpdate: "cascade", onDelete: "cascade" }),
	scidToken: varchar("scid_token", { length: 800 }).unique().notNull(),
	sessionTokenExpiry: timestamp("session_token_expiry", { withTimezone: true, mode: "date" })
		.notNull()
		.default(sql`now() + interval '30 hours'`), // 1d 6h
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("user", {
	id: varchar("id", {
		length: 255,
	}).primaryKey(),
	email: varchar("email", { length: 60 }).unique().notNull(),
	hashedPassword: varchar("hashed_password", { length: 255 }),
	supercellId: varchar("supercell_id", { length: 255 }).unique(),
	username: varchar("username", { length: 30 }).unique().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(() => new Date()),
	// Necessary for lucia, don't use in other places
	__ATTRIBUTES__sessionToken: varchar("session_token", { length: 800 }).unique(),
});

export const supercellIdProfiles = pgTable("supercell_id_profile", {
	userId: varchar("user_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	// Supercell ID name, not in-game name
	name: varchar("name", { length: 255 }).notNull(),
	qrCodeUrl: varchar("qr_code_url", { length: 800 }).notNull(),
	// Not a URL, but is a string that is used to generate a URL
	avatarImage: varchar("avatar_image", { length: 255 }).notNull(),
	universalLink: varchar("universal_link", { length: 255 }).notNull(),
	scid: varchar("scid", { length: 255 }).unique().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(() => new Date()),
});

export type SupercellIdProfileInsert = typeof supercellIdProfiles.$inferInsert;

export const usersRelations = relations(users, ({ one }) => ({
	tokens: one(tokens, {
		fields: [users.id],
		references: [tokens.userId],
	}),
	supercellIdProfiles: one(supercellIdProfiles, {
		fields: [users.id],
		references: [supercellIdProfiles.userId],
	}),
}));

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
