import { describe, it, expect } from 'vitest'

interface Config {
  apiUrl: string
  timeout: number
}

// @ts-ignore
const getApiUrl = (): R.Reader<Config, string> => {
  //TODO:
  //Create a Reader that accesses the environment and returns the apiUrl.
  //Use R.asks() which takes a function that extracts a value from the environment.
  //For example: R.asks((config: Config) => config.apiUrl)
}

// @ts-ignore
const getTimeout = (): R.Reader<Config, number> => {
  //TODO:
  //Create a Reader that accesses the environment and returns the timeout.
  //Use R.asks() to extract the timeout from the Config.
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
