// Run: npx tsx --test src/lib/spamGuard.test.ts
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { MIN_FILL_MS, hasVowellessWord, isGibberish, isGmailDotTrick, spamReason } from './spamGuard'

const NOW = 1_800_000_000_000
const human = { website: '', startedAt: NOW - 30_000 }

describe('spamReason', () => {
  it('drops the startup application bot seen in production', () => {
    const body = {
      ...human,
      firstName: 'Qrlf',
      lastName: 'Oischmo',
      companyEmail: 'v.et.a.h.o.x.822@gmail.com',
      useCase: 'VSXCyBvOtpkGGfiXOi',
    }
    assert.notEqual(
      spamReason(body, { emails: [body.companyEmail], names: [body.firstName, body.lastName], text: [body.useCase] }, NOW),
      null,
    )
  })

  it('passes a normal submission', () => {
    const body = { ...human, firstName: 'Jane', lastName: 'McDonald', email: 'jane.doe@gmail.com' }
    assert.equal(
      spamReason(body, { emails: [body.email], names: ['Jane', 'McDonald'], text: ['We route ADT feeds into our EHR.'] }, NOW),
      null,
    )
  })

  it('catches the honeypot, a missing start time and a too-fast submit', () => {
    assert.equal(spamReason({ ...human, website: 'http://x.io' }, {}, NOW), 'honeypot')
    assert.equal(spamReason({ website: '' }, {}, NOW), 'no-start-time')
    assert.equal(spamReason({ website: '', startedAt: NOW - MIN_FILL_MS + 1 }, {}, NOW), 'too-fast')
  })
})

describe('field checks', () => {
  it('flags gmail addresses with 3+ dots only', () => {
    assert.equal(isGmailDotTrick('v.et.a.h.o.x.822@gmail.com'), true)
    assert.equal(isGmailDotTrick('a.b.c.d@googlemail.com'), true)
    assert.equal(isGmailDotTrick('jane.m.doe@gmail.com'), false)
    assert.equal(isGmailDotTrick('a.b.c.d@hospital.org'), false)
  })

  it('flags random mixed-case tokens but not real words or names', () => {
    assert.equal(isGibberish('VSXCyBvOtpkGGfiXOi'), true)
    for (const ok of ['McDonald', 'DeShawn', 'interoperability', 'HL7', 'Startup Inc', 'MacKenzie']) {
      assert.equal(isGibberish(ok), false, ok)
    }
  })

  it('flags 4+ letter vowel-less name words', () => {
    assert.equal(hasVowellessWord('Qrlf'), true)
    for (const ok of ['Lynn', 'Krzysztof', 'Ng', 'Smyth', 'Anne-Marie']) {
      assert.equal(hasVowellessWord(ok), false, ok)
    }
  })
})
