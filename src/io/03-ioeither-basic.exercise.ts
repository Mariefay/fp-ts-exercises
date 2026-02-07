import * as IOE from 'fp-ts/IOEither'
import * as E from 'fp-ts/Either'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const safeDivide = (a: number, b: number): IOE.IOEither<string, number> => {
  //TODO: Divide a by b, return Left if b is zero
  //HINT: () => b === 0 ? E.left('Division by zero') : E.right(a / b)
}

// @ts-ignore
const alwaysSucceed = (value: string): IOE.IOEither<never, string> => {
  //TODO: Create an IOEither that always succeeds
  //HINT: Use IOE.right
}

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
