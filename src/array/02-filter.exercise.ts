import { describe, it, expect } from 'vitest'

// @ts-ignore
const filterEvenNumbers = (numbers: number[]): number[] => {
  //TODO: Use Array.filter to keep only even numbers
  //HINT: A number is even if n % 2 === 0
}

// @ts-ignore
const filterAdults = (users: Array<{ name: string; age: number }>): Array<{ name: string; age: number }> => {
  //TODO: Use Array.filter to keep only users aged 18 or older
}

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
