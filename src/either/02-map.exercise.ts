import { describe, it, expect } from 'vitest'
import * as E from 'fp-ts/Either'

interface User {
  id: number
  name: string
  email: string
}

type UserError = 'User not found'

// @ts-ignore
const getUserEmail = (userEither: E.Either<UserError, User>): E.Either<UserError, string> => {
  //TODO:
  //Use E.map to extract the email from the user
  //If userEither is Right, map the user to their email
  //If userEither is Left, the error passes through unchanged
}

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
