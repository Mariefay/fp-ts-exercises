import * as IOE from 'fp-ts/IOEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

const parseJSON = (json: string): IOE.IOEither<string, unknown> =>
  IOE.tryCatch(
    () => JSON.parse(json),
    () => 'Invalid JSON'
  )

const getString = (obj: unknown, key: string): IOE.IOEither<string, string> =>
  () => {
    if (typeof obj === 'object' && obj !== null && key in obj) {
      const value = (obj as Record<string, unknown>)[key]
      return typeof value === 'string' ? E.right(value) : E.left(`${key} is not a string`)
    }
    return E.left(`Key ${key} not found`)
  }

export const extractName = (json: string): IOE.IOEither<string, string> =>
  pipe(
    parseJSON(json),
    IOE.flatMap((obj) => getString(obj, 'name'))
  )

//TESTS
describe('IOEither chain', () => {
  it('extracts name from valid JSON', () => {
    const result = extractName('{"name":"Alice","age":30}')()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toBe('Alice')
    }
  })

  it('fails on invalid JSON', () => {
    const result = extractName('{invalid}')()
    expect(E.isLeft(result)).toBe(true)
  })

  it('fails when name is missing', () => {
    const result = extractName('{"age":30}')()
    expect(E.isLeft(result)).toBe(true)
  })
})
