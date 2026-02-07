import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Apply'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type ValidationErrors = string[]

type User = {
  name: string
  email: string
  age: number
}

const validateName = (name: string): E.Either<ValidationErrors, string> =>
  name.length >= 2 ? E.right(name) : E.left(['Name too short'])

const validateEmail = (email: string): E.Either<ValidationErrors, string> =>
  email.includes('@') ? E.right(email) : E.left(['Invalid email'])

const validateAge = (age: number): E.Either<ValidationErrors, number> =>
  age >= 18 ? E.right(age) : E.left(['Must be 18 or older'])

const ArraySemigroup = <T>(): { concat: (x: T[], y: T[]) => T[] } => ({
  concat: (x, y) => [...x, ...y],
})

export const validateUser = (name: string, email: string, age: number): E.Either<ValidationErrors, User> => {
  const applicativeValidation = E.getApplicativeValidation(ArraySemigroup<string>())

  return pipe(
    A.sequenceT(applicativeValidation)(
      validateName(name),
      validateEmail(email),
      validateAge(age)
    ),
    E.map(([validName, validEmail, validAge]) => ({
      name: validName,
      email: validEmail,
      age: validAge,
    }))
  )
}

//TESTS
describe('Applicative validation', () => {
  it('validates correct user', () => {
    const result = validateUser('Alice', 'alice@example.com', 25)
    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right).toEqual({ name: 'Alice', email: 'alice@example.com', age: 25 })
    }
  })

  it('accumulates all validation errors', () => {
    const result = validateUser('A', 'invalid', 16)
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.length).toBe(3) // All three validations failed
      expect(result.left).toContain('Name too short')
      expect(result.left).toContain('Invalid email')
      expect(result.left).toContain('Must be 18 or older')
    }
  })

  it('accumulates partial errors', () => {
    const result = validateUser('Alice', 'invalid', 25)
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.length).toBe(1)
    }
  })
})
