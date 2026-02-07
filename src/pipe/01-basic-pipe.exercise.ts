import { describe, it, expect } from 'vitest'

const double = (n: number): number => n * 2
const addTen = (n: number): number => n + 10
const square = (n: number): number => n * n

// @ts-ignore
const transform = (n: number): number => {
  //TODO:
  //Use pipe to compose the following operations in order:
  //1. double the number
  //2. add 10
  //3. square the result
  //Import pipe from 'fp-ts/function'
}

//TESTS
describe('transform', () => {
  it('applies transformations in correct order: (5 * 2 + 10)^2 = 400', () => {
    const result = transform(5)
    expect(result).toEqual(400)
  })

  it('applies transformations in correct order: (3 * 2 + 10)^2 = 256', () => {
    const result = transform(3)
    expect(result).toEqual(256)
  })

  it('applies transformations in correct order: (0 * 2 + 10)^2 = 100', () => {
    const result = transform(0)
    expect(result).toEqual(100)
  })
})
