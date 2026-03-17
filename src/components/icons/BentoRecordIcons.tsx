/**
 * BentoRecordIcons
 *
 * 12×12 SVG icons for each field row in BentoRecordVisual.
 * Stroke color defaults to #75777C (Attio muted-icon tone).
 * Add new exports here as each icon is provided.
 */

import type { ReactNode } from 'react'

const STROKE = '#75777C'

export function DomainsIcon(): ReactNode {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={STROKE} aria-hidden>
      <circle cx="6" cy="6" r="4.75" strokeLinejoin="round" />
      <path d="M6 1.25V1.25C3.37665 3.87335 3.37665 8.12665 6 10.75V10.75" strokeLinejoin="round" />
      <path d="M6 1.25V1.25C8.62335 3.87335 8.62335 8.12665 6 10.75V10.75" strokeLinejoin="round" />
      <path d="M1.61538 6H10.3846" strokeLinejoin="round" />
    </svg>
  )
}

export function NameIcon(): ReactNode {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#75777C">
      <path d="M0.75 4.7C0.75 3.57989 0.75 3.01984 0.967987 2.59202C1.15973 2.21569 1.46569 1.90973 1.84202 1.71799C2.26984 1.5 2.8299 1.5 3.95 1.5H6H8.05C9.17011 1.5 9.73016 1.5 10.158 1.71799C10.5343 1.90973 10.8403 2.21569 11.032 2.59202C11.25 3.01984 11.25 3.5799 11.25 4.7V7.3C11.25 8.42011 11.25 8.98016 11.032 9.40798C10.8403 9.78431 10.5343 10.0903 10.158 10.282C9.73016 10.5 9.17011 10.5 8.05 10.5H6H3.95C2.8299 10.5 2.26984 10.5 1.84202 10.282C1.46569 10.0903 1.15973 9.78431 0.967987 9.40798C0.75 8.98016 0.75 8.42011 0.75 7.3V4.7Z"></path>
      <path d="M4.05005 6.75H3.61854C3.02843 6.75 2.55005 7.22838 2.55005 7.81849C2.55005 8.05681 2.74324 8.25 2.98156 8.25H4.05005H5.11854C5.35686 8.25 5.55005 8.05681 5.55005 7.81849C5.55005 7.22838 5.07167 6.75 4.48156 6.75H4.05005Z" strokeLinecap="round" strokeLinejoin="round"></path>
      <circle cx="4.05009" cy="4.65" r="0.9" strokeLinecap="round" strokeLinejoin="round"></circle>
      <path d="M7.35004 5.1001H9.45004" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M7.34998 6.8999H9.44998" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  )
}

export function EstimatedARRIcon(): ReactNode {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#75777C"><path d="M8.39681 1.95005C7.5916 1.38302 6.6097 1.05005 5.55004 1.05005C2.81623 1.05005 0.600037 3.26624 0.600037 6.00005C0.600037 8.73386 2.81623 10.95 5.55004 10.95C6.6097 10.95 7.5916 10.6171 8.39681 10.05" strokeLinecap="round"></path><path d="M9.8999 8.84995L9.8999 3.44995M9.8999 3.44995L8.3999 4.94995M9.8999 3.44995L11.3999 4.94995" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.55005 2.99976V3.85689" strokeLinecap="round"></path><path d="M5.54987 8.1427V8.99984" strokeLinecap="round"></path><path d="M4.07944 8.14262H6.22494C6.52331 8.14262 6.80946 8.02973 7.02043 7.8288C7.23141 7.62787 7.34994 7.35535 7.34994 7.07119C7.34994 6.78704 7.23141 6.51452 7.02043 6.31359C6.80946 6.11266 6.52331 5.99977 6.22494 5.99977H4.87494C4.57657 5.99977 4.29042 5.88689 4.07944 5.68596C3.86847 5.48503 3.74994 5.21251 3.74994 4.92835C3.74994 4.6442 3.86847 4.37168 4.07944 4.17075C4.29042 3.96982 4.57657 3.85693 4.87494 3.85693H6.98994" strokeLinecap="round"></path></svg>
  )
}

