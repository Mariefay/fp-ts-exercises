import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
  email: string
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]

type UserError = 'Invalid ID' | 'User not found'

export const getUserEmail = (id: number): E.Either<UserError, string> =>
  pipe(
    id,
    E.fromPredicate(
      (id) => id > 0,
      () => 'Invalid ID' as UserError
    ),
    E.chain((id) => {
      const user = users.find(u => u.id === id)
      return user ? E.right(user) : E.left('User not found' as UserError)
    }),
    E.map(user => user.email)
  )

//TESTS
describe('getUserEmail', () => {
  it('returns Right with email when user found', () => {
    const result = getUserEmail(1)
    expect(result).toEqual({ _tag: 'Right', right: 'alice@example.com' })
  })

  it('returns Left for invalid ID', () => {
    const result = getUserEmail(0)
    expect(result).toEqual({ _tag: 'Left', left: 'Invalid ID' })
  })

  it('returns Left when user not found', () => {
    const result = getUserEmail(99)
    expect(result).toEqual({ _tag: 'Left', left: 'User not found' })
  })
})
