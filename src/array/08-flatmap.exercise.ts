import { describe, it, expect } from 'vitest'

type User = {
  name: string
  hobbies: string[]
}

// @ts-ignore
const getAllHobbies = (users: User[]): string[] => {
  //TODO: Use Array.flatMap (or chain + flatten) to get all hobbies from all users
  //HINT: flatMap is like map followed by flatten - it extracts and flattens in one step
}

// @ts-ignore
const explodeNumbers = (numbers: number[]): number[] => {
  //TODO: Use Array.flatMap to create an array where each number appears twice
  //HINT: For each number n, return [n, n]
}

//TESTS
describe('Array flatMap operations', () => {
  it('gets all hobbies from all users', () => {
    const users: User[] = [
      { name: 'Alice', hobbies: ['reading', 'gaming'] },
      { name: 'Bob', hobbies: ['cooking'] },
      { name: 'Charlie', hobbies: ['running', 'cycling', 'swimming'] },
    ]
    const result = getAllHobbies(users)
    expect(result).toEqual(['reading', 'gaming', 'cooking', 'running', 'cycling', 'swimming'])
  })

  it('explodes numbers into pairs', () => {
    const result = explodeNumbers([1, 2, 3])
    expect(result).toEqual([1, 1, 2, 2, 3, 3])
  })

  it('handles empty array', () => {
    const result = getAllHobbies([])
    expect(result).toEqual([])
  })
})
