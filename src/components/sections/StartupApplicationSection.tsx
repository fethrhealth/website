'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

// ─── Shared input / select classes ────────────────────────────────────────────

const inputCls =
  'block w-full rounded-[10px] bg-primary-background p-[10px_13px] outline-none ' +
  'transition-all duration-300 ease-out text-secondary-foreground ' +
  'placeholder:text-black-700 placeholder:text-sm ' +
  'border border-default-stroke ' +
  'hover:border-white-800 hover:shadow-[0px_1px_4px_rgba(56,62,71,0.1)] ' +
  'focus:border-blue-500 focus:ring-[3px] focus:ring-blue-300'

const selectBaseCls =
  'block w-full appearance-none cursor-pointer rounded-[10px] bg-primary-background ' +
  'py-2.5 pr-8 pl-[13px] leading-6 outline-none ' +
  'transition-all duration-150 ease-in-out ' +
  'border border-default-stroke ' +
  'hover:shadow-[0px_1px_4px_rgba(56,62,71,0.1)] ' +
  'focus:border-blue-500 focus:ring-[3px] focus:ring-blue-300'

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-fg-accent text-xs font-medium">
      {children}
    </label>
  )
}

function TextInput({
  id, name, type = 'text', placeholder, value, onChange,
}: {
  id: string; name: string; type?: string
  placeholder: string; value: string
  onChange: (v: string) => void
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
    />
  )
}

/** Chevron SVG used inside select wrappers */
function SelectChevron() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary-foreground"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10.1465 5.147a.5.5 0 0 1 .707 0 .5.5 0 0 1 0 .707L7.354 9.354a.5.5 0 0 1-.708 0L3.146 5.854a.5.5 0 0 1 .708-.707L7 8.293l3.147-3.146Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SelectInput({
  id, name, options, value, onChange,
}: {
  id: string; name: string
  options: readonly string[]
  value: string; onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(selectBaseCls, !value ? 'text-black-700 text-sm' : 'text-secondary-foreground')}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <SelectChevron />
    </div>
  )
}

// ─── Select options (edit freely) ────────────────────────────────────────────

const YEAR_OPTIONS = ['2017','2018','2019','2020','2021','2022','2023','2024','2025','2026'] as const
const FUNDING_ROUND_OPTIONS = ['Pre-seed','Seed','Series A','Series B','Series C+'] as const
const AMOUNT_RAISED_OPTIONS = ['$0 to $500k','$500k to $1M','$1M to $2.5M','$2.5M to $5M','$5M to $7.5M','$7.5M+'] as const
const TEAM_SIZE_OPTIONS = ['1 to 5','6 to 10','11 to 20','21 to 50','51 to 100','101+'] as const

// ─── Form state type ──────────────────────────────────────────────────────────

interface FormState {
  firstName: string
  lastName: string
  companyEmail: string
  yearFounded: string
  latestFundingRound: string
  totalAmountRaised: string
  teamSize: string
  useCase: string
}

