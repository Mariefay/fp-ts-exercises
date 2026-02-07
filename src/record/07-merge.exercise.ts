import { describe, it, expect } from 'vitest'

// @ts-ignore
const mergeConfigs = (defaults: Record<string, any>, overrides: Record<string, any>): Record<string, any> => {
  //TODO: Use Record union to merge two configs (overrides take precedence)
  //HINT: Second argument to union wins on conflicts
}

// @ts-ignore
const combineScores = (scores1: Record<string, number>, scores2: Record<string, number>): Record<string, number> => {
  //TODO: Merge two score records, summing values for duplicate keys
  //HINT: Use Record.union with a Semigroup that adds numbers
}

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
