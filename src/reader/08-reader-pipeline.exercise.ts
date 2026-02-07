import { describe, it, expect } from 'vitest'
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

// @ts-ignore
const logMessage = (message: string): R.Reader<AppDependencies, void> => {
  //TODO:
  //Create a Reader that uses the logger to log a message
  //Use pipe with R.ask(), then R.map to call deps.logger.log(message)
}

// @ts-ignore
const getCachedValue = (key: string): R.Reader<AppDependencies, string | undefined> => {
  //TODO:
  //Create a Reader that gets a value from the cache
  //Use pipe with R.ask(), then R.map to call deps.cache.get(key)
}

// @ts-ignore
const setCachedValue = (key: string, value: string): R.Reader<AppDependencies, void> => {
  //TODO:
  //Create a Reader that sets a value in the cache
  //Use pipe with R.ask(), then R.map to call deps.cache.set(key, value)
}

// @ts-ignore
const buildUrl = (endpoint: string): R.Reader<AppDependencies, string> => {
  //TODO:
  //Create a Reader that builds a full URL from baseUrl + endpoint
  //Use R.asks to extract baseUrl and return `${baseUrl}/${endpoint}`
}

// @ts-ignore
const fetchWithCache = (endpoint: string): R.Reader<AppDependencies, string> => {
  //TODO:
  //Create a complex Reader pipeline that:
  //1. Logs "Fetching {endpoint}"
  //2. Checks the cache for the endpoint
  //3. If cached, logs "Cache hit" and returns cached value
  //4. If not cached, logs "Cache miss", builds URL, fetches data, caches it, and returns it
  //
  //This is advanced! You'll need to:
  //- Use R.chain to sequence operations that depend on previous results
  //- Use R.ask() to access dependencies multiple times
  //- Handle the cache hit/miss logic
  //
  //Hint structure:
  //pipe(
  //  logMessage(`Fetching ${endpoint}`),
  //  R.chain(() => getCachedValue(endpoint)),
  //  R.chain(cached =>
  //    cached
  //      ? pipe(logMessage('Cache hit'), R.map(() => cached))
  //      : pipe(
  //          logMessage('Cache miss'),
  //          R.chain(() => buildUrl(endpoint)),
  //          R.chain(url => R.asks((deps: AppDependencies) => {
  //            // Note: In real code, you'd handle the Promise properly
  //            // For this exercise, we'll use a sync version
  //            const data = 'mock data for ' + url
  //            return data
  //          })),
  //          R.chain(data => pipe(
  //            setCachedValue(endpoint, data),
  //            R.map(() => data)
  //          ))
  //        )
  //  )
  //)
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
