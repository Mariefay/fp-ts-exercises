import * as NEA from 'fp-ts/NonEmptyArray'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const fromArraySafe = (arr: number[]): O.Option<NEA.NonEmptyArray<number>> =>
  NEA.fromArray(arr)

export const getFirstOrDefault = (arr: number[], defaultValue: number): number =>
  pipe(
    NEA.fromArray(arr),
    O.map(NEA.head),
    O.getOrElse(() => defaultValue)
  )

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
