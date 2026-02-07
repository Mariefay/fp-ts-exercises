import { flow } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

const double = (n: number): number => n * 2
const addTen = (n: number): number => n + 10
const toString = (n: number): string => `Result: ${n}`

export const processNumber = flow(
  double,
  addTen,
  toString
)

//TESTS
describe('processNumber', () => {
  it('creates reusable function: (5 * 2) + 10 = "Result: 20"', () => {
    const result = processNumber(5)
    expect(result).toEqual('Result: 20')
  })

  it('creates reusable function: (3 * 2) + 10 = "Result: 16"', () => {
    const result = processNumber(3)
    expect(result).toEqual('Result: 16')
  })

  it('can be called multiple times', () => {
    expect(processNumber(0)).toEqual('Result: 10')
    expect(processNumber(10)).toEqual('Result: 30')
  })
})
