import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create enum types — silently skip if they already exist (dev-mode push may have created them)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_demo_requests_status" AS ENUM('new', 'contacted', 'demo_scheduled', 'closed');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_sales_leads_region" AS ENUM('North America', 'Europe', 'Rest of World');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_sales_leads_company_size" AS ENUM('1 to 5', '6 to 10', '11 to 20', '21 to 50', '51 to 100', '101+');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_sales_leads_status" AS ENUM('new', 'contacted', 'meeting_booked', 'closed_won', 'closed_lost');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_startup_applications_latest_funding_round" AS ENUM('Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_startup_applications_total_amount_raised" AS ENUM('$0 to $500k', '$500k to $1M', '$1M to $2.5M', '$2.5M to $5M', '$5M to $7.5M', '$7.5M+');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_startup_applications_team_size" AS ENUM('1 to 5', '6 to 10', '11 to 20', '21 to 50', '51 to 100', '101+');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_startup_applications_status" AS ENUM('new', 'reviewed', 'accepted', 'rejected');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  // Create tables — IF NOT EXISTS so re-running is safe
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "demo_requests" (
      "id" serial PRIMARY KEY NOT NULL,
      "email" varchar NOT NULL,
      "source" varchar,
      "status" "enum_demo_requests_status" DEFAULT 'new',
      "notes" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "sales_leads" (
      "id" serial PRIMARY KEY NOT NULL,
      "first_name" varchar NOT NULL,
      "last_name" varchar NOT NULL,
      "company_email" varchar NOT NULL,
      "phone" varchar,
      "region" "enum_sales_leads_region",
      "company_size" "enum_sales_leads_company_size",
      "details" varchar,
      "source" varchar,
      "status" "enum_sales_leads_status" DEFAULT 'new',
      "notes" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "startup_applications" (
      "id" serial PRIMARY KEY NOT NULL,
      "first_name" varchar NOT NULL,
      "last_name" varchar NOT NULL,
      "company_email" varchar NOT NULL,
      "year_founded" varchar,
      "latest_funding_round" "enum_startup_applications_latest_funding_round",
      "total_amount_raised" "enum_startup_applications_total_amount_raised",
      "team_size" "enum_startup_applications_team_size",
      "use_case" varchar,
      "status" "enum_startup_applications_status" DEFAULT 'new',
      "notes" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  // Add columns — IF NOT EXISTS (Postgres 9.6+)
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "demo_requests_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "sales_leads_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "startup_applications_id" integer;
  `)

  // Create indexes — IF NOT EXISTS
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "demo_requests_updated_at_idx" ON "demo_requests" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "demo_requests_created_at_idx" ON "demo_requests" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "sales_leads_updated_at_idx" ON "sales_leads" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "sales_leads_created_at_idx" ON "sales_leads" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "startup_applications_updated_at_idx" ON "startup_applications" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "startup_applications_created_at_idx" ON "startup_applications" USING btree ("created_at");
  `)

  // Add foreign key constraints — skip if they already exist
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_demo_requests_fk"
        FOREIGN KEY ("demo_requests_id") REFERENCES "public"."demo_requests"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_sales_leads_fk"
        FOREIGN KEY ("sales_leads_id") REFERENCES "public"."sales_leads"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_startup_applications_fk"
        FOREIGN KEY ("startup_applications_id") REFERENCES "public"."startup_applications"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  // Create relation indexes — IF NOT EXISTS
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_demo_requests_id_idx"
      ON "payload_locked_documents_rels" USING btree ("demo_requests_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_sales_leads_id_idx"
      ON "payload_locked_documents_rels" USING btree ("sales_leads_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_startup_applications_id_idx"
      ON "payload_locked_documents_rels" USING btree ("startup_applications_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "demo_requests" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "sales_leads" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "startup_applications" DISABLE ROW LEVEL SECURITY;
    DROP TABLE IF EXISTS "demo_requests" CASCADE;
    DROP TABLE IF EXISTS "sales_leads" CASCADE;
    DROP TABLE IF EXISTS "startup_applications" CASCADE;
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_demo_requests_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_sales_leads_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_startup_applications_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_demo_requests_id_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_sales_leads_id_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_startup_applications_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "demo_requests_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "sales_leads_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "startup_applications_id";
    DROP TYPE IF EXISTS "public"."enum_demo_requests_status";
    DROP TYPE IF EXISTS "public"."enum_sales_leads_region";
    DROP TYPE IF EXISTS "public"."enum_sales_leads_company_size";
    DROP TYPE IF EXISTS "public"."enum_sales_leads_status";
    DROP TYPE IF EXISTS "public"."enum_startup_applications_latest_funding_round";
    DROP TYPE IF EXISTS "public"."enum_startup_applications_total_amount_raised";
    DROP TYPE IF EXISTS "public"."enum_startup_applications_team_size";
    DROP TYPE IF EXISTS "public"."enum_startup_applications_status";
  `)
}
