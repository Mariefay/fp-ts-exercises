import * as M from 'fp-ts/Monoid'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const MaxMonoid: M.Monoid<number> = {
  //TODO: Create a Monoid that keeps the maximum number
  //HINT: concat should return max(x, y), empty should be -Infinity
  concat: (x, y) => 0, // TODO
  empty: 0, // TODO
}

// @ts-ignore
const combineMax = (numbers: number[]): number => {
  //TODO: Use MaxMonoid to find the maximum
}

// @ts-ignore
const ArrayMonoid = <T>(): M.Monoid<T[]> => ({
  //TODO: Create a Monoid for arrays that concatenates them
  //HINT: concat should use [...x, ...y], empty should be []
  concat: (x, y) => [], // TODO
  empty: [], // TODO
})

// @ts-ignore
const flattenArrays = <T>(arrays: T[][]): T[] => {
  //TODO: Use ArrayMonoid to flatten nested arrays
}

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
