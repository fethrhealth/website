import { NextRequest, NextResponse } from 'next/server'

/**
 * CORS middleware for the /api/v1/* telemetry endpoints.
 *
 * The orchestration engine sends cross-origin requests from its own domain
 * (or localhost during development) to these API routes. Without CORS headers
 * the browser will block the requests.
 */

function corsHeaders(origin: string) {
  return {
    // Echo the requesting origin so withCredentials works (wildcard * is
    // rejected by browsers when credentials mode is "include").
    'Access-Control-Allow-Origin':      origin || '*',
    'Access-Control-Allow-Methods':     'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers':     'Content-Type, Authorization, User-Agent',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age':           '86400',
  }
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Only apply CORS to /v1/* and /api/v1/* routes
  if (!path.startsWith('/v1') && !path.startsWith('/api/v1')) {
    return NextResponse.next()
  }

  const origin = request.headers.get('origin') ?? '*'
  const headers = corsHeaders(origin)

  // Handle preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers })
  }

  // Engine telemetry now lives in fethr-os (os.fethrhealth.com). Installs that
  // still post to fethrhealth.com/v1/reports/* are proxied there unchanged and
  // nothing is stored in this site's CMS. fethr-os adds its own CORS headers,
  // so this branch must not add ours (duplicate Allow-Origin breaks browsers).
  if (path.startsWith('/v1/reports/') || path.startsWith('/api/v1/reports/')) {
    const base = process.env.FETHR_OS_URL ?? 'https://os.fethrhealth.com'
    const target = new URL(path.replace(/^\/api\/v1\//, '/v1/') + request.nextUrl.search, base)
    const forwarded = new Headers(request.headers)
    forwarded.delete('host') // let the proxy set Host to os.fethrhealth.com
    forwarded.set('x-fethr-forwarded-by', 'fethrhealth.com')
    return NextResponse.rewrite(target, { request: { headers: forwarded } })
  }

  // For actual requests, add CORS headers to the response
  const response = NextResponse.next()
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value)
  }
  return response
}

export const config = {
  matcher: ['/v1/:path*', '/api/v1/:path*'],
}
