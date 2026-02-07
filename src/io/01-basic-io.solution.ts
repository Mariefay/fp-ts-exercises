import * as IO from 'fp-ts/IO'
import { describe, it, expect } from 'vitest'

export const getCurrentTime = (): IO.IO<number> =>
  () => Date.now()

export const getRandomNumber = (): IO.IO<number> =>
  () => Math.random()

//TESTS
describe('IO basic', () => {
  it('gets current time', () => {
    const io = getCurrentTime()
    const time1 = io()
    const time2 = io()
    expect(typeof time1).toBe('number')
    expect(time2).toBeGreaterThanOrEqual(time1)
  })

  it('gets random number', () => {
    const io = getRandomNumber()
    const num = io()
    expect(typeof num).toBe('number')
    expect(num).toBeGreaterThanOrEqual(0)
    expect(num).toBeLessThan(1)
  })
})
