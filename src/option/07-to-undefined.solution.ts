import { describe, it, expect } from 'vitest'
import * as O from 'fp-ts/Option'

const getAddress = (addressOption: O.Option<string>): string | undefined => {
  return O.toUndefined(addressOption)
}

describe('getAddress', () => {
  const addressOption1: O.Option<string> = O.none
  const addressOption2: O.Option<string> = O.some('123 Main St')

  it('returns undefined if address option is O.none', () => {
    const result = getAddress(addressOption1)
    expect(result).toBeUndefined()
  })

  it('returns the address string in the correct format if address option is some', () => {
    const result = getAddress(addressOption2)
    expect(result).toEqual('123 Main St')
  })
})
