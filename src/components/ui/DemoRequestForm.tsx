'use client'

import { useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { TalkToSalesDialog } from './TalkToSalesDialog'

// ─── Types ────────────────────────────────────────────────────────────────────

interface DemoRequestFormProps {
  /**
   * Extra classes on the outer <form>. The form is `w-full flex-col` —
   * let the parent control max-width and visibility (md:hidden, etc.).
   */
  className?: string
  /** Label for the primary submit button. Default: "Send me a demo" */
  submitLabel?: string
  /**
   * Whether to show the ghost "Talk to sales" button that opens the dialog.
   * Default: true
   */
  showSales?: boolean
  /**
   * Identifies which page / section submitted the form.
   * Stored as `source` in the DemoRequests Payload collection.
   */
  source?: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner({ visible }: { visible: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 18 18" fill="none"
      className={cn(
        'animate-spin transition-opacity duration-150',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      aria-hidden
    >
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <path
        d="M17 9C17 10.051 16.793 11.091 16.391 12.062C15.989 13.032 15.4 13.914 14.657 14.657C13.914 15.4 13.032 15.989 12.062 16.391C11.091 16.793 10.051 17 9 17"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Success illustration ─────────────────────────────────────────────────────
// SVG matching the attio confirmation dialog (envelope + checkmark motif)

function SuccessIllustration() {
  return (
    <svg width="213" height="120" viewBox="0 0 213 120" fill="none" aria-hidden>
      {/* Background arc */}
      <path
        d="M77.6204 42.3796C85.1525 34.8475 95.2896 30.496 105.938 30.2237C116.587 29.9515 126.933 33.7794 134.84 40.9167C142.747 48.054 147.611 57.9555 148.427 68.5762C149.243 79.1968 145.949 89.7252 139.225 97.9866C132.501 106.248 122.861 111.612 112.296 112.969C101.731 114.327 91.0478 111.575 82.4535 105.282C73.8592 98.9891 68.0101 89.6357 66.1143 79.1538C64.2186 68.672 66.4209 57.8624 72.2665 48.9577"
        stroke="#99A2AF"
      />
      {/* Envelope / check body */}
      <path
        d="M158.342 3.0876L148.457 4.84691C147.399 5.03327 146.422 5.54765 145.662 6.30803L103.356 48.6134L85.3382 30.0214C84.1231 28.769 82.3638 28.195 80.6417 28.5007L70.809 30.2451C69.7504 30.4314 68.7739 30.9458 68.0135 31.7062L52.5375 47.1896C50.4875 49.2396 50.4875 52.5719 52.5375 54.6294L74.9389 77.0308L93.3669 95.4588C94.582 96.6739 96.3115 97.2181 98.0037 96.9199L107.889 95.1606C108.947 94.9742 109.924 94.4598 110.684 93.6995L177.687 26.6966C179.737 24.6466 179.737 21.3143 177.687 19.2568L162.971 4.54126C161.756 3.32615 160.027 2.78195 158.335 3.08014L158.342 3.0876Z"
        fill="#FAFAFA" stroke="#6F7988" strokeWidth="2" strokeLinejoin="round"
      />
      {/* Check path (bottom-left) */}
      <path
        d="M69.5417 30.8862L95.3126 56.6571L103.356 48.606"
        stroke="#6F7988" strokeWidth="2" strokeLinejoin="round"
      />
      {/* Divider line */}
      <path
        d="M144.856 7.11308L146.839 5.13013L167.206 25.5038L95.8567 96.8528"
        stroke="#6F7988" strokeLinejoin="round"
      />
      {/* Top-right connector */}
      <path d="M179.774 23.2673L167.206 25.5037" stroke="#6F7988" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Success dialog ───────────────────────────────────────────────────────────

function SuccessDialog({
  open,
  onClose,
}: {
  open:    boolean
  onClose: () => void
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={v => !v && onClose()}>
      <DialogPrimitive.Portal>

        {/* Backdrop */}
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black-0/30',
            'data-[state=open]:animate-in   data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
            'duration-300',
          )}
        />

        {/* Panel */}
        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 px-4 outline-none',
            // Open animation — attio: fade-in + zoom-in-90 + slide from bottom
            'origin-top',
            'data-[state=open]:animate-in   data-[state=open]:fade-in-0   data-[state=open]:zoom-in-90   data-[state=open]:slide-in-from-bottom-6   data-[state=open]:duration-300   data-[state=open]:ease-out',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-200',
          )}
        >
          <div className="relative rounded-3xl bg-surface-subtle p-8">

            {/* ── Close button ─────────────────────────────────────────── */}
            <DialogPrimitive.Close
              className="inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 size-9 rounded-[10px] button-outline absolute top-8 right-8"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                width="18" height="18"
                fill="none"
                className="text-black-500 dark:text-white-500"
                aria-hidden
              >
                <path
                  stroke="currentColor" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="1.1"
                  d="m12.5 5.5-7 7m7 0-7-7"
                />
              </svg>
            </DialogPrimitive.Close>

            {/* ── Body ─────────────────────────────────────────────────── */}
            <div className="flex flex-col items-center gap-4 pt-[111px] pb-[102px]">
              <SuccessIllustration />

              <DialogPrimitive.Title className="text-center text-heading-sm text-secondary-foreground">
                You're on the list.
              </DialogPrimitive.Title>

              <DialogPrimitive.Description className="text-center text-tertiary-foreground">
                We'll be in touch with your demo soon.
              </DialogPrimitive.Description>
            </div>

          </div>
        </DialogPrimitive.Content>

      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function DemoRequestForm({
  className,
  submitLabel = 'Send me a demo',
  showSales   = true,
  source,
}: DemoRequestFormProps) {
  const [email,    setEmail]    = useState('')
  const [status,   setStatus]   = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleDialogClose() {
    // Reset to idle so the user can submit again after closing the dialog
    setStatus('idle')
    setEmail('')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/demo-request', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, source }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error ?? 'Something went wrong. Please try again.')
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <>
      {/* Success dialog — opens when status === 'success' */}
      <SuccessDialog open={status === 'success'} onClose={handleDialogClose} />

      {/* Form — always rendered (dialog is portaled above everything) */}
      <form
        onSubmit={handleSubmit}
        className={cn('flex w-full flex-col gap-2 md:hidden max-w-[320px]', className)}
        noValidate
      >
        {/* Email input */}
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-invalid={status === 'error'}
          className={cn(
            'block w-full rounded-[10px] bg-primary-background p-[10px_13px]',
            'outline-none transition-all duration-300 ease-out',
            'text-secondary-foreground placeholder:text-accent-foreground',
            'border placeholder:text-base placeholder-shown:truncate',
            'hover:shadow-[0px_1px_4px_rgba(56,62,71,0.1)]',
            'focus:ring-[3px] focus:ring-blue-300',
            status === 'error'
              ? 'border-red-400 focus:border-red-400'
              : 'border-default-stroke focus:border-blue-500',
          )}
        />

        {/* Inline error */}
        {status === 'error' && errorMsg && (
          <p className="text-xs text-red-500" role="alert">{errorMsg}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="button-primary relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 disabled:pointer-events-none h-11.5 gap-x-2 rounded-xl px-3.5 text-base"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner visible={status === 'loading'} />
          </div>
          <span className={cn('transition-opacity duration-150', status === 'loading' && 'opacity-0')}>
            {submitLabel}
          </span>
        </button>

        {/* Ghost "Talk to sales" — opens dialog */}
        {showSales && (
          <TalkToSalesDialog
            source={source}
            className="button-ghost relative inline-flex cursor-pointer items-center justify-center self-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-11.5 gap-x-2 rounded-xl px-3.5 text-base"
          />
        )}
      </form>
    </>
  )
}
