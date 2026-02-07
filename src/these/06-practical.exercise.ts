import * as Th from 'fp-ts/These'
import * as A from 'fp-ts/Array'
import { describe, it, expect } from 'vitest'

type ValidationResult<A> = Th.These<string[], A>

// @ts-ignore
const validateAge = (age: number): ValidationResult<number> => {
  //TODO: Validate age is positive, return warnings for edge cases
  //HINT: <18 or >100 -> Both with warning, <0 -> Left, else Right
}

// @ts-ignore
const validateEmail = (email: string): ValidationResult<string> => {
  //TODO: Validate email format, return warnings if suspicious
  //HINT: Check for @ symbol, warn if too short
}

// @ts-ignore
const combineValidations = <A, B>(
  v1: ValidationResult<A>,
  v2: ValidationResult<B>
): ValidationResult<[A, B]> => {
  //TODO: Combine two validation results, accumulating warnings
  //HINT: Use Th.getSemigroup with array concat and tuple creation
}

//TESTS
describe('These practical validation', () => {
  it('validates valid age', () => {
    const result = validateAge(25)
    expect(result).toEqual(Th.right(25))
  })

  it('warns for young age', () => {
    const result = validateAge(15)
    expect(Th.isBoth(result)).toBe(true)
  })

  it('fails for negative age', () => {
    const result = validateAge(-5)
    expect(Th.isLeft(result)).toBe(true)
  })

  it('validates valid email', () => {
    const result = validateEmail('user@example.com')
    expect(result).toEqual(Th.right('user@example.com'))
  })

  it('fails for invalid email', () => {
    const result = validateEmail('invalid')
    expect(Th.isLeft(result)).toBe(true)
  })

  it('warns for short email', () => {
    const result = validateEmail('a@b.c')
    expect(Th.isBoth(result)).toBe(true)
  })

  it('combines successful validations', () => {
    const v1 = validateAge(25)
    const v2 = validateEmail('user@example.com')
    const result = combineValidations(v1, v2)
    expect(result).toEqual(Th.right([25, 'user@example.com']))
  })

  it('accumulates warnings', () => {
    const v1 = validateAge(15)
    const v2 = validateEmail('a@b.c')
    const result = combineValidations(v1, v2)
    expect(Th.isBoth(result)).toBe(true)
    if (Th.isBoth(result)) {
      expect(result.left.length).toBeGreaterThan(1)
    }
  })
})
