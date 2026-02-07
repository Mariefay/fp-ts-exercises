import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Apply'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type ValidationErrors = string[]

type Address = {
  street: string
  city: string
  zipCode: string
}

type Person = {
  name: string
  address: Address
}

const ArraySemigroup = <T>(): { concat: (x: T[], y: T[]) => T[] } => ({
  concat: (x, y) => [...x, ...y],
})

export const validateAddress = (address: Partial<Address>): E.Either<ValidationErrors, Address> => {
  const applicativeValidation = E.getApplicativeValidation(ArraySemigroup<string>())

  const validateStreet = (street?: string): E.Either<ValidationErrors, string> =>
    street && street.length > 0 ? E.right(street) : E.left(['Street is required'])

  const validateCity = (city?: string): E.Either<ValidationErrors, string> =>
    city && city.length > 0 ? E.right(city) : E.left(['City is required'])

  const validateZipCode = (zipCode?: string): E.Either<ValidationErrors, string> =>
    zipCode && /^\d{5}$/.test(zipCode) ? E.right(zipCode) : E.left(['Zip code must be 5 digits'])

  return pipe(
    A.sequenceT(applicativeValidation)(
      validateStreet(address.street),
      validateCity(address.city),
      validateZipCode(address.zipCode)
    ),
    E.map(([street, city, zipCode]) => ({ street, city, zipCode }))
  )
}

export const validatePerson = (person: Partial<Person & { address: Partial<Address> }>): E.Either<ValidationErrors, Person> => {
  const applicativeValidation = E.getApplicativeValidation(ArraySemigroup<string>())

  const validateName = (name?: string): E.Either<ValidationErrors, string> =>
    name && name.length > 0 ? E.right(name) : E.left(['Name is required'])

  return pipe(
    A.sequenceT(applicativeValidation)(
      validateName(person.name),
      validateAddress(person.address || {})
    ),
    E.map(([name, address]) => ({ name, address }))
  )
}

//TESTS
describe('Nested validation', () => {
  it('validates complete person with address', () => {
    const person = {
      name: 'Alice',
      address: { street: '123 Main St', city: 'Boston', zipCode: '02101' },
    }
    const result = validatePerson(person)
    expect(result._tag).toBe('Right')
  })

  it('accumulates errors from all levels', () => {
    const person = {
      name: '',
      address: { street: '', city: '', zipCode: '123' },
    }
    const result = validatePerson(person)
    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.length).toBeGreaterThan(2) // Errors from both person and address
    }
  })
})
