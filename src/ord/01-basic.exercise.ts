import * as Ord from 'fp-ts/Ord'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const compareNumbers = (a: number, b: number): number => {
  //TODO: Use Ord.compare with N.Ord to compare two numbers
  //HINT: Ord.compare returns -1, 0, or 1
}

// @ts-ignore
const sortWords = (words: string[]): string[] => {
  //TODO: Sort strings alphabetically using S.Ord
  //HINT: Use Array.prototype.sort with Ord.compare
}

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
