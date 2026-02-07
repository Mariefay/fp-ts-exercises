import { describe, it, expect } from 'vitest'
import { pipe } from 'fp-ts/function'

interface Config {
  baseUrl: string
  apiKey: string
  timeout: number
}

// @ts-ignore
const getUrl = (): R.Reader<Config, string> => {
  //TODO:
  //Simple Reader that returns the baseUrl from config
  //Use R.asks((config: Config) => config.baseUrl)
}

// @ts-ignore
const getUrlWithOverride = (newUrl: string): R.Reader<Config, string> => {
  //TODO:
  //Use R.local to temporarily modify the config environment:
  //1. R.local takes two arguments:
  //    - A function that modifies the environment: (config: Config) => Config
  //    - The Reader to run with the modified environment
  //2. Override the baseUrl in the config
  //3. Run getUrl() with the modified config
  //
  //Example:
  //pipe(
  //  getUrl(),
  //  R.local((config: Config) => ({ ...config, baseUrl: newUrl }))
  //)
}

// @ts-ignore
const getUrlWithTimeout = (newTimeout: number): R.Reader<Config, { url: string; timeout: number }> => {
  //TODO:
  //Use R.local to override the timeout in the config:
  //1. Modify the environment to change the timeout
  //2. Return both url and timeout from the modified config
  //
  //Hint: Use R.ask() to get the modified config, then map to extract both values
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
