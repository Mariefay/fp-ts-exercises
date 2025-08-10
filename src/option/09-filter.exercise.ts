import { describe, it, expect } from 'vitest'
import * as O from 'fp-ts/Option'

//@ts-ignore
const getValidUserAddress = (address: O.Option<string>): O.Option<string> => {
  //Return O.none if address is O.none and the address string if address is some
  //Use O.filter()
}

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
