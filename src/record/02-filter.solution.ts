import * as R from 'fp-ts/Record'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const filterPositive = (record: Record<string, number>): Record<string, number> =>
  pipe(
    record,
    R.filter((n) => n > 0)
  )

export const filterByLength = (record: Record<string, string>, minLength: number): Record<string, string> =>
  pipe(
    record,
    R.filter((s) => s.length >= minLength)
  )

//TESTS
describe('Record filter operations', () => {
  it('filters positive numbers', () => {
    const input = { a: 5, b: -2, c: 10, d: -7, e: 3 }
    const result = filterPositive(input)
    expect(result).toEqual({ a: 5, c: 10, e: 3 })
  })

  it('returns empty record when no matches', () => {
    const input = { a: -1, b: -2 }
    const result = filterPositive(input)
    expect(result).toEqual({})
  })

  it('filters by string length', () => {
    const input = { a: 'hi', b: 'hello', c: 'hey', d: 'goodbye' }
    const result = filterByLength(input, 5)
    expect(result).toEqual({ b: 'hello', d: 'goodbye' })
  })
})