const EMPTY_FORM: FormState = {
  firstName: '',
  lastName: '',
  companyEmail: '',
  yearFounded: '',
  latestFundingRound: '',
  totalAmountRaised: '',
  teamSize: '',
  useCase: '',
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function StartupApplicationSection({
  heading = '80% off Fethr. Benefits built for startups.',
  benefitsLabel = 'Benefits',
  benefits = [
    '80% off the annual Pro plan and credits for the first year',
    '30% off the second year',
    'Dedicated onboarding support',
    'Perks from tools startups love, including 3 months of Linear and 6 months of Notion for free',
  ],
  qualificationNote = 'To qualify, you must be affiliated with a venture firm or a Fethr startup partner.',
  onSubmit,
}: {
  heading?: string
  benefitsLabel?: string
  benefits?: string[]
  qualificationNote?: string
  /** Called with form data on submit. Show a success/error state in your page. */
  onSubmit?: (data: FormState) => void | Promise<void>
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)

  function set(field: keyof FormState) {
    return (v: string) => setForm((prev) => ({ ...prev, [field]: v }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit?.(form)
  }

  return (
    <section>
      <div className="container">
        <div className="border-subtle-stroke grid grid-cols-12 gap-x-6 pb-20 lg:pb-32 xl:pb-44">
          <div className="col-span-12 xl:col-start-2 xl:col-end-12">
            <div className="flex flex-col items-stretch gap-x-6 gap-y-10 lg:flex-row xl:flex-row">

              {/* ── Left: heading + benefits ─────────────────────────── */}
              <div className="grid flex-1 grid-cols-5 gap-x-6 lg:self-start">
                <div className="col-span-5 xl:col-start-1 xl:col-end-5">
                  <div className="flex flex-col gap-y-[30px] lg:gap-y-10">

                    {/* Heading */}
                    <h2 className="text-pretty text-heading-responsive-md">{heading}</h2>

                    {/* Benefits */}
                    <div className="font-medium text-tertiary-foreground lg:text-lg">
                      <p className="font-semibold">{benefitsLabel}</p>
                      <ul className="mt-1.5 list-disc pl-3.5 marker:text-fg-caption">
                        {benefits.map((b) => (
                          <li key={b} className="py-1.5 pl-1.5 text-base">{b}</li>
                        ))}
                      </ul>
                      {qualificationNote && (
                        <p className="mt-8">{qualificationNote}</p>
                      )}
                    </div>

                  </div>
                </div>
              </div>

              {/* ── Right: form card ─────────────────────────────────── */}
              <div className="grid flex-1 grid-cols-5 gap-x-6 lg:self-start">
                <div className="col-span-5">
                  <div className="rounded-[20px] bg-white-400 p-6 xl:p-10">
                    <form id="startup-application-form" onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-y-5">

                        {/* First + Last name */}
                        <div className="grid grid-cols-2 gap-x-5 gap-y-3 max-md:grid-cols-1">
                          <div className="flex flex-col gap-y-1.5">
                            <Label htmlFor="firstName">First name</Label>
                            <TextInput id="firstName" name="firstName" placeholder="e.g. Julia" value={form.firstName} onChange={set('firstName')} />
                          </div>
                          <div className="flex flex-col gap-y-1.5">
                            <Label htmlFor="lastName">Last name</Label>
                            <TextInput id="lastName" name="lastName" placeholder="e.g. Arowa" value={form.lastName} onChange={set('lastName')} />
                          </div>
                        </div>

                        {/* Company email */}
                        <div className="flex flex-col gap-y-1.5">
                          <Label htmlFor="companyEmail">Company email</Label>
                          <TextInput id="companyEmail" name="companyEmail" type="email" placeholder="e.g. julia@example.com" value={form.companyEmail} onChange={set('companyEmail')} />
                        </div>

                        {/* Year founded + Funding round */}
                        <div className="grid grid-cols-2 gap-x-5 gap-y-5 max-md:grid-cols-1">
                          <div className="flex flex-col gap-y-1.5">
                            <Label htmlFor="yearFounded">Year founded</Label>
                            <SelectInput id="yearFounded" name="yearFounded" options={YEAR_OPTIONS} value={form.yearFounded} onChange={set('yearFounded')} />
                          </div>
                          <div className="flex flex-col gap-y-1.5">
                            <Label htmlFor="latestFundingRound">Latest funding round</Label>
                            <SelectInput id="latestFundingRound" name="latestFundingRound" options={FUNDING_ROUND_OPTIONS} value={form.latestFundingRound} onChange={set('latestFundingRound')} />
                          </div>
                        </div>

                        {/* Amount raised + Team size */}
                        <div className="grid grid-cols-2 gap-x-5 gap-y-5 max-md:grid-cols-1">
                          <div className="flex flex-col gap-y-1.5">
                            <Label htmlFor="totalAmountRaised">Total amount raised</Label>
                            <SelectInput id="totalAmountRaised" name="totalAmountRaised" options={AMOUNT_RAISED_OPTIONS} value={form.totalAmountRaised} onChange={set('totalAmountRaised')} />
                          </div>
                          <div className="flex flex-col gap-y-1.5">
                            <Label htmlFor="teamSize">Team size</Label>
                            <SelectInput id="teamSize" name="teamSize" options={TEAM_SIZE_OPTIONS} value={form.teamSize} onChange={set('teamSize')} />
                          </div>
                        </div>

                        {/* Use case */}
                        <div className="flex flex-col gap-y-1.5">
                          <Label htmlFor="useCase">Use case</Label>
                          <TextInput id="useCase" name="useCase" placeholder="What will you use Fethr for?" value={form.useCase} onChange={set('useCase')} />
                        </div>

                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="button-primary border mt-7 h-[46px] w-full rounded-xl px-3.5 text-base"
                      >
                        Apply
                      </button>

                      {/* reCAPTCHA note */}
                      <p className="mt-4 max-w-[36em] text-balance text-fg-accent text-xs">
                        This site is protected by reCAPTCHA and the Google{' '}
                        <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a>
                        {' '}and{' '}
                        <a href="https://policies.google.com/terms" className="underline">Terms of Service</a>
                        {' '}apply.
                      </p>

                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
