import { describe, it, expect } from 'vitest'

// @ts-ignore
const doubleNumbers = (numbers: number[]): number[] => {
  //TODO: Use Array.map to double each number in the array
  //HINT: Import * as A from 'fp-ts/Array' and use pipe
}

// @ts-ignore
const extractNames = (users: Array<{ name: string; age: number }>): string[] => {
  //TODO: Use Array.map to extract just the names from the user objects
}

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
