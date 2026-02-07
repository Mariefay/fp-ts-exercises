import * as R from 'fp-ts/Record'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const toArray = (record: Record<string, number>): Array<{ key: string; value: number }> =>
  pipe(
    record,
    R.collect((key, value) => ({ key, value }))
  )

export const sumValues = (record: Record<string, number>): number =>
  pipe(
    record,
    R.collect((_, value) => value),
    A.reduce(0, (acc, n) => acc + n)
  )

//TESTS
describe('Record collect operations', () => {
  it('converts record to array', () => {
    const input = { a: 1, b: 2, c: 3 }
    const result = toArray(input)
    expect(result).toEqual([
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
      { key: 'c', value: 3 },
    ])
  })

  it('sums all values', () => {
    const input = { x: 10, y: 20, z: 30 }
    const result = sumValues(input)
    expect(result).toBe(60)
  })

  it('handles empty record', () => {
    const result = sumValues({})
    expect(result).toBe(0)
  })
})
