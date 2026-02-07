import * as O from 'fp-ts/Option'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const getValue = (record: Record<string, number>, key: string): O.Option<number> => {
  //TODO: Use Record.lookup to safely get a value by key
  //HINT: Returns Option because key might not exist
}

// @ts-ignore
const getValueWithDefault = (record: Record<string, number>, key: string, defaultValue: number): number => {
  //TODO: Lookup the key and return the value, or defaultValue if not found
  //HINT: Use pipe with O.getOrElse
}

//TESTS
describe('Record lookup operations', () => {
  it('looks up existing key', () => {
    const record = { a: 10, b: 20, c: 30 }
    const result = getValue(record, 'b')
    expect(O.isSome(result)).toBe(true)
    expect(result).toEqual(O.some(20))
  })

  it('returns None for missing key', () => {
    const record = { a: 10 }
    const result = getValue(record, 'z')
    expect(O.isNone(result)).toBe(true)
  })

  it('gets value with default', () => {
    const record = { a: 10, b: 20 }
    expect(getValueWithDefault(record, 'a', 0)).toBe(10)
    expect(getValueWithDefault(record, 'z', 999)).toBe(999)
  })
})
