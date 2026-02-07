import * as E from 'fp-ts/Either'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const validateAge = (age: number): E.Either<string, number> => {
  //TODO: Validate that age is between 0 and 120
  //HINT: Return E.left with error message or E.right with age
}

// @ts-ignore
const validateEmail = (email: string): E.Either<string, string> => {
  //TODO: Validate that email contains @ symbol
  //HINT: Return E.left with error or E.right with email
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
