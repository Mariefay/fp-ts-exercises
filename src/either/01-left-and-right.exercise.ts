import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
}

type UserError = 'Invalid ID' | 'User not found'

// @ts-ignore
const getUserById = (id: number, users: User[]): E.Either<UserError, User> => {
  //TODO:
  //Check if the ID is valid (greater than 0)
  //If invalid, return E.left with 'Invalid ID' error
  //Try to find the user in the users array
  //If found, return E.right with the user
  //If not found, return E.left with 'User not found' error
}

//TESTS
describe('getUserById', () => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]

  it('returns left with error for invalid ID', () => {
    const result = getUserById(0, users)
    expect(result).toEqual({ _tag: 'Left', left: 'Invalid ID' })
  })

  it('returns right with user if found', () => {
    const result = getUserById(2, users)
    expect(result).toEqual({ _tag: 'Right', right: { id: 2, name: 'Bob' } })
  })

  it('returns left with error if user not found', () => {
    const result = getUserById(99, users)
    expect(result).toEqual({ _tag: 'Left', left: 'User not found' })
  })
})
