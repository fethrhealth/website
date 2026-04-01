import { NextRequest, NextResponse } from 'next/server'

/**
 * CORS middleware for the /api/v1/* telemetry endpoints.
 *
 * The orchestration engine sends cross-origin requests from its own domain
 * (or localhost during development) to these API routes. Without CORS headers
 * the browser will block the requests.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
  'Access-Control-Max-Age':       '86400', // cache preflight for 24 h
}

export function middleware(request: NextRequest) {
  // Only apply CORS to /api/v1/* routes
  if (!request.nextUrl.pathname.startsWith('/api/v1')) {
    return NextResponse.next()
  }

  // Handle preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: CORS_HEADERS })
  }

  // For actual requests, add CORS headers to the response
  const response = NextResponse.next()
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    response.headers.set(key, value)
  }
  return response
}

export const config = {
  matcher: '/api/v1/:path*',
}
