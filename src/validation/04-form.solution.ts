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

const ArraySemigroup = <T>(): { concat: (x: T[], y: T[]) => T[] } => ({
  concat: (x, y) => [...x, ...y],
})

const validateUsername = (username: string): E.Either<ValidationErrors, string> => {
  const errors: string[] = []
  if (username.length < 3) errors.push('Username must be at least 3 characters')
  if (username.length > 20) errors.push('Username must be at most 20 characters')
  if (!/^[a-zA-Z0-9]+$/.test(username)) errors.push('Username must be alphanumeric')
  return errors.length > 0 ? E.left(errors) : E.right(username)
}

const validateEmail = (email: string): E.Either<ValidationErrors, string> => {
  const errors: string[] = []
  if (!email.includes('@')) errors.push('Email must contain @')
  if (!email.includes('.')) errors.push('Email must contain .')
  return errors.length > 0 ? E.left(errors) : E.right(email)
}

const validatePassword = (password: string, confirmPassword: string): E.Either<ValidationErrors, string> => {
  const errors: string[] = []
  if (password.length < 8) errors.push('Password must be at least 8 characters')
  if (!/[A-Z]/.test(password)) errors.push('Password must contain uppercase letter')
  if (!/[a-z]/.test(password)) errors.push('Password must contain lowercase letter')
  if (!/[0-9]/.test(password)) errors.push('Password must contain a number')
  if (password !== confirmPassword) errors.push('Passwords do not match')
  return errors.length > 0 ? E.left(errors) : E.right(password)
}

export const validateForm = (form: RegistrationForm): E.Either<ValidationErrors, ValidatedForm> => {
  const applicativeValidation = E.getApplicativeValidation(ArraySemigroup<string>())

  return pipe(
    A.sequenceT(applicativeValidation)(
      validateUsername(form.username),
      validateEmail(form.email),
      validatePassword(form.password, form.confirmPassword)
    ),
    E.map(([username, email, password]) => ({ username, email, password }))
  )
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
