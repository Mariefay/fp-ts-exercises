import * as R from 'fp-ts/Record'
import { describe, it, expect } from 'vitest'

export const getKeys = (record: Record<string, any>): string[] =>
  R.keys(record)

export const hasKey = (record: Record<string, any>, key: string): boolean =>
  R.has(key, record)

export const isEmpty = (record: Record<string, any>): boolean =>
  R.isEmpty(record)

//TESTS
describe('Record keys and values operations', () => {
  it('gets all keys', () => {
    const record = { a: 1, b: 2, c: 3 }
    const result = getKeys(record)
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('checks if key exists', () => {
    const record = { name: 'Alice', age: 25 }
    expect(hasKey(record, 'name')).toBe(true)
    expect(hasKey(record, 'city')).toBe(false)
  })

  it('checks if record is empty', () => {
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({ a: 1 })).toBe(false)
  })
})
