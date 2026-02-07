import * as Th from 'fp-ts/These'
import * as A from 'fp-ts/Array'
import * as S from 'fp-ts/Semigroup'
import { describe, it, expect } from 'vitest'

type ValidationResult<A> = Th.These<string[], A>

export const validateAge = (age: number): ValidationResult<number> => {
  if (age < 0) {
    return Th.left(['Age must be positive'])
  }
  if (age < 18) {
    return Th.both(['Age is below 18'], age)
  }
  if (age > 100) {
    return Th.both(['Age seems unusually high'], age)
  }
  return Th.right(age)
}

export const validateEmail = (email: string): ValidationResult<string> => {
  if (!email.includes('@')) {
    return Th.left(['Email must contain @'])
  }
  if (email.length < 6) {
    return Th.both(['Email seems too short'], email)
  }
  return Th.right(email)
}

const ArraySemigroup = <T>(): S.Semigroup<T[]> => ({
  concat: (x, y) => [...x, ...y],
})

export const combineValidations = <A, B>(
  v1: ValidationResult<A>,
  v2: ValidationResult<B>
): ValidationResult<[A, B]> => {
  const theseSemigroup = Th.getSemigroup(
    ArraySemigroup<string>(),
    S.struct<[A, B]>({
      0: S.first<A>(),
      1: S.first<B>(),
    })
  )

  return Th.fold(
    (e1) =>
      Th.fold(
        (e2) => Th.left([...e1, ...e2]),
        (a2) => Th.left(e1),
        (e2, a2) => Th.left([...e1, ...e2])
      )(v2),
    (a1) =>
      Th.fold(
        (e2) => Th.left(e2),
        (a2) => Th.right<string[], [A, B]>([a1, a2]),
        (e2, a2) => Th.both(e2, [a1, a2])
      )(v2),
    (e1, a1) =>
      Th.fold(
        (e2) => Th.left([...e1, ...e2]),
        (a2) => Th.both(e1, [a1, a2]),
        (e2, a2) => Th.both([...e1, ...e2], [a1, a2])
      )(v2)
  )(v1)
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
