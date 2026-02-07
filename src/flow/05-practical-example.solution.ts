import { flow } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { describe, it, expect } from 'vitest'

interface RawUserData {
  email: string
  age: string
  name: string
}

interface User {
  email: string
  age: number
  name: string
}

type ParseError = 'Invalid email' | 'Invalid age' | 'Name too short'

const validateEmail = (data: RawUserData): E.Either<ParseError, RawUserData> =>
  data.email.includes('@') ? E.right(data) : E.left('Invalid email')

const parseAge = (data: RawUserData): E.Either<ParseError, { email: string; age: number; name: string }> => {
  const age = parseInt(data.age, 10)
  return isNaN(age) ? E.left('Invalid age') : E.right({ ...data, age })
}

const validateName = (data: { email: string; age: number; name: string }): E.Either<ParseError, User> =>
  data.name.length >= 2 ? E.right(data) : E.left('Name too short')

export const parseUser = flow(
  validateEmail,
  E.chain(parseAge),
  E.chain(validateName)
)

//TESTS
describe('parseUser', () => {
  it('successfully parses valid user data', () => {
    const rawData: RawUserData = {
      email: 'alice@example.com',
      age: '25',
      name: 'Alice'
    }
    const result = parseUser(rawData)
    expect(result).toEqual({
      _tag: 'Right',
      right: { email: 'alice@example.com', age: 25, name: 'Alice' }
    })
  })

  it('rejects invalid email', () => {
    const rawData: RawUserData = {
      email: 'notanemail',
      age: '25',
      name: 'Alice'
    }
    const result = parseUser(rawData)
    expect(result).toEqual({ _tag: 'Left', left: 'Invalid email' })
  })

  it('rejects invalid age', () => {
    const rawData: RawUserData = {
      email: 'alice@example.com',
      age: 'not a number',
      name: 'Alice'
    }
    const result = parseUser(rawData)
    expect(result).toEqual({ _tag: 'Left', left: 'Invalid age' })
  })

  it('rejects too short name', () => {
    const rawData: RawUserData = {
      email: 'alice@example.com',
      age: '25',
      name: 'A'
    }
    const result = parseUser(rawData)
    expect(result).toEqual({ _tag: 'Left', left: 'Name too short' })
  })
})
