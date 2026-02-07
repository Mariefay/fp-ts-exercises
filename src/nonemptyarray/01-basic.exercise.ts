import * as NEA from 'fp-ts/NonEmptyArray'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const createNonEmpty = (first: number, rest: number[]): NEA.NonEmptyArray<number> => {
  //TODO: Create a NonEmptyArray from a first element and rest
  //HINT: NEA.fromArray or NEA.cons or direct construction [first, ...rest]
}

// @ts-ignore
const safeHead = (arr: NEA.NonEmptyArray<number>): number => {
  //TODO: Get the first element (head) - no Option needed!
  //HINT: NEA.head
}

// @ts-ignore
const safeLast = (arr: NEA.NonEmptyArray<number>): number => {
  //TODO: Get the last element - no Option needed!
  //HINT: NEA.last
}

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
