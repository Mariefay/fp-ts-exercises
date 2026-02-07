import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
}

type UserError = 'Invalid ID' | 'User not found'

export const getUserName = (userEither: E.Either<UserError, User>): string =>
  pipe(
    userEither,
    E.fold(
      (error) => error,
      (user) => user.name
    )
  )

//TESTS
describe('getUserName', () => {
  const userRight: E.Either<UserError, User> = E.right({ id: 1, name: 'Alice' })
  const userLeft1: E.Either<UserError, User> = E.left('Invalid ID')
  const userLeft2: E.Either<UserError, User> = E.left('User not found')

  it('returns user name for right value', () => {
    const result = getUserName(userRight)
    expect(result).toEqual('Alice')
  })

  it('returns error message for left value - Invalid ID', () => {
    const result = getUserName(userLeft1)
    expect(result).toEqual('Invalid ID')
  })

  it('returns error message for left value - User not found', () => {
    const result = getUserName(userLeft2)
    expect(result).toEqual('User not found')
  })
})
