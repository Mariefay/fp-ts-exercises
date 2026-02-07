import * as NEA from 'fp-ts/NonEmptyArray'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const mapNonEmpty = (arr: NEA.NonEmptyArray<number>): NEA.NonEmptyArray<number> =>
  pipe(
    arr,
    NEA.map((n) => n * 2)
  )

export const concatNonEmpty = (arr1: NEA.NonEmptyArray<number>, arr2: NEA.NonEmptyArray<number>): NEA.NonEmptyArray<number> =>
  NEA.concat(arr2)(arr1)

//TESTS
describe('NonEmptyArray operations', () => {
  it('maps over non-empty array', () => {
    const arr: NEA.NonEmptyArray<number> = [1, 2, 3]
    const result = mapNonEmpty(arr)
    expect(result).toEqual([2, 4, 6])
  })

  it('concatenates non-empty arrays', () => {
    const arr1: NEA.NonEmptyArray<number> = [1, 2]
    const arr2: NEA.NonEmptyArray<number> = [3, 4]
    const result = concatNonEmpty(arr1, arr2)
    expect(result).toEqual([1, 2, 3, 4])
  })

  it('concat preserves non-emptiness', () => {
    const arr1 = NEA.of(1)
    const arr2 = NEA.of(2)
    const result = concatNonEmpty(arr1, arr2)
    expect(result.length).toBeGreaterThan(0)
  })
})
