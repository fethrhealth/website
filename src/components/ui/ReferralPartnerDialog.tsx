'use client'

import { useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  firstName:         string
  lastName:          string
  email:             string
  phone:             string
  company:           string
  jobTitle:          string
  linkedIn:          string
  region:            string
  healthcareNetwork: string
  referralSource:    string
  message:           string
}

const EMPTY: FormData = {
  firstName: '', lastName: '', email: '',
  phone: '', company: '', jobTitle: '', linkedIn: '',
  region: '', healthcareNetwork: '', referralSource: '', message: '',
}

// ─── Shared class strings ─────────────────────────────────────────────────────

const INPUT_CLS = cn(
  'block w-full rounded-[10px] bg-primary-background p-[10px_13px]',
  'outline-none transition-all duration-300 ease-out',
  'text-secondary-foreground placeholder:text-accent-foreground placeholder:text-sm',
  'border border-default-stroke',
  'hover:shadow-[0px_1px_4px_rgba(56,62,71,0.1)]',
  'focus:border-blue-500 focus:ring-[3px] focus:ring-blue-300',
)

const LABEL_CLS = 'truncate text-accent-foreground text-xs'

// ─── InputField ───────────────────────────────────────────────────────────────

function InputField({
  id, label, error, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; error?: boolean }) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <label className={LABEL_CLS} htmlFor={id}>{label}</label>
      <input
        id={id}
        className={cn(INPUT_CLS, error && 'border-red-400 focus:border-red-400')}
        {...props}
      />
    </div>
  )
}

// ─── SelectField ──────────────────────────────────────────────────────────────

function SelectField({
  id, name, label, placeholder, options, value, onChange,
}: {
  id: string; name: string; label: string; placeholder: string
  options: string[]; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <label className={LABEL_CLS} htmlFor={id}>{label}</label>
      <div className={cn(
        'relative flex w-full cursor-pointer items-center justify-between rounded-[10px]',
        'bg-primary-background py-2.5 pr-3 pl-[13px]',
        'border border-default-stroke transition-[border-color,box-shadow] duration-150 ease-in-out',
        'hover:shadow-[0px_1px_4px_rgba(56,62,71,0.1)]',
        'focus-within:border-blue-500 focus-within:ring-[3px] focus-within:ring-blue-300',
      )}>
        <span className={cn('text-sm leading-6', value ? 'text-secondary-foreground' : 'text-accent-foreground')}>
          {value || placeholder}
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M10.1465 5.14661C10.3418 4.95134 10.6583 4.95134 10.8536 5.14661C11.0487 5.34188 11.0488 5.65843 10.8536 5.85364L7.35358 9.35364C7.15837 9.54885 6.84182 9.54875 6.64655 9.35364L3.14655 5.85364C2.95128 5.65838 2.95128 5.34187 3.14655 5.14661C3.34181 4.95134 3.65831 4.95134 3.85358 5.14661L7.00006 8.29309L10.1465 5.14661Z"
            fill="currentColor"
          />
        </svg>
        <select
          id={id}
          name={name}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  )
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ visible }: { visible: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 18 18" fill="none"
      className={cn('animate-spin transition-opacity duration-150', visible ? 'opacity-100' : 'opacity-0')}
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

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <div className="flex size-14 items-center justify-center rounded-full border border-[#C7F4D3] bg-[#DDF9E4]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="#0B935D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-heading-sm text-secondary-foreground">Application received!</p>
        <p className="mt-1.5 text-tertiary-foreground">We'll review your application and be in touch within 48 hours.</p>
      </div>
    </div>
  )
}

// ─── ReferralPartnerDialog ────────────────────────────────────────────────────

