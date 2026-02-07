import * as R from 'fp-ts/Reader'
import { describe, it, expect } from 'vitest'

interface Config {
  apiUrl: string
  timeout: number
}

export const getApiUrl = (): R.Reader<Config, string> => {
  return R.asks((config: Config) => config.apiUrl)
}

export const getTimeout = (): R.Reader<Config, number> => {
  return R.asks((config: Config) => config.timeout)
}

//TESTS
describe('Reader basics', () => {
  const config: Config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
  }

  it('getApiUrl extracts apiUrl from config', () => {
    const result = getApiUrl()(config)
    expect(result).toBe('https://api.example.com')
  })

  it('getTimeout extracts timeout from config', () => {
    const result = getTimeout()(config)
    expect(result).toBe(5000)
  })

  it('Reader can be called with different configs', () => {
    const testConfig: Config = { apiUrl: 'https://test.com', timeout: 1000 }
    expect(getApiUrl()(testConfig)).toBe('https://test.com')
    expect(getTimeout()(testConfig)).toBe(1000)
  })
})
