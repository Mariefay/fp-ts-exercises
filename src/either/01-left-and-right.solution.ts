import * as E from 'fp-ts/Either'
import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
}

type UserError = 'Invalid ID' | 'User not found'

export const getUserById = (id: number, users: User[]): E.Either<UserError, User> => {
  if (id <= 0) {
    return E.left('Invalid ID')
  }

  const user = users.find(u => u.id === id)
  return user ? E.right(user) : E.left('User not found')
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
