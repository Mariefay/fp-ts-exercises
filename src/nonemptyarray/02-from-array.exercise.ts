import * as NEA from 'fp-ts/NonEmptyArray'
import * as O from 'fp-ts/Option'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const fromArraySafe = (arr: number[]): O.Option<NEA.NonEmptyArray<number>> => {
  //TODO: Convert a regular array to NonEmptyArray (returns Option because array might be empty)
  //HINT: Use NEA.fromArray
}

// @ts-ignore
const getFirstOrDefault = (arr: number[], defaultValue: number): number => {
  //TODO: Try to convert to NonEmptyArray and get head, or return default
  //HINT: Use NEA.fromArray, then O.map with NEA.head, then O.getOrElse
}

//TESTS
describe('NonEmptyArray from array', () => {
  it('converts non-empty array', () => {
    const result = fromArraySafe([1, 2, 3])
    expect(O.isSome(result)).toBe(true)
    if (O.isSome(result)) {
      expect(result.value).toEqual([1, 2, 3])
    }
  })

  it('returns None for empty array', () => {
    const result = fromArraySafe([])
    expect(O.isNone(result)).toBe(true)
  })

  it('gets first or default', () => {
    expect(getFirstOrDefault([5, 10, 15], 0)).toBe(5)
    expect(getFirstOrDefault([], 99)).toBe(99)
  })
})