export function ReferralPartnerDialog({
  className,
  label = 'Become a referral partner',
}: {
  className?: string
  label?: string
}) {
  const [open, setOpen]     = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm]     = useState<FormData>(EMPTY)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, boolean>>>({})

  function field(key: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }))
  }

  function handleOpenChange(v: boolean) {
    if (!v) {
      setOpen(false)
      setTimeout(() => { setStatus('idle'); setErrorMsg(''); setForm(EMPTY); setFieldErrors({}) }, 300)
    } else {
      setOpen(true)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return

    const errors: Partial<Record<keyof FormData, boolean>> = {}
    if (!form.firstName.trim()) errors.firstName = true
    if (!form.lastName.trim())  errors.lastName  = true
    if (!form.email.trim())     errors.email     = true
    if (!form.company.trim())   errors.company   = true
    if (!form.region)           errors.region    = true
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return }

    setStatus('loading')
    setErrorMsg('')
    setFieldErrors({})

    try {
      const res = await fetch('/api/referral-partner', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
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
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>

      <DialogPrimitive.Trigger asChild>
        <button type="button" className={className}>{label}</button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>

        {/* Backdrop */}
        <DialogPrimitive.Overlay className={cn(
          'fixed inset-0 z-50 bg-black-100/50 backdrop-blur-xs',
          'data-[state=open]:animate-in   data-[state=open]:fade-in-0   data-[state=open]:duration-300   data-[state=open]:ease-out',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200',
        )} />

        {/* Scroll container + panel */}
        <DialogPrimitive.Content className={cn(
          'fixed inset-0 z-50 flex justify-center overflow-y-auto p-3 outline-none',
          'data-[state=open]:animate-in   data-[state=open]:fade-in-0   data-[state=open]:duration-300   data-[state=open]:ease-out',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200',
        )}>
          <div className={cn(
            'relative my-auto w-full max-w-xl origin-top rounded-3xl bg-surface-subtle p-8',
            'data-[state=open]:animate-in   data-[state=open]:zoom-in-90   data-[state=open]:slide-in-from-bottom-6   data-[state=open]:duration-300   data-[state=open]:ease-out',
            'data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=closed]:duration-200',
          )}>

            {/* Close button */}
            <DialogPrimitive.Close
              className="absolute top-8 right-8 inline-flex size-9 cursor-pointer items-center justify-center rounded-[10px] border button-outline transition-colors duration-300 ease-in-out hover:duration-50"
              aria-label="Close dialog"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none" className="text-black-500 dark:text-white-500" aria-hidden>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="m12.5 5.5-7 7m7 0-7-7" />
              </svg>
            </DialogPrimitive.Close>

            {status === 'success' ? (
              <SuccessState />
            ) : (
              <>
                {/* Header */}
                <DialogPrimitive.Title className="text-heading-sm text-secondary-foreground">
                  Become a referral partner
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-1.5 font-normal text-tertiary-foreground">
                  Earn 10% revenue share for 3 years on every organization you refer.
                </DialogPrimitive.Description>

                {/* Form */}
                <form className="mt-8" onSubmit={handleSubmit} noValidate>
                  <div className="flex flex-col gap-y-5">

                    {/* First / Last name */}
                    <div className="grid grid-cols-2 gap-x-5 gap-y-3 max-md:grid-cols-1">
                      <InputField
                        id="rp-firstName" name="firstName" label="First name"
                        placeholder="First" type="text" required
                        value={form.firstName} onChange={field('firstName')}
                        error={fieldErrors.firstName}
                      />
                      <InputField
                        id="rp-lastName" name="lastName" label="Last name"
                        placeholder="Last" type="text" required
                        value={form.lastName} onChange={field('lastName')}
                        error={fieldErrors.lastName}
                      />
                    </div>

                    {/* Email */}
                    <InputField
                      id="rp-email" name="email" label="Email"
                      placeholder="Your email address" type="email" required
                      value={form.email} onChange={field('email')}
                      error={fieldErrors.email}
                    />

                    {/* Phone / Company */}
                    <div className="grid grid-cols-2 gap-x-5 gap-y-3 max-md:grid-cols-1">
                      <InputField
                        id="rp-phone" name="phone" label="Phone number (optional)"
                        placeholder="Your phone number" type="tel"
                        value={form.phone} onChange={field('phone')}
                      />
                      <InputField
                        id="rp-company" name="company" label="Company / Organization"
                        placeholder="Your company" type="text" required
                        value={form.company} onChange={field('company')}
                        error={fieldErrors.company}
                      />
                    </div>

                    {/* Job title / Region */}
                    <div className="grid grid-cols-2 gap-x-5 gap-y-5 max-md:grid-cols-1">
                      <InputField
                        id="rp-jobTitle" name="jobTitle" label="Job title (optional)"
                        placeholder="Your role" type="text"
                        value={form.jobTitle} onChange={field('jobTitle')}
                      />
                      <SelectField
                        id="rp-region" name="region" label="Region"
                        placeholder="Select"
                        options={['North America', 'Europe', 'Rest of World']}
                        value={form.region}
                        onChange={v => setForm(p => ({ ...p, region: v }))}
                      />
                    </div>

                    {/* Healthcare network */}
                    <SelectField
                      id="rp-network" name="healthcareNetwork" label="Healthcare network (optional)"
                      placeholder="Select your primary area"
                      options={['Health Systems', 'Health IT Vendors', 'Consulting', 'Other']}
                      value={form.healthcareNetwork}
                      onChange={v => setForm(p => ({ ...p, healthcareNetwork: v }))}
                    />

                    {/* LinkedIn */}
                    <InputField
                      id="rp-linkedIn" name="linkedIn" label="LinkedIn profile (optional)"
                      placeholder="https://linkedin.com/in/..." type="url"
                      value={form.linkedIn} onChange={field('linkedIn')}
                    />

                    {/* How did you hear about us */}
                    <InputField
                      id="rp-source" name="referralSource" label="How did you hear about us? (optional)"
                      placeholder="e.g., colleague, event, LinkedIn" type="text"
                      value={form.referralSource} onChange={field('referralSource')}
                    />

                    {/* Message */}
                    <div className="flex flex-col gap-y-1.5">
                      <label className={LABEL_CLS} htmlFor="rp-message">Message (optional)</label>
                      <textarea
                        id="rp-message" name="message" rows={3}
                        placeholder="Tell us about your network and how you'd like to partner"
                        value={form.message} onChange={field('message')}
                        className={cn(INPUT_CLS, 'resize-none')}
                      />
                    </div>

                  </div>

                  {/* Error message */}
                  {status === 'error' && errorMsg && (
                    <p className="mt-3 text-xs text-red-500" role="alert">{errorMsg}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="button-primary relative mt-7 inline-flex h-11.5 w-full cursor-pointer items-center justify-center gap-x-2 rounded-xl border px-3.5 text-base transition-colors duration-300 ease-in-out hover:duration-50 disabled:pointer-events-none"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Spinner visible={status === 'loading'} />
                    </div>
                    <span className={cn('transition-opacity duration-150', status === 'loading' && 'opacity-0')}>
                      Submit application
                    </span>
                  </button>
                </form>

                {/* Legal */}
                <p className="mt-6 max-w-[36em] text-balance text-accent-foreground text-xs">
                  By submitting, you agree to our{' '}
                  <a href="/legal/referral-policy" className="underline">Referral & Partnership Policy</a>.
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noreferrer">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noreferrer">Terms of Service</a>
                  {' '}apply.
                </p>
              </>
            )}

          </div>
        </DialogPrimitive.Content>

      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
