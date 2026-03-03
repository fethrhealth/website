/**
 * Payload CMS admin panel catch-all route.
 * Do NOT modify — managed by @payloadcms/next.
 */
import type { Metadata } from 'next'
import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

// RootPage returns Promise<JSX.Element> — cast is required because Next.js
// async Server Components are valid but TS infers the wrong return type here.
export default async function Page({ params, searchParams }: Args): Promise<React.ReactElement> {
  return RootPage({ config, params, searchParams, importMap }) as unknown as React.ReactElement
}
