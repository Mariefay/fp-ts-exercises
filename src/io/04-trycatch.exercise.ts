import * as IOE from 'fp-ts/IOEither'
import * as E from 'fp-ts/Either'
import { describe, it, expect } from 'vitest'

// @ts-ignore
const parseJSON = (json: string): IOE.IOEither<string, unknown> => {
  //TODO: Parse JSON string, catch errors and convert to Left
  //HINT: Use IOE.tryCatch with JSON.parse
}

// @ts-ignore
const parseNumber = (str: string): IOE.IOEither<string, number> => {
  //TODO: Parse string to number, fail if NaN
  //HINT: Use IOE.tryCatch or manual check
}

//TESTS
describe('IOEither tryCatch', () => {
  it('parses valid JSON', () => {
    const result = parseJSON('{"name":"Alice"}')()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toEqual({ name: 'Alice' })
    }
  })

  it('fails on invalid JSON', () => {
    const result = parseJSON('{invalid}')()
    expect(E.isLeft(result)).toBe(true)
  })

  it('parses valid number', () => {
    const result = parseNumber('42')()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toBe(42)
    }
  })

  it('fails on invalid number', () => {
    const result = parseNumber('not-a-number')()
    expect(E.isLeft(result)).toBe(true)
  })
})
