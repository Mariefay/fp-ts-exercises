import * as Th from 'fp-ts/These'
import * as O from 'fp-ts/Option'
import { describe, it, expect } from 'vitest'

export const fromOptions = <E, A>(left: O.Option<E>, right: O.Option<A>): O.Option<Th.These<E, A>> => {
  if (O.isSome(left) && O.isSome(right)) {
    return O.some(Th.both(left.value, right.value))
  }
  if (O.isSome(left)) {
    return O.some(Th.left(left.value))
  }
  if (O.isSome(right)) {
    return O.some(Th.right(right.value))
  }
  return O.none
}

//TESTS
describe('These from Options', () => {
  it('creates left from Some/None', () => {
    const result = fromOptions(O.some('error'), O.none)
    expect(result).toEqual(O.some(Th.left('error')))
  })

  it('creates right from None/Some', () => {
    const result = fromOptions(O.none, O.some(42))
    expect(result).toEqual(O.some(Th.right(42)))
  })

  it('creates both from Some/Some', () => {
    const result = fromOptions(O.some('warning'), O.some(42))
    expect(result).toEqual(O.some(Th.both('warning', 42)))
  })

  it('returns None from None/None', () => {
    const result = fromOptions(O.none, O.none)
    expect(result).toEqual(O.none)
  })
})
