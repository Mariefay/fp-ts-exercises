import * as M from 'fp-ts/Monoid'
import { describe, it, expect } from 'vitest'

export const MaxMonoid: M.Monoid<number> = {
  concat: (x, y) => Math.max(x, y),
  empty: -Infinity,
}

export const combineMax = (numbers: number[]): number =>
  M.concatAll(MaxMonoid)(numbers)

export const ArrayMonoid = <T>(): M.Monoid<T[]> => ({
  concat: (x, y) => [...x, ...y],
  empty: [],
})

export const flattenArrays = <T>(arrays: T[][]): T[] =>
  M.concatAll(ArrayMonoid<T>())(arrays)

//TESTS
describe('Custom Monoids', () => {
  it('finds maximum with MaxMonoid', () => {
    expect(combineMax([3, 7, 2, 9, 1])).toBe(9)
    expect(combineMax([5])).toBe(5)
    expect(combineMax([])).toBe(-Infinity)
  })

  it('flattens arrays with ArrayMonoid', () => {
    const result = flattenArrays([[1, 2], [3, 4], [5]])
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('handles empty nested arrays', () => {
    expect(flattenArrays([])).toEqual([])
    expect(flattenArrays([[], [], []])).toEqual([])
  })
})
