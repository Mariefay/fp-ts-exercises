import { describe, it, expect } from 'vitest'

// @ts-ignore
const getKeys = (record: Record<string, any>): string[] => {
  //TODO: Use Record.keys to get all keys as an array
}

// @ts-ignore
const hasKey = (record: Record<string, any>, key: string): boolean => {
  //TODO: Use Record.has to check if a key exists
}

// @ts-ignore
const isEmpty = (record: Record<string, any>): boolean => {
  //TODO: Use Record.isEmpty to check if record has no keys
}

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
