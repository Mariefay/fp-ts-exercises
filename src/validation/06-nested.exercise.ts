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

// @ts-ignore
const validateAddress = (address: Partial<Address>): E.Either<ValidationErrors, Address> => {
  //TODO: Validate all address fields and accumulate errors
  // - street: non-empty
  // - city: non-empty
  // - zipCode: 5 digits
}

// @ts-ignore
const validatePerson = (person: Partial<Person & { address: Partial<Address> }>): E.Either<ValidationErrors, Person> => {
  //TODO: Validate person including nested address validation
  // - name: non-empty
  // - address: use validateAddress
  //HINT: Combine name validation and address validation with applicative
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
