// Run: npx tsx --test src/lib/notifyFethrOs.test.ts
import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { afterEach, describe, it } from 'node:test'

import { deliver, signature } from './notifyFethrOs'

const realFetch = globalThis.fetch
afterEach(() => {
  globalThis.fetch = realFetch
})

type Call = { url: string; headers: Record<string, string>; body: string }

/** The nth recorded call; fails the test when it is missing. */
function nth(calls: Call[], i: number): Call {
  const call = calls[i]
  assert.ok(call, `expected a call #${i + 1}`)
  return call
}

function fakeFetch(statuses: (number | Error)[]): Call[] {
  const calls: Call[] = []
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url, headers: init.headers as Record<string, string>, body: String(init.body) })
    const next = statuses[calls.length - 1] ?? 200
    if (next instanceof Error) throw next
    return new Response(null, { status: next })
  }) as typeof fetch
  return calls
}

describe('signature', () => {
  it('is what fethr-os verifies: hex HMAC-SHA256 over "<timestamp>.<raw body>"', () => {
    const body = '{"collection":"sales-leads","id":5}'
    const expected = createHmac('sha256', 's3cret').update(`1700000000.${body}`).digest('hex')
    assert.equal(signature('s3cret', '1700000000', body), `sha256=${expected}`)
    assert.equal(expected.length, 64)
  })
})

describe('deliver', () => {
  it('posts once, signed, with a delivery id and timestamp', async () => {
    const calls = fakeFetch([200])
    const body = '{"collection":"sales-leads","operation":"create","id":5,"doc":{},"occurredAt":"x"}'
    assert.equal(await deliver('https://os.example/api/webhooks/website', 'k', body, 'sales-leads', '5'), true)
    assert.equal(calls.length, 1)
    const first = nth(calls, 0)
    const h = first.headers
    assert.match(h['X-Fethr-Delivery'] ?? '', /^[0-9a-f-]{36}$/)
    assert.equal(h['X-Fethr-Signature'], signature('k', h['X-Fethr-Timestamp'] ?? '', body))
    assert.equal(first.body, body)
  })

  it('retries a 5xx once under the same delivery id', async () => {
    const calls = fakeFetch([503, 200])
    assert.equal(await deliver('u', 'k', '{}', 'sales-leads', '5', { retryDelayMs: 0 }), true)
    assert.equal(calls.length, 2)
    assert.equal(nth(calls, 0).headers['X-Fethr-Delivery'], nth(calls, 1).headers['X-Fethr-Delivery'])
  })

  it('retries a network error once, then gives up without throwing', async () => {
    const calls = fakeFetch([new Error('ECONNRESET'), new Error('ECONNRESET')])
    assert.equal(await deliver('u', 'k', '{}', 'sales-leads', '5', { retryDelayMs: 0 }), false)
    assert.equal(calls.length, 2)
  })

  it('does not retry a 4xx (bad signature or not a lead)', async () => {
    const calls = fakeFetch([401])
    assert.equal(await deliver('u', 'k', '{}', 'sales-leads', '5', { retryDelayMs: 0 }), false)
    assert.equal(calls.length, 1)
  })
})
