import { createHmac, randomUUID } from 'crypto'
import { after } from 'next/server'
import type { CollectionAfterChangeHook } from 'payload'

/**
 * Pushes every new lead (and every status change) to fethr-os, where it shows up in Clients › Inbound
 * (fethr-os docs/fethr-os/04-crm.md §4).
 *
 *   POST ${FETHR_OS_WEBHOOK_URL}          default https://os.fethrhealth.com/api/webhooks/website
 *   X-Fethr-Delivery:  <uuid>
 *   X-Fethr-Timestamp: <unix seconds>
 *   X-Fethr-Signature: sha256=<hex HMAC-SHA256(FETHR_OS_WEBHOOK_SECRET, "<timestamp>.<raw body>")>
 *   body: {collection, operation, id, doc, occurredAt}
 *
 * Never blocks or fails the visitor's form submission: the request runs after the response is sent, with a
 * 5 second timeout, and errors are only logged. fethr-os also backfills nightly from this database, so a
 * missed delivery is picked up within a day.
 */
export const notifyFethrOs: CollectionAfterChangeHook = async ({ doc, operation, previousDoc, collection }) => {
  const statusChanged = operation === 'update' && previousDoc?.status !== doc?.status
  if (operation !== 'create' && !statusChanged) return doc

  const secret = process.env.FETHR_OS_WEBHOOK_SECRET
  if (!secret) return doc
  const url = process.env.FETHR_OS_WEBHOOK_URL || 'https://os.fethrhealth.com/api/webhooks/website'

  const body = JSON.stringify({
    collection: collection.slug,
    operation,
    id: doc.id,
    doc,
    occurredAt: new Date().toISOString(),
  })
  const send = () => deliver(url, secret, body, collection.slug, String(doc.id))

  try {
    after(send) // runs once the response has gone out
  } catch {
    await send() // not inside a request scope (e.g. a local script): send now, still bounded by the timeout
  }
  return doc
}

/** The X-Fethr-Signature value fethr-os checks: sha256=<hex HMAC-SHA256(secret, "<timestamp>.<raw body>")>. */
export function signature(secret: string, timestamp: string, body: string): string {
  return `sha256=${createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex')}`
}

/**
 * Signs and POSTs one delivery; one retry on a network error or a 5xx, under the same delivery id so fethr-os
 * stores it once. A 4xx (bad signature, not a lead) is not retried. Exported for tests.
 */
export async function deliver(
  url: string,
  secret: string,
  body: string,
  slug: string,
  id: string,
  { retryDelayMs = 1000 }: { retryDelayMs?: number } = {},
): Promise<boolean> {
  const deliveryId = randomUUID()
  for (let attempt = 1; attempt <= 2; attempt++) {
    const timestamp = String(Math.floor(Date.now() / 1000))
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Fethr-Delivery': deliveryId,
          'X-Fethr-Timestamp': timestamp,
          'X-Fethr-Signature': signature(secret, timestamp, body),
        },
        body,
        signal: AbortSignal.timeout(5000),
      })
      if (res.ok) return true
      console.warn(`[fethr-os] lead ${slug}/${id} not accepted (attempt ${attempt}): HTTP ${res.status}`)
      if (res.status < 500) return false
    } catch (err) {
      console.warn(`[fethr-os] lead ${slug}/${id} not delivered (attempt ${attempt}):`, (err as Error).message)
    }
    if (attempt === 1) await new Promise((r) => setTimeout(r, retryDelayMs))
  }
  return false
}
