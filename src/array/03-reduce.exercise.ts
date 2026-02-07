import { describe, it, expect } from 'vitest'

// @ts-ignore
const sumNumbers = (numbers: number[]): number => {
  //TODO: Use Array.reduce to sum all numbers
  //HINT: Start with 0 as the initial value
}

// @ts-ignore
const concatenateStrings = (strings: string[]): string => {
  //TODO: Use Array.reduce to concatenate all strings with a space between them
  //HINT: Start with an empty string and trim the result
}

//TESTS
describe('Array reduce operations', () => {
  it('sums all numbers', () => {
    const result = sumNumbers([1, 2, 3, 4, 5])
    expect(result).toBe(15)
  })

  it('returns 0 for empty array', () => {
    const result = sumNumbers([])
    expect(result).toBe(0)
  })

  it('concatenates strings with spaces', () => {
    const result = concatenateStrings(['Hello', 'functional', 'world'])
    expect(result).toBe('Hello functional world')
  })

  it('handles single string', () => {
    const result = concatenateStrings(['Hello'])
    expect(result).toBe('Hello')
  })
})
