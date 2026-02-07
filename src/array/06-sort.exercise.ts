import * as Ord from 'fp-ts/Ord'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const sortNumbersAscending = (numbers: number[]): number[] => {
  //TODO: Use Array.sort with Ord.fromCompare to sort numbers in ascending order
  //HINT: Use N.Ord for number ordering
}

// @ts-ignore
const sortUsersByAge = (users: Array<{ name: string; age: number }>): Array<{ name: string; age: number }> => {
  //TODO: Use Array.sort with a custom Ord to sort users by age
  //HINT: Use Ord.contramap to create an Ord for user objects based on age
}

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
