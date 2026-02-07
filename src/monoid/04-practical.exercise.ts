import * as M from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'
import * as B from 'fp-ts/boolean'
import { describe, it, expect } from 'vitest'

type PageMetrics = {
  views: number
  likes: number
  shares: number
  comments: number
}

// @ts-ignore
const aggregateMetrics = (metrics: PageMetrics[]): PageMetrics => {
  //TODO: Aggregate all metrics by summing each field
  //HINT: Use M.struct with N.MonoidSum for all fields
}

type FeatureFlags = {
  darkMode: boolean
  notifications: boolean
  analytics: boolean
}

// @ts-ignore
const combineFeatureFlags = (flags: FeatureFlags[]): FeatureFlags => {
  //TODO: Combine feature flags where ANY true enables the feature
  //HINT: Use M.struct with B.MonoidAny (logical OR)
}

//TESTS
describe('Monoid practical examples', () => {
  it('aggregates page metrics', () => {
    const metrics = [
      { views: 100, likes: 10, shares: 5, comments: 3 },
      { views: 200, likes: 20, shares: 8, comments: 7 },
      { views: 150, likes: 15, shares: 3, comments: 5 },
    ]
    const result = aggregateMetrics(metrics)
    expect(result).toEqual({
      views: 450,
      likes: 45,
      shares: 16,
      comments: 15,
    })
  })

  it('handles empty metrics', () => {
    const result = aggregateMetrics([])
    expect(result).toEqual({ views: 0, likes: 0, shares: 0, comments: 0 })
  })

  it('combines feature flags with OR logic', () => {
    const flags = [
      { darkMode: false, notifications: true, analytics: false },
      { darkMode: true, notifications: false, analytics: false },
      { darkMode: false, notifications: false, analytics: true },
    ]
    const result = combineFeatureFlags(flags)
    expect(result).toEqual({
      darkMode: true, // At least one true
      notifications: true,
      analytics: true,
    })
  })

  it('handles all false flags', () => {
    const flags = [
      { darkMode: false, notifications: false, analytics: false },
      { darkMode: false, notifications: false, analytics: false },
    ]
    const result = combineFeatureFlags(flags)
    expect(result).toEqual({ darkMode: false, notifications: false, analytics: false })
  })
})
