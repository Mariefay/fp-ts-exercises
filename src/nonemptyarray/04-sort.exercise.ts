import * as NEA from 'fp-ts/NonEmptyArray'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const sortNumbers = (arr: NEA.NonEmptyArray<number>): NEA.NonEmptyArray<number> => {
  //TODO: Sort NonEmptyArray of numbers
  //HINT: Use NEA.sort with N.Ord
}

// @ts-ignore
const sortStrings = (arr: NEA.NonEmptyArray<string>): NEA.NonEmptyArray<string> => {
  //TODO: Sort NonEmptyArray of strings
  //HINT: Use NEA.sort with S.Ord
}

//TESTS
describe('NonEmptyArray sort', () => {
  it('sorts numbers', () => {
    const arr: NEA.NonEmptyArray<number> = [5, 2, 8, 1, 9]
    const result = sortNumbers(arr)
    expect(result).toEqual([1, 2, 5, 8, 9])
  })

  it('sorts strings', () => {
    const arr: NEA.NonEmptyArray<string> = ['zebra', 'apple', 'mango']
    const result = sortStrings(arr)
    expect(result).toEqual(['apple', 'mango', 'zebra'])
  })

  it('preserves non-emptiness after sort', () => {
    const arr = NEA.of(42)
    const result = sortNumbers(arr)
    expect(result.length).toBeGreaterThan(0)
  })
})
