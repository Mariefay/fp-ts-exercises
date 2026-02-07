import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type ValidationError = string[]

// @ts-ignore
const validateName = (name: string): E.Either<ValidationError, string> => {
  //TODO: Validate name (non-empty, min 2 chars, max 50 chars)
  //HINT: Collect all errors in an array, return Left with errors or Right with name
}

// @ts-ignore
const validatePassword = (password: string): E.Either<ValidationError, string> => {
  //TODO: Validate password (min 8 chars, has uppercase, has number)
  //HINT: Collect all validation errors
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
