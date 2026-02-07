import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const doubleNumbers = (numbers: number[]): number[] =>
  pipe(
    numbers,
    A.map((n) => n * 2)
  )

export const extractNames = (users: Array<{ name: string; age: number }>): string[] =>
  pipe(
    users,
    A.map((user) => user.name)
  )

//TESTS
describe('Array map operations', () => {
  it('doubles all numbers in an array', () => {
    const result = doubleNumbers([1, 2, 3, 4, 5])
    expect(result).toEqual([2, 4, 6, 8, 10])
  })

  it('handles empty array', () => {
    const result = doubleNumbers([])
    expect(result).toEqual([])
  })

  it('extracts names from user objects', () => {
    const users = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 35 },
    ]
    const result = extractNames(users)
    expect(result).toEqual(['Alice', 'Bob', 'Charlie'])
  })
})
