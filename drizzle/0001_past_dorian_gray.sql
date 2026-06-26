ALTER TABLE "subscription" ADD COLUMN IF NOT EXISTS "organization_id" text;
--> statement-breakpoint
ALTER TABLE "subscription" ADD COLUMN IF NOT EXISTS "created_by_user_id" text;
--> statement-breakpoint
DO $$ BEGIN
	ALTER TABLE "subscription" ADD CONSTRAINT "subscription_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
	WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
	ALTER TABLE "subscription" ADD CONSTRAINT "subscription_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
	WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
INSERT INTO "organization" ("id", "name", "slug", "created_at")
SELECT
	'personal_' || "id",
	COALESCE(NULLIF("name", ''), "email") || '''s Subman',
	'personal-' || md5("id"),
	NOW()
FROM "user"
ON CONFLICT ("slug") DO NOTHING;
--> statement-breakpoint
INSERT INTO "member" ("id", "organization_id", "user_id", "role", "created_at")
SELECT
	'member_' || "id",
	'personal_' || "id",
	"id",
	'owner',
	NOW()
FROM "user"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint
UPDATE "subscription"
SET
	"organization_id" = 'personal_' || "user_id",
	"created_by_user_id" = "user_id"
WHERE "organization_id" IS NULL AND "user_id" IS NOT NULL;
