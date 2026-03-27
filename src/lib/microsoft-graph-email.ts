import type { EmailAdapter, SendEmailOptions } from 'payload'

/**
 * Custom Payload CMS email adapter using Microsoft Graph API.
 * Uses Azure AD client credentials (app-only) flow with Mail.Send permission.
 *
 * Required env vars:
 *   AZURE_TENANT_ID      — Directory (tenant) ID from Azure AD app registration
 *   AZURE_CLIENT_ID      — Application (client) ID from Azure AD app registration
 *   AZURE_CLIENT_SECRET  — Client secret value from Azure AD app registration
 */
export function microsoftGraphEmail(): EmailAdapter {
  return () => {
    const defaultFromAddress = 'no-reply@fethrhealth.com'
    const defaultFromName = 'Fethr Health'

    /** Fetch an OAuth2 access token from Azure AD using client credentials flow. */
    async function getAccessToken(): Promise<string> {
      const { AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET } = process.env

      if (!AZURE_TENANT_ID || !AZURE_CLIENT_ID || !AZURE_CLIENT_SECRET) {
        throw new Error('[email] Missing AZURE_TENANT_ID, AZURE_CLIENT_ID, or AZURE_CLIENT_SECRET')
      }

      const res = await fetch(
        `https://login.microsoftonline.com/${AZURE_TENANT_ID}/oauth2/v2.0/token`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: AZURE_CLIENT_ID,
            client_secret: AZURE_CLIENT_SECRET,
            scope: 'https://graph.microsoft.com/.default',
            grant_type: 'client_credentials',
          }).toString(),
        },
      )

      if (!res.ok) {
        const body = await res.text()
        throw new Error(`[email] Azure AD token error (${res.status}): ${body}`)
      }

      const data = (await res.json()) as { access_token: string }
      return data.access_token
    }

    /** Send an email via Microsoft Graph API. */
    async function sendEmail(message: SendEmailOptions): Promise<unknown> {
      const token = await getAccessToken()
      const from = message.from ?? `${defaultFromName} <${defaultFromAddress}>`

      // Parse "Name <email>" format
      const fromMatch = from.match(/^(.+?)\s*<(.+?)>$/)
      const fromName = fromMatch?.[1]?.trim() ?? defaultFromName
      const fromEmail = fromMatch?.[2]?.trim() ?? from

      // Build recipient list
      const toList = typeof message.to === 'string' ? message.to.split(',') : [message.to].flat()
      const toRecipients = toList
        .filter(Boolean)
        .map((email) => ({ emailAddress: { address: (email as string).trim() } }))

      const graphPayload = {
        message: {
          subject: message.subject,
          body: {
            contentType: message.html ? 'HTML' : 'Text',
            content: message.html ?? message.text ?? '',
          },
          from: {
            emailAddress: { name: fromName, address: fromEmail },
          },
          toRecipients,
        },
        saveToSentItems: false,
      }

      const graphRes = await fetch(
        `https://graph.microsoft.com/v1.0/users/${defaultFromAddress}/sendMail`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(graphPayload),
        },
      )

      if (!graphRes.ok) {
        const body = await graphRes.text()
        throw new Error(`[email] Graph API send error (${graphRes.status}): ${body}`)
      }

      return { success: true }
    }

    return {
      defaultFromAddress,
      defaultFromName,
      sendEmail,
    }
  }
}
