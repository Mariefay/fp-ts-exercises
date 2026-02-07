import * as IO from 'fp-ts/IO'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

let counter = 0
const incrementCounter = (): IO.IO<number> => () => ++counter

// @ts-ignore
const incrementTwice = (): IO.IO<number> => {
  //TODO: Increment counter twice and return final value
  //HINT: Use pipe with incrementCounter and IO.flatMap
}

// @ts-ignore
const getCounterMessage = (): IO.IO<string> => {
  //TODO: Get counter value and return message
  //HINT: Use pipe with incrementCounter and IO.map
}

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
