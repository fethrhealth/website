import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Vercel Blob storage — used for Payload CMS media uploads
        protocol: 'https',
        hostname: '*.public.blob.vercel.app',
      },
    ],
  },

  // Rewrite /v1/* → /api/v1/* so the orchestration engine's existing paths
  // (e.g. /v1/config, /v1/reports/events) resolve to our Next.js API routes
  // without needing to change any Java code.
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: '/api/v1/:path*',
      },
    ]
  },
}

export default withPayload(nextConfig)
