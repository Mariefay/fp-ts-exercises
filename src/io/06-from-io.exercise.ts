import * as IO from 'fp-ts/IO'
import * as IOE from 'fp-ts/IOEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

const getRandomNumber = (): IO.IO<number> =>
  () => Math.random()

// @ts-ignore
const getRandomInRange = (min: number, max: number): IOE.IOEither<string, number> => {
  //TODO: Convert IO to IOEither, validate range, and scale random number
  //HINT: Use IOE.fromIO, then validate and transform
}

//TESTS
describe('IOEither from IO', () => {
  it('generates random number in range', () => {
    const result = getRandomInRange(0, 100)()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toBeGreaterThanOrEqual(0)
      expect(result.right).toBeLessThanOrEqual(100)
    }
  })

  it('fails on invalid range', () => {
    const result = getRandomInRange(10, 5)()
    expect(E.isLeft(result)).toBe(true)
  })
})
