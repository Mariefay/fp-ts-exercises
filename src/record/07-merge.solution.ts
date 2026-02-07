import * as R from 'fp-ts/Record'
import * as N from 'fp-ts/number'
import { describe, it, expect } from 'vitest'

export const mergeConfigs = (defaults: Record<string, any>, overrides: Record<string, any>): Record<string, any> => ({
  ...defaults,
  ...overrides,
})

export const combineScores = (scores1: Record<string, number>, scores2: Record<string, number>): Record<string, number> =>
  R.union(N.SemigroupSum)(scores2)(scores1)

//TESTS
describe('Record merge operations', () => {
  it('merges configs with overrides', () => {
    const defaults = { theme: 'light', fontSize: 14, debug: false }
    const overrides = { theme: 'dark', debug: true }
    const result = mergeConfigs(defaults, overrides)
    expect(result).toEqual({ theme: 'dark', fontSize: 14, debug: true })
  })

  it('combines scores by summing', () => {
    const scores1 = { alice: 10, bob: 20 }
    const scores2 = { bob: 15, charlie: 25 }
    const result = combineScores(scores1, scores2)
    expect(result).toEqual({ alice: 10, bob: 35, charlie: 25 })
  })
})
