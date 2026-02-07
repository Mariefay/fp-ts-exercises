import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
}

type UserError = 'User not found'

export const getUserName = (userEither: E.Either<UserError, User>): string =>
  pipe(
    userEither,
    E.map(user => user.name),
    E.getOrElse(() => 'Anonymous')
  )

//TESTS
describe('getUserName', () => {
  const userRight: E.Either<UserError, User> = E.right({ id: 1, name: 'Alice' })
  const userLeft: E.Either<UserError, User> = E.left('User not found')

  it('returns user name for right value', () => {
    const result = getUserName(userRight)
    expect(result).toEqual('Alice')
  })

  it('returns default value for left', () => {
    const result = getUserName(userLeft)
    expect(result).toEqual('Anonymous')
  })
})
