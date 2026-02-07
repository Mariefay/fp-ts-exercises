import * as R from 'fp-ts/Record'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const doubleValues = (record: Record<string, number>): Record<string, number> =>
  pipe(
    record,
    R.map((n) => n * 2)
  )

export const uppercaseValues = (record: Record<string, string>): Record<string, string> =>
  pipe(
    record,
    R.map((s) => s.toUpperCase())
  )

//TESTS
describe('Record map operations', () => {
  it('doubles all values', () => {
    const input = { a: 1, b: 2, c: 3 }
    const result = doubleValues(input)
    expect(result).toEqual({ a: 2, b: 4, c: 6 })
  })

  it('handles empty record', () => {
    const result = doubleValues({})
    expect(result).toEqual({})
  })

  it('uppercases all values', () => {
    const input = { name: 'alice', city: 'paris' }
    const result = uppercaseValues(input)
    expect(result).toEqual({ name: 'ALICE', city: 'PARIS' })
  })
})
