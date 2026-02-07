import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Apply'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type User = { name: string; age: number }

// Fail-fast behavior (Either with chain)
// @ts-ignore
const validateUserEither = (name: string, age: number): E.Either<string, User> => {
  //TODO: Validate using Either chaining (fail on first error)
  //HINT: Use pipe with E.fromPredicate and E.flatMap
}

// Accumulate errors (Validation)
// @ts-ignore
const validateUserValidation = (name: string, age: number): E.Either<string[], User> => {
  //TODO: Validate using applicative validation (collect all errors)
  //HINT: Use sequenceT with getApplicativeValidation
}

//TESTS
describe('Either vs Validation comparison', () => {
  it('Either fails fast', () => {
    const result = validateUserEither('', -5)
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      // Only gets first error
      expect(typeof result.left).toBe('string')
    }
  })

  it('Validation accumulates errors', () => {
    const result = validateUserValidation('', -5)
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      // Gets both errors
      expect(result.left.length).toBe(2)
    }
  })

  it('Both succeed with valid input', () => {
    const result1 = validateUserEither('Alice', 25)
    const result2 = validateUserValidation('Alice', 25)
    expect(result1._tag).toBe('Right')
    expect(result2._tag).toBe('Right')
  })
})
