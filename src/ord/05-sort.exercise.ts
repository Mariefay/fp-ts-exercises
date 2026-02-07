import * as Ord from 'fp-ts/Ord'
import * as A from 'fp-ts/Array'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type User = {
  name: string
  score: number
}

// @ts-ignore
const sortByScore = (users: User[]): User[] => {
  //TODO: Sort users by score using A.sortBy
  //HINT: Create Ord for score field, then use A.sortBy
}

// @ts-ignore
const clamp = (min: number, max: number, value: number): number => {
  //TODO: Clamp value between min and max
  //HINT: Use Ord.clamp with N.Ord
}

//TESTS
describe('Ord sort', () => {
  it('sorts users by score', () => {
    const users: User[] = [
      { name: 'Alice', score: 85 },
      { name: 'Bob', score: 92 },
      { name: 'Charlie', score: 78 },
    ]
    const result = sortByScore(users)
    expect(result[0].name).toBe('Charlie')
    expect(result[2].name).toBe('Bob')
  })

  it('clamps values', () => {
    expect(clamp(0, 100, 50)).toBe(50)
    expect(clamp(0, 100, -10)).toBe(0)
    expect(clamp(0, 100, 150)).toBe(100)
  })
})
