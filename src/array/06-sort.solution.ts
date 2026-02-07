import * as A from 'fp-ts/Array'
import * as Ord from 'fp-ts/Ord'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const sortNumbersAscending = (numbers: number[]): number[] =>
  pipe(
    numbers,
    A.sort(N.Ord)
  )

const userByAge = pipe(
  N.Ord,
  Ord.contramap((user: { name: string; age: number }) => user.age)
)

export const sortUsersByAge = (users: Array<{ name: string; age: number }>): Array<{ name: string; age: number }> =>
  pipe(
    users,
    A.sort(userByAge)
  )

//TESTS
describe('Array sort operations', () => {
  it('sorts numbers in ascending order', () => {
    const result = sortNumbersAscending([5, 2, 8, 1, 9])
    expect(result).toEqual([1, 2, 5, 8, 9])
  })

  it('handles empty array', () => {
    const result = sortNumbersAscending([])
    expect(result).toEqual([])
  })

  it('sorts users by age', () => {
    const users = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ]
    const result = sortUsersByAge(users)
    expect(result).toEqual([
      { name: 'Bob', age: 25 },
      { name: 'Alice', age: 30 },
      { name: 'Charlie', age: 35 },
    ])
  })
})
