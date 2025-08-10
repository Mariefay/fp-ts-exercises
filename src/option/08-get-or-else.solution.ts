import { describe, it, expect } from 'vitest'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

const getAddressString = (addressOption: O.Option<string>): string => {
  return pipe(
    addressOption,
    O.getOrElse(() => 'No address provided')
  )
}

describe('getAddressString', () => {
  const addressOption1: O.Option<string> = O.none
  const addressOption2: O.Option<string> = O.some('123 Main St')

  it('returns default string when address option is O.none', () => {
    const result = getAddressString(addressOption1)
    expect(result).toEqual('No address provided')
  })

  it('returns the address string in the correct format when address option is some', () => {
    const result = getAddressString(addressOption2)
    expect(result).toEqual('123 Main St')
  })
})
