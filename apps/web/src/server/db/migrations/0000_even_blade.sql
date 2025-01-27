CREATE TABLE "session" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"ip_country" varchar(4) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supercell_id_profile" (
	"user_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"qr_code_url" varchar(800) NOT NULL,
	"avatar_image" varchar(255) NOT NULL,
	"universal_link" varchar(255) NOT NULL,
	"scid" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "supercell_id_profile_scid_unique" UNIQUE("scid")
);
--> statement-breakpoint
CREATE TABLE "scid_api_tokens" (
	"user_id" varchar(255) NOT NULL,
	"session_token" varchar(800) NOT NULL,
	"scid_token" varchar(985) NOT NULL,
	"scid_token_iv" varchar(64) NOT NULL,
	"session_token_expiry" timestamp with time zone DEFAULT now() + interval '30 hours' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "scid_api_tokens_session_token_unique" UNIQUE("session_token"),
	CONSTRAINT "scid_api_tokens_scid_token_unique" UNIQUE("scid_token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"hashed_password" varchar(255),
	"supercell_id" varchar(255),
	"username" varchar(30) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"saved_tags" varchar[] DEFAULT ARRAY[]::text[] NOT NULL,
	"saved_club_tags" varchar[] DEFAULT ARRAY[]::text[] NOT NULL,
	"session_token" varchar(800),
	CONSTRAINT "user_supercell_id_unique" UNIQUE("supercell_id"),
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supercell_id_profile" ADD CONSTRAINT "supercell_id_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scid_api_tokens" ADD CONSTRAINT "scid_api_tokens_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;