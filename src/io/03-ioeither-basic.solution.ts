import * as IOE from 'fp-ts/IOEither'
import * as E from 'fp-ts/Either'
import { describe, it, expect } from 'vitest'

export const safeDivide = (a: number, b: number): IOE.IOEither<string, number> =>
  () => (b === 0 ? E.left('Division by zero') : E.right(a / b))

export const alwaysSucceed = (value: string): IOE.IOEither<never, string> =>
  IOE.right(value)

//TESTS
describe('IOEither basic', () => {
  it('divides safely', () => {
    const result = safeDivide(10, 2)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toBe(5)
    }
  })

  it('fails on division by zero', () => {
    const result = safeDivide(10, 0)()
    expect(E.isLeft(result)).toBe(true)
    if (E.isLeft(result)) {
      expect(result.left).toBe('Division by zero')
    }
  })

  it('always succeeds', () => {
    const result = alwaysSucceed('test')()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toBe('test')
    }
  })
})
