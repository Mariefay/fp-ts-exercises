import * as Th from 'fp-ts/These'
import { describe, it, expect } from 'vitest'

export const toString = (these: Th.These<string, number>): string =>
  Th.fold(
    (error) => `Error: ${error}`,
    (value) => `Value: ${value}`,
    (warning, value) => `Warning: ${warning}, Value: ${value}`
  )(these)

export const getValue = (these: Th.These<string, number>, defaultValue: number): number =>
  Th.fold(
    () => defaultValue,
    (value) => value,
    (_warning, value) => value
  )(these)

//TESTS
describe('These fold', () => {
  it('folds left', () => {
    const result = toString(Th.left('error'))
    expect(result).toBe('Error: error')
  })

  it('folds right', () => {
    const result = toString(Th.right(42))
    expect(result).toBe('Value: 42')
  })

  it('folds both', () => {
    const result = toString(Th.both('warning', 42))
    expect(result).toBe('Warning: warning, Value: 42')
  })

  it('gets value from right', () => {
    const result = getValue(Th.right(42), 0)
    expect(result).toBe(42)
  })

  it('gets default from left', () => {
    const result = getValue(Th.left('error'), 0)
    expect(result).toBe(0)
  })

  it('gets value from both', () => {
    const result = getValue(Th.both('warning', 42), 0)
    expect(result).toBe(42)
  })
})
