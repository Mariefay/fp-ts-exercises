import * as E from 'fp-ts/Either'
import { describe, it, expect } from 'vitest'

export const validateAge = (age: number): E.Either<string, number> => {
  if (age < 0 || age > 120) {
    return E.left('Age must be between 0 and 120')
  }
  return E.right(age)
}

export const validateEmail = (email: string): E.Either<string, string> => {
  if (!email.includes('@')) {
    return E.left('Email must contain @')
  }
  return E.right(email)
}

//TESTS
describe('Validation basics', () => {
  it('validates age successfully', () => {
    const result = validateAge(25)
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right).toBe(25)
    }
  })

  it('rejects invalid age', () => {
    expect(validateAge(-5)._tag).toBe('Left')
    expect(validateAge(150)._tag).toBe('Left')
  })

  it('validates email successfully', () => {
    const result = validateEmail('user@example.com')
    expect(result._tag).toBe('Right')
  })

  it('rejects invalid email', () => {
    const result = validateEmail('invalid-email')
    expect(result._tag).toBe('Left')
  })
})
