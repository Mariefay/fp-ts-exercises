import * as S from 'fp-ts/Semigroup'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const getFirstValue = <T>(values: T[]): T => {
  //TODO: Use S.first to always take the first value when combining
  //HINT: S.first creates a semigroup that keeps the first element
}

// @ts-ignore
const getLastValue = <T>(values: T[]): T => {
  //TODO: Use S.last to always take the last value when combining
  //HINT: S.last creates a semigroup that keeps the last element
}

// @ts-ignore
const getMinNumber = (numbers: number[]): number => {
  //TODO: Create a semigroup that keeps the minimum number
  //HINT: Use S.min from fp-ts/Ord with N.Ord
}

//TESTS
describe('Semigroup first, last, min', () => {
  it('gets first value', () => {
    const result = getFirstValue([1, 2, 3, 4, 5])
    expect(result).toBe(1)
  })

  it('gets last value', () => {
    const result = getLastValue(['a', 'b', 'c', 'd'])
    expect(result).toBe('d')
  })

  it('gets minimum number', () => {
    const result = getMinNumber([5, 2, 8, 1, 9])
    expect(result).toBe(1)
  })

  it('handles single value', () => {
    expect(getFirstValue([42])).toBe(42)
    expect(getLastValue([42])).toBe(42)
    expect(getMinNumber([42])).toBe(42)
  })
})
