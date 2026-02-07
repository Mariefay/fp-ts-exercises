import * as R from 'fp-ts/Record'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

export const incrementKey = (record: Record<string, number>, key: string): Record<string, number> =>
  pipe(
    record,
    R.modifyAt(key, (n) => n + 1),
    O.getOrElse(() => record)
  )

export const updateAt = (record: Record<string, string>, key: string, newValue: string): Record<string, string> =>
  pipe(
    record,
    R.updateAt(key, newValue),
    O.getOrElse(() => record)
  )

//TESTS
describe('Record modify operations', () => {
  it('modifies existing key', () => {
    const record = { a: 10, b: 20, c: 30 }
    const result = incrementKey(record, 'b')
    expect(result).toEqual({ a: 10, b: 21, c: 30 })
  })

  it('handles missing key', () => {
    const record = { a: 10 }
    const result = incrementKey(record, 'z')
    expect(result).toEqual({ a: 10 })
  })

  it('updates value at key', () => {
    const record = { name: 'Alice', city: 'Paris' }
    const result = updateAt(record, 'city', 'London')
    expect(result).toEqual({ name: 'Alice', city: 'London' })
  })
})
