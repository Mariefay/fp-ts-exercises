import * as S from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { describe, it, expect } from 'vitest'

export const getFirstValue = <T>(values: T[]): T =>
  S.concatAll(S.first<T>())(values[0])(values)

export const getLastValue = <T>(values: T[]): T =>
  S.concatAll(S.last<T>())(values[0])(values)

export const getMinNumber = (numbers: number[]): number =>
  S.concatAll(S.min(N.Ord))(numbers[0])(numbers)

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
