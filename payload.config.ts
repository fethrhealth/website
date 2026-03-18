import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { BlogPosts } from '@/collections/BlogPosts'
import { DemoRequests } from '@/collections/DemoRequests'
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
  collections: [BlogPosts, DemoRequests, Media, Users],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET ?? '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? '',
    },
  }),
})
