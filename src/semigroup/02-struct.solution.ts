import * as S from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { describe, it, expect } from 'vitest'

type Point = {
  x: number
  y: number
}

const PointSemigroup: S.Semigroup<Point> = S.struct({
  x: N.SemigroupSum,
  y: N.SemigroupSum,
})

export const combinePoints = (p1: Point, p2: Point): Point =>
  PointSemigroup.concat(p1, p2)

type Stats = {
  count: number
  total: number
}

const StatsSemigroup: S.Semigroup<Stats> = S.struct({
  count: N.SemigroupSum,
  total: N.SemigroupSum,
})

export const combineStats = (stats: Stats[]): Stats =>
  S.concatAll(StatsSemigroup)({ count: 0, total: 0 })(stats)

//TESTS
describe('Semigroup struct', () => {
  it('combines points by adding coordinates', () => {
    const p1 = { x: 1, y: 2 }
    const p2 = { x: 3, y: 4 }
    const result = combinePoints(p1, p2)
    expect(result).toEqual({ x: 4, y: 6 })
  })

  it('combines multiple stats', () => {
    const stats = [
      { count: 5, total: 100 },
      { count: 3, total: 50 },
      { count: 2, total: 30 },
    ]
    const result = combineStats(stats)
    expect(result).toEqual({ count: 10, total: 180 })
  })

  it('handles single stat', () => {
    const result = combineStats([{ count: 7, total: 42 }])
    expect(result).toEqual({ count: 7, total: 42 })
  })
})
