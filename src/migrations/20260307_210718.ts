import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_posts" ADD COLUMN "author_role" varchar;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_author_role" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_posts" DROP COLUMN "author_role";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_author_role";`)
}
