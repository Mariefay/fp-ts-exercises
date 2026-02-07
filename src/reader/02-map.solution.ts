import * as R from 'fp-ts/Reader'
import { describe, it, expect } from 'vitest'
import { pipe } from 'fp-ts/function'

interface Config {
  apiUrl: string
  version: number
}

export const getFullUrl = (endpoint: string): R.Reader<Config, string> => {
  return pipe(
    R.ask<Config>(),
    R.map(config => `${config.apiUrl}/v${config.version}/${endpoint}`)
  )
}

//TESTS
describe('Reader map', () => {
  const config: Config = {
    apiUrl: 'https://api.example.com',
    version: 2,
  }

  it('builds full URL with endpoint', () => {
    const result = getFullUrl('users')(config)
    expect(result).toBe('https://api.example.com/v2/users')
  })

  it('works with different endpoints', () => {
    expect(getFullUrl('posts')(config)).toBe('https://api.example.com/v2/posts')
    expect(getFullUrl('comments')(config)).toBe('https://api.example.com/v2/comments')
  })

  it('uses version from config', () => {
    const v1Config = { ...config, version: 1 }
    expect(getFullUrl('users')(v1Config)).toBe('https://api.example.com/v1/users')
  })
})
