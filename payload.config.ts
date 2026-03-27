import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { microsoftGraphEmail } from '@/lib/microsoft-graph-email'
import path from 'path'
import { fileURLToPath } from 'url'
import { BlogPosts } from '@/collections/BlogPosts'
import { DemoRequests } from '@/collections/DemoRequests'
import { SalesLeads } from '@/collections/SalesLeads'
import { StartupApplications } from '@/collections/StartupApplications'
import { LegalPages } from '@/collections/LegalPages'
import { SocialLinks } from '@/collections/SocialLinks'
import { Media } from '@/collections/Media'
import { Users } from '@/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Payload CMS configuration.
 * ONLY used for the /blog section — all other content is static.
 */
export default buildConfig({
  // Admin panel lives at /admin
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // Collections — blog + media + auth
  collections: [BlogPosts, DemoRequests, SalesLeads, StartupApplications, LegalPages, SocialLinks, Media, Users],

  editor: lexicalEditor(),

  // Email via Microsoft Graph API (Azure AD client credentials)
  email: microsoftGraphEmail(),

  // Vercel Blob storage — replaces local /public/media on production.
  // BLOB_READ_WRITE_TOKEN is injected automatically by Vercel when the
  // Blob store is connected to the project (Storage → Connect Store).
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? '',
    }),
  ],

  secret: process.env.PAYLOAD_SECRET ?? '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? '',
    },
    // Push schema directly on startup — creates tables automatically on first deploy.
    // Safe for new databases; for future schema changes, generate migrations instead.
    push: true,
  }),
})
