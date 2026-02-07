import { describe, it, expect } from 'vitest'

// @ts-ignore
const incrementKey = (record: Record<string, number>, key: string): Record<string, number> => {
  //TODO: Use Record.modifyAt to increment the value at the given key
  //HINT: Returns Option<Record> because key might not exist
}

// @ts-ignore
const updateAt = (record: Record<string, string>, key: string, newValue: string): Record<string, string> => {
  //TODO: Use Record.updateAt to set a new value at the key
  //HINT: Similar to modifyAt but replaces with a fixed value
}

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
