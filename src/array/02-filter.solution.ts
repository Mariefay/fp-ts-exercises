import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const filterEvenNumbers = (numbers: number[]): number[] =>
  pipe(
    numbers,
    A.filter((n) => n % 2 === 0)
  )

export const filterAdults = (users: Array<{ name: string; age: number }>): Array<{ name: string; age: number }> =>
  pipe(
    users,
    A.filter((user) => user.age >= 18)
  )

//TESTS
describe('Array filter operations', () => {
  it('filters even numbers', () => {
    const result = filterEvenNumbers([1, 2, 3, 4, 5, 6])
    expect(result).toEqual([2, 4, 6])
  })

  it('returns empty array when no matches', () => {
    const result = filterEvenNumbers([1, 3, 5])
    expect(result).toEqual([])
  })

  it('filters adult users', () => {
    const users = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 15 },
      { name: 'Charlie', age: 30 },
      { name: 'David', age: 17 },
    ]
    const result = filterAdults(users)
    expect(result).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 30 },
    ])
  })
})
