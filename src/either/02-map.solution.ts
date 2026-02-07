import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
  email: string
}

type UserError = 'User not found'

export const getUserEmail = (userEither: E.Either<UserError, User>): E.Either<UserError, string> =>
  pipe(
    userEither,
    E.map(user => user.email)
  )

//TESTS
describe('getUserEmail', () => {
  const user: User = { id: 1, name: 'Alice', email: 'alice@example.com' }
  const userRight: E.Either<UserError, User> = E.right(user)
  const userLeft: E.Either<UserError, User> = E.left('User not found')

  it('maps right value to email', () => {
    const result = getUserEmail(userRight)
    expect(result).toEqual({ _tag: 'Right', right: 'alice@example.com' })
  })

  it('preserves left value', () => {
    const result = getUserEmail(userLeft)
    expect(result).toEqual({ _tag: 'Left', left: 'User not found' })
  })
})
