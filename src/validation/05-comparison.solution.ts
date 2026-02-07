import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Apply'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type User = { name: string; age: number }

export const validateUserEither = (name: string, age: number): E.Either<string, User> =>
  pipe(
    E.Do,
    E.bind('name', () =>
      name.length > 0 ? E.right(name) : E.left('Name cannot be empty')
    ),
    E.bind('age', () =>
      age >= 0 ? E.right(age) : E.left('Age must be non-negative')
    ),
    E.map(({ name, age }) => ({ name, age }))
  )

const ArraySemigroup = <T>(): { concat: (x: T[], y: T[]) => T[] } => ({
  concat: (x, y) => [...x, ...y],
})

export const validateUserValidation = (name: string, age: number): E.Either<string[], User> => {
  const applicativeValidation = E.getApplicativeValidation(ArraySemigroup<string>())

  const validateName = (n: string): E.Either<string[], string> =>
    n.length > 0 ? E.right(n) : E.left(['Name cannot be empty'])

  const validateAge = (a: number): E.Either<string[], number> =>
    a >= 0 ? E.right(a) : E.left(['Age must be non-negative'])

  return pipe(
    A.sequenceT(applicativeValidation)(validateName(name), validateAge(age)),
    E.map(([name, age]) => ({ name, age }))
  )
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
