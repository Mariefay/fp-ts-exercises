import { describe, it, expect } from 'vitest'

interface User {
  id: number
  name: string
}

type UserError = 'Invalid ID' | 'User not found'

// @ts-ignore
const getUserName = (userEither: E.Either<UserError, User>): string => {
  //TODO:
  //Use E.fold to handle both Left and Right cases
  //If Left, return the error message as a string
  //If Right, return the user's name
  //Use pipe for functional composition
}

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
