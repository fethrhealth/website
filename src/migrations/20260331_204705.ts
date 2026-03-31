import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_referral_partners_region" AS ENUM('North America', 'Europe', 'Rest of World');
  CREATE TYPE "public"."enum_referral_partners_healthcare_network" AS ENUM('Health Systems', 'Health IT Vendors', 'Consulting', 'Other');
  CREATE TYPE "public"."enum_referral_partners_status" AS ENUM('new', 'contacted', 'active', 'inactive');
  CREATE TABLE "referral_partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"company" varchar NOT NULL,
  	"job_title" varchar,
  	"linked_in" varchar,
  	"region" "enum_referral_partners_region" NOT NULL,
  	"healthcare_network" "enum_referral_partners_healthcare_network",
  	"referral_source" varchar,
  	"message" varchar,
  	"status" "enum_referral_partners_status" DEFAULT 'new',
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "referral_partners_id" integer;
  CREATE INDEX "referral_partners_updated_at_idx" ON "referral_partners" USING btree ("updated_at");
  CREATE INDEX "referral_partners_created_at_idx" ON "referral_partners" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_referral_partners_fk" FOREIGN KEY ("referral_partners_id") REFERENCES "public"."referral_partners"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_referral_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("referral_partners_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "referral_partners" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "referral_partners" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_referral_partners_fk";
  
  DROP INDEX "payload_locked_documents_rels_referral_partners_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "referral_partners_id";
  DROP TYPE "public"."enum_referral_partners_region";
  DROP TYPE "public"."enum_referral_partners_healthcare_network";
  DROP TYPE "public"."enum_referral_partners_status";`)
}
