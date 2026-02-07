import * as R from 'fp-ts/Reader'
import { describe, it, expect, beforeEach } from 'vitest'
import { pipe } from 'fp-ts/function'

interface Logger {
  log: (msg: string) => void
}

interface Cache {
  get: (key: string) => string | undefined
  set: (key: string, value: string) => void
}

interface HttpClient {
  fetch: (url: string) => Promise<string>
}

interface AppDependencies {
  logger: Logger
  cache: Cache
  httpClient: HttpClient
  baseUrl: string
}

export const logMessage = (message: string): R.Reader<AppDependencies, void> => {
  return pipe(
    R.ask<AppDependencies>(),
    R.map(deps => deps.logger.log(message))
  )
}

export const getCachedValue = (key: string): R.Reader<AppDependencies, string | undefined> => {
  return pipe(
    R.ask<AppDependencies>(),
    R.map(deps => deps.cache.get(key))
  )
}

export const setCachedValue = (key: string, value: string): R.Reader<AppDependencies, void> => {
  return pipe(
    R.ask<AppDependencies>(),
    R.map(deps => deps.cache.set(key, value))
  )
}

export const buildUrl = (endpoint: string): R.Reader<AppDependencies, string> => {
  return R.asks((deps: AppDependencies) => `${deps.baseUrl}/${endpoint}`)
}

export const fetchWithCache = (endpoint: string): R.Reader<AppDependencies, string> => {
  return pipe(
    logMessage(`Fetching ${endpoint}`),
    R.chain(() => getCachedValue(endpoint)),
    R.chain(cached =>
      cached
        ? pipe(
            logMessage('Cache hit'),
            R.map(() => cached)
          )
        : pipe(
            logMessage('Cache miss'),
            R.chain(() => buildUrl(endpoint)),
            R.map(url => `mock data for ${url}`),
            R.chain(data =>
              pipe(
                setCachedValue(endpoint, data),
                R.map(() => data)
              )
            )
          )
    )
  )
}

//TESTS
describe('Reader pipeline', () => {
  const logs: string[] = []
  const cacheStore = new Map<string, string>()

  const deps: AppDependencies = {
    logger: {
      log: (msg) => logs.push(msg),
    },
    cache: {
      get: (key) => cacheStore.get(key),
      set: (key, value) => cacheStore.set(key, value),
    },
    httpClient: {
      fetch: async (url) => `data from ${url}`,
    },
    baseUrl: 'https://api.example.com',
  }

  beforeEach(() => {
    logs.length = 0
    cacheStore.clear()
  })

  it('logs a message', () => {
    logMessage('test message')(deps)
    expect(logs).toContain('test message')
  })

  it('gets cached value', () => {
    cacheStore.set('key1', 'value1')
    const result = getCachedValue('key1')(deps)
    expect(result).toBe('value1')
  })

  it('sets cached value', () => {
    setCachedValue('key2', 'value2')(deps)
    expect(cacheStore.get('key2')).toBe('value2')
  })

  it('builds URL', () => {
    const result = buildUrl('users')(deps)
    expect(result).toBe('https://api.example.com/users')
  })

  it('fetches with cache miss', () => {
    const result = fetchWithCache('users')(deps)
    expect(logs).toContain('Fetching users')
    expect(logs).toContain('Cache miss')
    expect(result).toContain('api.example.com/users')
    expect(cacheStore.get('users')).toBeDefined()
  })

  it('fetches with cache hit', () => {
    cacheStore.set('posts', 'cached posts data')
    const result = fetchWithCache('posts')(deps)
    expect(logs).toContain('Fetching posts')
    expect(logs).toContain('Cache hit')
    expect(result).toBe('cached posts data')
  })
})
