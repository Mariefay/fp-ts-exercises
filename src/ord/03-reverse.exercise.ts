import * as Ord from 'fp-ts/Ord'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const sortDescending = (numbers: number[]): number[] => {
  //TODO: Sort numbers in descending order
  //HINT: Use Ord.reverse on N.Ord
}

// @ts-ignore
const sortWordsReverse = (words: string[]): string[] => {
  //TODO: Sort strings in reverse alphabetical order
  //HINT: pipe S.Ord through Ord.reverse
}

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