export function LocationIcon(): ReactNode {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#75777C"><path d="M10.5 5.25C10.5 8.48528 7.73528 11.25 6 11.25C4.26472 11.25 1.5 8.48528 1.5 5.25C1.5 2.76472 3.51472 0.75 6 0.75C8.48528 0.75 10.5 2.76472 10.5 5.25Z"></path><circle cx="6" cy="5.25" r="1.5"></circle></svg>
  )
}


export function CategoriesIcon(): ReactNode {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" stroke="#75777C" fill="none"><path d="M0.75 4.7C0.75 3.57989 0.75 3.01984 0.967987 2.59202C1.15973 2.21569 1.46569 1.90973 1.84202 1.71799C2.26984 1.5 2.8299 1.5 3.95 1.5H6H8.05C9.17011 1.5 9.73016 1.5 10.158 1.71799C10.5343 1.90973 10.8403 2.21569 11.032 2.59202C11.25 3.01984 11.25 3.5799 11.25 4.7V7.3C11.25 8.42011 11.25 8.98016 11.032 9.40798C10.8403 9.78431 10.5343 10.0903 10.158 10.282C9.73016 10.5 9.17011 10.5 8.05 10.5H6H3.95C2.8299 10.5 2.26984 10.5 1.84202 10.282C1.46569 10.0903 1.15973 9.78431 0.967987 9.40798C0.75 8.98016 0.75 8.42011 0.75 7.3V4.7Z"></path><path d="M7.64996 5.10007L8.54996 4.20007L9.44996 5.10007" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.65002 6.8998L8.55002 7.7998L9.45002 6.8998" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.5498 4.95001H5.8498" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.5498 7.05011H5.8498" strokeLinecap="round" strokeLinejoin="round"></path></svg>
  )
}

export function FundingRaisedIcon(): ReactNode {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#75777C"><circle cx="5.99988" cy="6" r="5" strokeLinecap="round"></circle><path d="M6.00006 3V3.85714" strokeLinecap="round"></path><path d="M5.99988 8.14288V9.00002" strokeLinecap="round"></path><path d="M4.52946 8.1428H6.67495C6.97332 8.1428 7.25947 8.02992 7.47045 7.82899C7.68143 7.62806 7.79995 7.35554 7.79995 7.07138C7.79995 6.78722 7.68143 6.5147 7.47045 6.31377C7.25947 6.11284 6.97332 5.99996 6.67495 5.99996H5.32495C5.02658 5.99996 4.74043 5.88708 4.52946 5.68615C4.31848 5.48522 4.19995 5.2127 4.19995 4.92854C4.19995 4.64438 4.31848 4.37186 4.52946 4.17093C4.74043 3.97 5.02658 3.85712 5.32495 3.85712H7.43995" strokeLinecap="round"></path></svg>
  )
}

export function StakeholdersIcon(): ReactNode {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="#75777C" xmlns="http://www.w3.org/2000/svg"><path d="M2.35283 10.75H8.39717C8.93721 10.75 9.375 10.3122 9.375 9.77217C9.375 8.37922 8.24578 7.25 6.85283 7.25H5.375H3.89717C2.50422 7.25 1.375 8.37922 1.375 9.77217C1.375 10.3122 1.81279 10.75 2.35283 10.75Z" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="5.46429" cy="3.25" r="2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"></circle><path d="M10.225 7.27661C11.5747 7.46374 12.6247 8.61727 12.6247 10.0164C12.6247 10.625 11.9999 10.575 11.5523 10.575H11.0008" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.42507 5.25C9.52964 5.25 10.4251 4.35457 10.4251 3.25C10.4251 2.14543 9.52964 1.25 8.42507 1.25" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"></path></svg>
  )
}
