import { describe, it, expect } from 'vitest'
import * as E from 'fp-ts/Either'

interface User {
  id: number
  name: string
}

type UserError = 'User not found'

// @ts-ignore
const getUserName = (userEither: E.Either<UserError, User>): string => {
  //TODO:
  //Use E.getOrElse to extract the user's name
  //If Right, return the user's name
  //If Left, return 'Anonymous'
  //Use pipe for functional composition
}

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
