import { describe, it, expect } from 'vitest'
import * as E from 'fp-ts/Either'

type ValidationError = 'Empty string' | 'Too short' | 'Invalid format'

const validateNotEmpty = (s: string): E.Either<ValidationError, string> =>
  s.length > 0 ? E.right(s) : E.left('Empty string')

const validateMinLength = (min: number) => (s: string): E.Either<ValidationError, string> =>
  s.length >= min ? E.right(s) : E.left('Too short')

const validateEmail = (s: string): E.Either<ValidationError, string> =>
  s.includes('@') ? E.right(s) : E.left('Invalid format')

// @ts-ignore
const validateEmailAddress = flow(
  //TODO:
  //Use flow to create an email validation function that:
  //1. Validates not empty
  //2. Chains to validate min length of 5
  //3. Chains to validate email format
  //Return E.Either<ValidationError, string>
  //Import flow from 'fp-ts/function'
)

//TESTS
describe('validateEmailAddress', () => {
  it('accepts valid email', () => {
    const result = validateEmailAddress('test@example.com')
    expect(result).toEqual({ _tag: 'Right', right: 'test@example.com' })
  })

  it('rejects empty string', () => {
    const result = validateEmailAddress('')
    expect(result).toEqual({ _tag: 'Left', left: 'Empty string' })
  })

  it('rejects too short', () => {
    const result = validateEmailAddress('a@b')
    expect(result).toEqual({ _tag: 'Left', left: 'Too short' })
  })

  it('rejects invalid format', () => {
    const result = validateEmailAddress('notanemail')
    expect(result).toEqual({ _tag: 'Left', left: 'Invalid format' })
  })
})
