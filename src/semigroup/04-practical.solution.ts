import * as S from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { describe, it, expect } from 'vitest'

type UserPreferences = {
  theme: string
  fontSize: number
  notifications: boolean
}

const UserPreferencesSemigroup: S.Semigroup<UserPreferences> = S.struct({
  theme: S.last<string>(),
  fontSize: N.SemigroupSum,
  notifications: S.last<boolean>(),
})

export const mergePreferences = (prefs: UserPreferences[]): UserPreferences =>
  S.concatAll(UserPreferencesSemigroup)({
    theme: 'light',
    fontSize: 0,
    notifications: false,
  })(prefs)

type Analytics = {
  pageViews: number
  uniqueVisitors: number
  avgTimeOnSite: number
}

type AnalyticsWithCount = Analytics & { count: number }

const AnalyticsWithCountSemigroup: S.Semigroup<AnalyticsWithCount> = S.struct({
  pageViews: N.SemigroupSum,
  uniqueVisitors: N.SemigroupSum,
  avgTimeOnSite: N.SemigroupSum,
  count: N.SemigroupSum,
})

export const combineAnalytics = (analytics: Analytics[]): Analytics => {
  const withCount = analytics.map((a) => ({ ...a, count: 1 }))
  const combined = S.concatAll(AnalyticsWithCountSemigroup)({
    pageViews: 0,
    uniqueVisitors: 0,
    avgTimeOnSite: 0,
    count: 0,
  })(withCount)

  return {
    pageViews: combined.pageViews,
    uniqueVisitors: combined.uniqueVisitors,
    avgTimeOnSite: Math.round(combined.avgTimeOnSite / combined.count),
  }
}

//TESTS
describe('Semigroup practical examples', () => {
  it('merges user preferences with last value winning', () => {
    const prefs = [
      { theme: 'light', fontSize: 14, notifications: false },
      { theme: 'dark', fontSize: 2, notifications: true },
      { theme: 'light', fontSize: 0, notifications: false },
    ]
    const result = mergePreferences(prefs)
    expect(result).toEqual({ theme: 'light', fontSize: 16, notifications: false })
  })

  it('combines analytics data', () => {
    const analytics = [
      { pageViews: 100, uniqueVisitors: 50, avgTimeOnSite: 60 },
      { pageViews: 150, uniqueVisitors: 75, avgTimeOnSite: 90 },
      { pageViews: 200, uniqueVisitors: 100, avgTimeOnSite: 120 },
    ]
    const result = combineAnalytics(analytics)
    expect(result).toEqual({
      pageViews: 450,
      uniqueVisitors: 225,
      avgTimeOnSite: 90, // (60 + 90 + 120) / 3
    })
  })
})
