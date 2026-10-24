import type { Payload } from 'payload'

/**
 * Lead-notification emails for website form submissions.
 *
 * Sends a notification via the Payload email adapter (Microsoft Graph — see
 * `microsoft-graph-email.ts`) whenever a new lead is captured. Wired up from the
 * `afterChange` hook of each lead collection (DemoRequests, SalesLeads,
 * StartupApplications, ReferralPartners).
 *
 * Recipient defaults to yitzhak@fethrhealth.com and can be overridden with the
 * LEAD_NOTIFY_TO env var (comma-separated for multiple recipients).
 */
const NOTIFY_TO = process.env.LEAD_NOTIFY_TO ?? 'yitzhak@fethrhealth.com'

export interface LeadField {
  label: string
  value: unknown
}

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function isPresent(v: unknown): boolean {
  return v !== undefined && v !== null && String(v).trim() !== ''
}

function buildHtml(heading: string, fields: LeadField[]): string {
  const rows = fields
    .filter((f) => isPresent(f.value))
    .map(
      (f) =>
        `<tr>` +
        `<td style="padding:6px 16px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${esc(f.label)}</td>` +
        `<td style="padding:6px 0;font-weight:600;color:#111">${esc(f.value)}</td>` +
        `</tr>`,
    )
    .join('')

  return (
    `<div style="font-family:system-ui,Arial,sans-serif;color:#111;max-width:600px">` +
    `<h2 style="margin:0 0 16px">${esc(heading)}</h2>` +
    `<table style="border-collapse:collapse">${rows}</table>` +
    `<p style="margin-top:24px;color:#999;font-size:12px">Sent automatically by the Fethr Health website.</p>` +
    `</div>`
  )
}

/**
 * Sends a lead-notification email. Never throws — a mail failure must not break
 * the form submission, since the lead is already persisted in the CRM.
 */
export async function sendLeadNotification(
  payload: Payload,
  opts: { subject: string; heading: string; fields: LeadField[] },
): Promise<void> {
  try {
    await payload.sendEmail({
      to: NOTIFY_TO,
      subject: opts.subject,
      html: buildHtml(opts.heading, opts.fields),
    })
    payload.logger.info(`[lead] notification sent → ${NOTIFY_TO}: ${opts.subject}`)
  } catch (err) {
    payload.logger.error(
      `[lead] notification FAILED (${opts.subject}): ${(err as Error).message}`,
    )
  }
}
