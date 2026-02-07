import * as Th from 'fp-ts/These'
import * as S from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import * as N from 'fp-ts/number'
import { describe, it, expect } from 'vitest'

const TheseSemigroup = Th.getSemigroup(Str.Semigroup, N.SemigroupSum)

export const combineThese = (
  th1: Th.These<string, number>,
  th2: Th.These<string, number>
): Th.These<string, number> =>
  TheseSemigroup.concat(th1, th2)

//TESTS
describe('These Semigroup', () => {
  it('combines two rights', () => {
    const result = combineThese(Th.right(10), Th.right(20))
    expect(result).toEqual(Th.right(30))
  })

  it('combines two lefts', () => {
    const result = combineThese(Th.left('error1'), Th.left('error2'))
    expect(result).toEqual(Th.left('error1error2'))
  })

  it('combines left and right', () => {
    const result = combineThese(Th.left('error'), Th.right(42))
    expect(result).toEqual(Th.both('error', 42))
  })

  it('combines two boths', () => {
    const result = combineThese(Th.both('warn1', 10), Th.both('warn2', 20))
    expect(result).toEqual(Th.both('warn1warn2', 30))
  })

  it('accumulates warnings', () => {
    const result = combineThese(
      Th.both('warning1, ', 10),
      combineThese(Th.both('warning2, ', 20), Th.right(30))
    )
    expect(result).toEqual(Th.both('warning1, warning2, ', 60))
  })
})
