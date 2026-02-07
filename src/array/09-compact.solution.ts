import * as A from 'fp-ts/Array'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const getValidNumbers = (numbers: Array<O.Option<number>>): number[] =>
  pipe(
    numbers,
    A.compact
  )

export const safeDivide = (numbers: number[]): number[] =>
  pipe(
    numbers,
    A.map((n) => (n === 0 ? O.none : O.some(100 / n))),
    A.compact
  )

//TESTS
describe('Array compact operations', () => {
  it('removes None values and extracts Some values', () => {
    const numbers = [O.some(1), O.none, O.some(2), O.none, O.some(3)]
    const result = getValidNumbers(numbers)
    expect(result).toEqual([1, 2, 3])
  })

  it('returns empty array when all None', () => {
    const numbers = [O.none, O.none, O.none]
    const result = getValidNumbers(numbers)
    expect(result).toEqual([])
  })

  it('safely divides numbers, skipping zeros', () => {
    const result = safeDivide([2, 0, 5, 0, 10])
    expect(result).toEqual([50, 20, 10])
  })
})
