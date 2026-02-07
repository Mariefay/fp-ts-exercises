import * as NEA from 'fp-ts/NonEmptyArray'
import * as Eq from 'fp-ts/Eq'
import * as N from 'fp-ts/number'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const groupConsecutive = (arr: NEA.NonEmptyArray<number>): NEA.NonEmptyArray<NEA.NonEmptyArray<number>> => {
  //TODO: Group consecutive equal numbers
  //HINT: Use NEA.group with N.Eq
}

// @ts-ignore
const groupByParity = (arr: NEA.NonEmptyArray<number>): NEA.NonEmptyArray<NEA.NonEmptyArray<number>> => {
  //TODO: Group numbers by parity (odd/even) consecutively
  //HINT: Create custom Eq that checks if both are odd or both are even
}

//TESTS
describe('NonEmptyArray grouping', () => {
  it('groups consecutive equal numbers', () => {
    const arr: NEA.NonEmptyArray<number> = [1, 1, 2, 2, 2, 3, 1]
    const result = groupConsecutive(arr)
    expect(result).toEqual([[1, 1], [2, 2, 2], [3], [1]])
  })

  it('groups by parity', () => {
    const arr: NEA.NonEmptyArray<number> = [1, 3, 5, 2, 4, 7, 9]
    const result = groupByParity(arr)
    expect(result).toEqual([[1, 3, 5], [2, 4], [7, 9]])
  })

  it('single element creates single group', () => {
    const arr = NEA.of(42)
    const result = groupConsecutive(arr)
    expect(result).toEqual([[42]])
  })
})
