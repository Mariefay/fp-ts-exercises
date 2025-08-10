import { describe, it, expect } from 'vitest'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

const getValidUserAddress = (address: O.Option<string>): O.Option<string> =>
  pipe(
    address,
    O.filter(address => address.length >= 5)
  )

describe('getValidUserAddress', () => {
  it('returns O.none if user has no address', () => {
    const result = getValidUserAddress(O.none)
    expect(result).toEqual(O.none)
  })

  it('returns O.none if user has an address that is too short', () => {
    const result = getValidUserAddress(O.of('456'))
    expect(result).toEqual(O.none)
  })

  it('returns the valid address if user has an address that is long enough', () => {
    const result = getValidUserAddress(O.of('123 Main St'))
    expect(result).toEqual(O.some('123 Main St'))
  })
})
