import * as R from 'fp-ts/Reader'
import { describe, it, expect } from 'vitest'
import { pipe } from 'fp-ts/function'

interface Config {
  baseUrl: string
  apiKey: string
  timeout: number
}

export const getUrl = (): R.Reader<Config, string> => {
  return R.asks((config: Config) => config.baseUrl)
}

export const getUrlWithOverride = (newUrl: string): R.Reader<Config, string> => {
  return pipe(
    getUrl(),
    R.local((config: Config) => ({ ...config, baseUrl: newUrl }))
  )
}

export const getUrlWithTimeout = (newTimeout: number): R.Reader<Config, { url: string; timeout: number }> => {
  return pipe(
    R.ask<Config>(),
    R.local((config: Config) => ({ ...config, timeout: newTimeout })),
    R.map(config => ({ url: config.baseUrl, timeout: config.timeout }))
  )
}

//TESTS
describe('Reader local', () => {
  const config: Config = {
    baseUrl: 'https://api.example.com',
    apiKey: 'secret123',
    timeout: 5000,
  }

  it('gets base URL from config', () => {
    expect(getUrl()(config)).toBe('https://api.example.com')
  })

  it('overrides URL locally without affecting original config', () => {
    const result = getUrlWithOverride('https://test.com')(config)
    expect(result).toBe('https://test.com')
    // Original config unchanged
    expect(getUrl()(config)).toBe('https://api.example.com')
  })

  it('overrides timeout locally', () => {
    const result = getUrlWithTimeout(1000)(config)
    expect(result).toEqual({
      url: 'https://api.example.com',
      timeout: 1000,
    })
  })

  it('multiple local overrides work independently', () => {
    expect(getUrlWithOverride('https://dev.com')(config)).toBe('https://dev.com')
    expect(getUrlWithOverride('https://staging.com')(config)).toBe('https://staging.com')
  })
})
