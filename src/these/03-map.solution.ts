import * as Th from 'fp-ts/These'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const doubleValue = (these: Th.These<string, number>): Th.These<string, number> =>
  pipe(these, Th.map((n) => n * 2))

export const transformBoth = (these: Th.These<string, number>): Th.These<string, string> =>
  pipe(
    these,
    Th.mapLeft((e) => `WARNING: ${e}`),
    Th.map((n) => `Value: ${n}`)
  )

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
