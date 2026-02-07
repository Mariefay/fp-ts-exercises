import { describe, it, expect } from 'vitest'

// @ts-ignore
const getAdultNames = (users: Array<{ name: string; age: number }>): string[] => {
  //TODO: Chain Array.filter and Array.map to get names of users 18 or older
  //HINT: First filter for adults, then map to get just the names
}

// @ts-ignore
const doubleEvenNumbers = (numbers: number[]): number[] => {
  //TODO: Chain Array.filter and Array.map to double only the even numbers
  //HINT: Filter for even numbers, then map to double them
}

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
