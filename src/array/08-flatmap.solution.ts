import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type User = {
  name: string
  hobbies: string[]
}

export const getAllHobbies = (users: User[]): string[] =>
  pipe(
    users,
    A.flatMap((user) => user.hobbies)
  )

export const explodeNumbers = (numbers: number[]): number[] =>
  pipe(
    numbers,
    A.flatMap((n) => [n, n])
  )

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
