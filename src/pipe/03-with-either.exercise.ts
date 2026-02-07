import { describe, it, expect } from 'vitest'
import * as E from 'fp-ts/Either'

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

// @ts-ignore
const getUserEmail = (id: number): E.Either<UserError, string> => {
  //TODO:
  //Use pipe to:
  //1. Validate that id > 0 using E.fromPredicate (error: 'Invalid ID')
  //2. Chain to find the user (error: 'User not found' if not found)
  //3. Map to extract the email
  //Import pipe from 'fp-ts/function'
}

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
