import * as S from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const combineStrings = (s1: string, s2: string): string => {
  //TODO: Use Semigroup to concatenate two strings
  //HINT: S.concatAll takes a semigroup and an array
}

// @ts-ignore
const combineNumbers = (numbers: number[]): number => {
  //TODO: Use N.SemigroupSum to sum all numbers
  //HINT: S.concatAll(N.SemigroupSum)(numbers)
}

//TESTS
describe('Semigroup basics', () => {
  it('combines strings with space', () => {
    const result = combineStrings('Hello', 'World')
    expect(result).toBe('Hello World')
  })

  it('sums numbers using SemigroupSum', () => {
    const result = combineNumbers([1, 2, 3, 4, 5])
    expect(result).toBe(15)
  })

  it('handles single number', () => {
    const result = combineNumbers([42])
    expect(result).toBe(42)
  })
})
