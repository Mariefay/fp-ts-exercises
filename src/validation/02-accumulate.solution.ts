import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type ValidationError = string[]

export const validateName = (name: string): E.Either<ValidationError, string> => {
  const errors: string[] = []
  if (name.length === 0) errors.push('Name cannot be empty')
  if (name.length < 2) errors.push('Name must be at least 2 characters')
  if (name.length > 50) errors.push('Name must be at most 50 characters')

  return errors.length > 0 ? E.left(errors) : E.right(name)
}

export const validatePassword = (password: string): E.Either<ValidationError, string> => {
  const errors: string[] = []
  if (password.length < 8) errors.push('Password must be at least 8 characters')
  if (!/[A-Z]/.test(password)) errors.push('Password must contain uppercase letter')
  if (!/[0-9]/.test(password)) errors.push('Password must contain a number')

  return errors.length > 0 ? E.left(errors) : E.right(password)
}

//TESTS
describe('Accumulating validation errors', () => {
  it('validates correct name', () => {
    const result = validateName('Alice')
    expect(result._tag).toBe('Right')
  })

  it('accumulates name errors', () => {
    const result = validateName('A')
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.length).toBeGreaterThan(0)
    }
  })

  it('validates correct password', () => {
    const result = validatePassword('SecurePass123')
    expect(result._tag).toBe('Right')
  })

  it('accumulates password errors', () => {
    const result = validatePassword('weak')
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.length).toBeGreaterThan(1) // Multiple errors
    }
  })
})
