import * as Th from 'fp-ts/These'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const doubleValue = (these: Th.These<string, number>): Th.These<string, number> => {
  //TODO: Double the right value if it exists
  //HINT: Use Th.map
}

// @ts-ignore
const transformBoth = (these: Th.These<string, number>): Th.These<string, string> => {
  //TODO: Transform both left and right values
  //HINT: Use pipe with Th.mapLeft and Th.map
}

//TESTS
describe('These map', () => {
  it('maps right value', () => {
    const result = doubleValue(Th.right(21))
    expect(result).toEqual(Th.right(42))
  })

  it('maps both value', () => {
    const result = doubleValue(Th.both('warning', 21))
    expect(result).toEqual(Th.both('warning', 42))
  })

  it('leaves left unchanged', () => {
    const result = doubleValue(Th.left('error'))
    expect(result).toEqual(Th.left('error'))
  })

  it('transforms both sides', () => {
    const result = transformBoth(Th.both('warning', 42))
    const expected = Th.both('WARNING: warning', 'Value: 42')
    expect(result).toEqual(expected)
  })
})
