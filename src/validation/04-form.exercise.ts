import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Apply'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type ValidationErrors = string[]

type RegistrationForm = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

type ValidatedForm = {
  username: string
  email: string
  password: string
}

// @ts-ignore
const validateForm = (form: RegistrationForm): E.Either<ValidationErrors, ValidatedForm> => {
  //TODO: Validate the entire form and accumulate all errors:
  // - username: min 3 chars, max 20 chars, alphanumeric only
  // - email: contains @ and .
  // - password: min 8 chars, has uppercase, has lowercase, has number
  // - confirmPassword: matches password
  //HINT: Create individual validators, then combine with applicative
}

//TESTS
describe('Form validation', () => {
  it('validates correct form', () => {
    const form = {
      username: 'alice123',
      email: 'alice@example.com',
      password: 'SecurePass123',
      confirmPassword: 'SecurePass123',
    }
    const result = validateForm(form)
    expect(result._tag).toBe('Right')
  })

  it('accumulates all form errors', () => {
    const form = {
      username: 'a!',
      email: 'invalid',
      password: 'weak',
      confirmPassword: 'different',
    }
    const result = validateForm(form)
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.length).toBeGreaterThan(3)
    }
  })

  it('detects password mismatch', () => {
    const form = {
      username: 'alice',
      email: 'alice@example.com',
      password: 'SecurePass123',
      confirmPassword: 'DifferentPass123',
    }
    const result = validateForm(form)
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left).toContain('Passwords do not match')
    }
  })
})
