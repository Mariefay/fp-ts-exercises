import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { describe, it, expect } from 'vitest'

interface ApiResponse {
  data?: {
    user?: {
      profile?: {
        name: string
        age: number
      }
    }
  }
}

export const extractUserAge = (response: ApiResponse): O.Option<number> =>
  pipe(
    response.data,
    O.fromNullable,
    O.chain(data => O.fromNullable(data.user)),
    O.chain(user => O.fromNullable(user.profile)),
    O.map(profile => profile.age)
  )

//TESTS
describe('extractUserAge', () => {
  it('extracts age from complete response', () => {
    const response: ApiResponse = {
      data: {
        user: {
          profile: {
            name: 'Alice',
            age: 25
          }
        }
      }
    }
    const result = extractUserAge(response)
    expect(result).toEqual({ _tag: 'Some', value: 25 })
  })

  it('returns None when data is missing', () => {
    const response: ApiResponse = {}
    const result = extractUserAge(response)
    expect(result).toEqual({ _tag: 'None' })
  })

  it('returns None when user is missing', () => {
    const response: ApiResponse = {
      data: {}
    }
    const result = extractUserAge(response)
    expect(result).toEqual({ _tag: 'None' })
  })

  it('returns None when profile is missing', () => {
    const response: ApiResponse = {
      data: {
        user: {}
      }
    }
    const result = extractUserAge(response)
    expect(result).toEqual({ _tag: 'None' })
  })
})
