import { describe, it, expect } from 'vitest'
import * as O from 'fp-ts/Option'

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

// @ts-ignore
const extractUserAge = (response: ApiResponse): O.Option<number> => {
  //TODO:
  //Use pipe to safely extract the user's age from the nested API response
  //1. Start with response.data
  //2. Use O.fromNullable to handle undefined
  //3. Chain through user, profile, and age
  //Return None if any part of the chain is undefined
  //Import pipe from 'fp-ts/function'
}

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
