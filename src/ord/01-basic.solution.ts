import * as Ord from 'fp-ts/Ord'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import { describe, it, expect } from 'vitest'

export const compareNumbers = (a: number, b: number): number =>
  N.Ord.compare(a, b)

export const sortWords = (words: string[]): string[] =>
  [...words].sort(S.Ord.compare)

//TESTS
describe('Ord basic', () => {
  it('compares numbers', () => {
    expect(compareNumbers(5, 10)).toBeLessThan(0)
    expect(compareNumbers(10, 5)).toBeGreaterThan(0)
    expect(compareNumbers(5, 5)).toBe(0)
  })

  it('sorts words alphabetically', () => {
    const result = sortWords(['zebra', 'apple', 'banana'])
    expect(result).toEqual(['apple', 'banana', 'zebra'])
  })
})
