import * as M from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'
import * as Str from 'fp-ts/string'
import { describe, it, expect } from 'vitest'

export const sumAllNumbers = (numbers: number[]): number =>
  M.concatAll(N.MonoidSum)(numbers)

export const joinStrings = (strings: string[]): string =>
  M.concatAll(Str.Monoid)(strings)

//TESTS
describe('Monoid basics', () => {
  it('sums numbers including empty array', () => {
    expect(sumAllNumbers([1, 2, 3, 4, 5])).toBe(15)
    expect(sumAllNumbers([])).toBe(0) // Returns identity element
  })

  it('joins strings including empty array', () => {
    expect(joinStrings(['Hello', 'World'])).toBe('HelloWorld')
    expect(joinStrings([])).toBe('') // Returns identity element
  })

  it('handles single element', () => {
    expect(sumAllNumbers([42])).toBe(42)
    expect(joinStrings(['solo'])).toBe('solo')
  })
})
