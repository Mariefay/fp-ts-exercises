import * as O from 'fp-ts/Option'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const getValidNumbers = (numbers: Array<O.Option<number>>): number[] => {
  //TODO: Use Array.compact to remove all None values and extract Some values
  //HINT: compact removes None and unwraps Some values
}

// @ts-ignore
const safeDivide = (numbers: number[]): number[] => {
  //TODO: Divide 100 by each number, but safely handle division by zero
  //HINT: First map to Option (Some for valid, None for zero), then compact
}

//TESTS
describe('Array compact operations', () => {
  it('removes None values and extracts Some values', () => {
    const numbers = [O.some(1), O.none, O.some(2), O.none, O.some(3)]
    const result = getValidNumbers(numbers)
    expect(result).toEqual([1, 2, 3])
  })

  it('returns empty array when all None', () => {
    const numbers = [O.none, O.none, O.none]
    const result = getValidNumbers(numbers)
    expect(result).toEqual([])
  })

  it('safely divides numbers, skipping zeros', () => {
    const result = safeDivide([2, 0, 5, 0, 10])
    expect(result).toEqual([50, 20, 10])
  })
})
