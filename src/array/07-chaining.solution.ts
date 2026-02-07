import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const getAdultNames = (users: Array<{ name: string; age: number }>): string[] =>
  pipe(
    users,
    A.filter((user) => user.age >= 18),
    A.map((user) => user.name)
  )

export const doubleEvenNumbers = (numbers: number[]): number[] =>
  pipe(
    numbers,
    A.filter((n) => n % 2 === 0),
    A.map((n) => n * 2)
  )

//TESTS
describe('Array chaining operations', () => {
  it('gets names of adult users', () => {
    const users = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 15 },
      { name: 'Charlie', age: 30 },
      { name: 'David', age: 17 },
    ]
    const result = getAdultNames(users)
    expect(result).toEqual(['Alice', 'Charlie'])
  })

  it('doubles only even numbers', () => {
    const result = doubleEvenNumbers([1, 2, 3, 4, 5, 6])
    expect(result).toEqual([4, 8, 12])
  })

  it('handles empty array', () => {
    const result = getAdultNames([])
    expect(result).toEqual([])
  })
})
