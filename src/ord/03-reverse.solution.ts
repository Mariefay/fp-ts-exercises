import * as Ord from 'fp-ts/Ord'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const sortDescending = (numbers: number[]): number[] =>
  [...numbers].sort(Ord.reverse(N.Ord).compare)

export const sortWordsReverse = (words: string[]): string[] =>
  [...words].sort(pipe(S.Ord, Ord.reverse).compare)

//TESTS
describe('Ord reverse', () => {
  it('sorts numbers descending', () => {
    const result = sortDescending([3, 1, 4, 1, 5, 9])
    expect(result).toEqual([9, 5, 4, 3, 1, 1])
  })

  it('sorts words reverse alphabetically', () => {
    const result = sortWordsReverse(['apple', 'banana', 'cherry'])
    expect(result).toEqual(['cherry', 'banana', 'apple'])
  })
})
