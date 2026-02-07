import * as IO from 'fp-ts/IO'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

let counter = 0
const incrementCounter = (): IO.IO<number> => () => ++counter

export const incrementTwice = (): IO.IO<number> =>
  pipe(
    incrementCounter(),
    IO.flatMap(() => incrementCounter())
  )

export const getCounterMessage = (): IO.IO<string> =>
  pipe(
    incrementCounter(),
    IO.map((n) => `Counter: ${n}`)
  )

//TESTS
describe('IO chain', () => {
  beforeEach(() => {
    counter = 0
  })

  it('increments twice', () => {
    const result = incrementTwice()()
    expect(result).toBe(2)
  })

  it('creates message from counter', () => {
    const result = getCounterMessage()()
    expect(result).toBe('Counter: 1')
  })
})
