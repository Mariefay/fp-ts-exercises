import * as R from 'fp-ts/Reader'
import { describe, it, expect } from 'vitest'
import { pipe } from 'fp-ts/function'

interface DatabaseConfig {
  host: string
  port: number
  username: string
  password: string
}

interface ApiConfig {
  baseUrl: string
  apiKey: string
  timeout: number
}

interface AppConfig {
  database: DatabaseConfig
  api: ApiConfig
  env: 'development' | 'production' | 'test'
}

export const getDatabaseUrl = (): R.Reader<AppConfig, string> => {
  return pipe(
    R.asks((config: AppConfig) => config.database),
    R.map(db => `postgresql://${db.username}:${db.password}@${db.host}:${db.port}`)
  )
}

export const getApiEndpoint = (path: string): R.Reader<AppConfig, string> => {
  return pipe(
    R.asks((config: AppConfig) => config.api),
    R.map(api => `${api.baseUrl}/${path}?key=${api.apiKey}`)
  )
}

export const getConfigSummary = (): R.Reader<AppConfig, { env: string; dbHost: string; apiUrl: string }> => {
  return pipe(
    R.ask<AppConfig>(),
    R.map(config => ({
      env: config.env,
      dbHost: config.database.host,
      apiUrl: config.api.baseUrl,
    }))
  )
}

export const isProduction = (): R.Reader<AppConfig, boolean> => {
  return R.asks((config: AppConfig) => config.env === 'production')
}

//TESTS
describe('Real-world configuration', () => {
  const config: AppConfig = {
    database: {
      host: 'db.example.com',
      port: 5432,
      username: 'admin',
      password: 'secret123',
    },
    api: {
      baseUrl: 'https://api.example.com',
      apiKey: 'abc123',
      timeout: 5000,
    },
    env: 'production',
  }

  it('builds database connection URL', () => {
    const result = getDatabaseUrl()(config)
    expect(result).toBe('postgresql://admin:secret123@db.example.com:5432')
  })

  it('builds API endpoint with path', () => {
    const result = getApiEndpoint('users')(config)
    expect(result).toBe('https://api.example.com/users?key=abc123')
  })

  it('creates config summary', () => {
    const result = getConfigSummary()(config)
    expect(result).toEqual({
      env: 'production',
      dbHost: 'db.example.com',
      apiUrl: 'https://api.example.com',
    })
  })

  it('checks if production environment', () => {
    expect(isProduction()(config)).toBe(true)

    const devConfig = { ...config, env: 'development' as const }
    expect(isProduction()(devConfig)).toBe(false)
  })

  it('works with different configurations', () => {
    const testConfig: AppConfig = {
      ...config,
      database: { ...config.database, host: 'localhost', port: 5433 },
      env: 'test',
    }
    expect(getDatabaseUrl()(testConfig)).toBe('postgresql://admin:secret123@localhost:5433')
    expect(isProduction()(testConfig)).toBe(false)
  })
})
