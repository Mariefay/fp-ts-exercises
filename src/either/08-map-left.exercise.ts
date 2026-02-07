import { describe, it, expect } from 'vitest'
import * as E from 'fp-ts/Either'

interface User {
  id: number
  name: string
}

type ErrorCode = 'ERR_NOT_FOUND' | 'ERR_INVALID_ID'

interface DetailedError {
  code: ErrorCode
  message: string
  timestamp: number
}

// @ts-ignore
const enrichError = (
  userEither: E.Either<ErrorCode, User>
): E.Either<DetailedError, User> => {
  //TODO:
  //Use E.mapLeft to transform the error from ErrorCode to DetailedError
  //Create a DetailedError object with:
  // - code: the original error code
  // - message: a user-friendly message based on the error code
  // - timestamp: Date.now()
  //Use pipe for functional composition
}

//TESTS
describe('enrichError', () => {
  const userRight: E.Either<ErrorCode, User> = E.right({ id: 1, name: 'Alice' })
  const userLeft1: E.Either<ErrorCode, User> = E.left('ERR_NOT_FOUND')
  const userLeft2: E.Either<ErrorCode, User> = E.left('ERR_INVALID_ID')

  it('preserves right value', () => {
    const result = enrichError(userRight)
    expect(result).toEqual({ _tag: 'Right', right: { id: 1, name: 'Alice' } })
  })

  it('enriches ERR_NOT_FOUND error', () => {
    const result = enrichError(userLeft1)
    expect(result._tag).toEqual('Left')
    if (result._tag === 'Left') {
      expect(result.left.code).toEqual('ERR_NOT_FOUND')
      expect(result.left.message).toEqual('User not found')
      expect(typeof result.left.timestamp).toBe('number')
    }
  })

  it('enriches ERR_INVALID_ID error', () => {
    const result = enrichError(userLeft2)
    expect(result._tag).toEqual('Left')
    if (result._tag === 'Left') {
      expect(result.left.code).toEqual('ERR_INVALID_ID')
      expect(result.left.message).toEqual('Invalid user ID')
      expect(typeof result.left.timestamp).toBe('number')
    }
  })
})
