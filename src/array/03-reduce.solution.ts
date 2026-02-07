import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const sumNumbers = (numbers: number[]): number =>
  pipe(
    numbers,
    A.reduce(0, (acc, n) => acc + n)
  )

export const concatenateStrings = (strings: string[]): string =>
  pipe(
    strings,
    A.reduce('', (acc, str) => acc + ' ' + str),
    (result) => result.trim()
  )

//TESTS
describe('Array reduce operations', () => {
  it('sums all numbers', () => {
    const result = sumNumbers([1, 2, 3, 4, 5])
    expect(result).toBe(15)
  })

  it('returns 0 for empty array', () => {
    const result = sumNumbers([])
    expect(result).toBe(0)
  })

  it('concatenates strings with spaces', () => {
    const result = concatenateStrings(['Hello', 'functional', 'world'])
    expect(result).toBe('Hello functional world')
  })

  it('handles single string', () => {
    const result = concatenateStrings(['Hello'])
    expect(result).toBe('Hello')
  })
})
