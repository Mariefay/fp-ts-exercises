import { flow } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { describe, it, expect } from 'vitest'

type ValidationError = 'Empty string' | 'Too short' | 'Invalid format'

const validateNotEmpty = (s: string): E.Either<ValidationError, string> =>
  s.length > 0 ? E.right(s) : E.left('Empty string')

const validateMinLength = (min: number) => (s: string): E.Either<ValidationError, string> =>
  s.length >= min ? E.right(s) : E.left('Too short')

const validateEmail = (s: string): E.Either<ValidationError, string> =>
  s.includes('@') ? E.right(s) : E.left('Invalid format')

export const validateEmailAddress = flow(
  validateNotEmpty,
  E.chain(validateMinLength(5)),
  E.chain(validateEmail)
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
