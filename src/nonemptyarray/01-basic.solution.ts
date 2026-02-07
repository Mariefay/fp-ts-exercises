import * as NEA from 'fp-ts/NonEmptyArray'
import { describe, it, expect } from 'vitest'

export const createNonEmpty = (first: number, rest: number[]): NEA.NonEmptyArray<number> => [first, ...rest]

export const safeHead = (arr: NEA.NonEmptyArray<number>): number => NEA.head(arr)

export const safeLast = (arr: NEA.NonEmptyArray<number>): number => NEA.last(arr)

//TESTS
describe('NonEmptyArray basics', () => {
  it('creates non-empty array', () => {
    const result = createNonEmpty(1, [2, 3, 4])
    expect(result).toEqual([1, 2, 3, 4])
    expect(result.length).toBeGreaterThan(0)
  })

  it('safely gets head', () => {
    const arr = NEA.of(42)
    expect(safeHead(arr)).toBe(42)
  })

  it('safely gets last', () => {
    const arr: NEA.NonEmptyArray<number> = [1, 2, 3, 4, 5]
    expect(safeLast(arr)).toBe(5)
  })

  it('head and last same for single element', () => {
    const arr = NEA.of(99)
    expect(safeHead(arr)).toBe(99)
    expect(safeLast(arr)).toBe(99)
  })
})
