import * as S from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { describe, it, expect } from 'vitest'

type UserPreferences = {
  theme: string
  fontSize: number
  notifications: boolean
}

// @ts-ignore
const mergePreferences = (prefs: UserPreferences[]): UserPreferences => {
  //TODO: Merge user preferences where later values override earlier ones
  //HINT: Use S.struct with S.last for theme/notifications, N.SemigroupSum for fontSize
}

type Analytics = {
  pageViews: number
  uniqueVisitors: number
  avgTimeOnSite: number
}

// @ts-ignore
const combineAnalytics = (analytics: Analytics[]): Analytics => {
  //TODO: Combine analytics by:
  // - Sum pageViews and uniqueVisitors
  // - Average avgTimeOnSite
  //HINT: For average, you'll need a custom semigroup that tracks count
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
