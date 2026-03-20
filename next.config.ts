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
}

export default withPayload(nextConfig)
