'use client'

import { useCallback, useRef } from 'react'

/**
 * Honeypot + start time for the public lead forms (checked by src/lib/spamGuard.ts).
 *
 *   const { trap, trapFields } = useSpamTrap()
 *   <form>{trap} ...</form>
 *   body: JSON.stringify({ ...form, ...trapFields() })
 *
 * The start time is taken when the trap input mounts, so a dialog form counts
 * from when it opened, not from page load.
 */
export function useSpamTrap() {
  const inputRef  = useRef<HTMLInputElement | null>(null)
  const startedAt = useRef<number | null>(null)

  const attach = useCallback((el: HTMLInputElement | null) => {
    inputRef.current = el
    if (el) startedAt.current = Date.now()
  }, [])

  const trap = (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        Website
        <input ref={attach} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )

  const trapFields = useCallback(
    () => ({ website: inputRef.current?.value ?? '', startedAt: startedAt.current }),
    [],
  )

  return { trap, trapFields }
}
