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

// @ts-ignore
const getDatabaseUrl = (): R.Reader<AppConfig, string> => {
  //TODO:
  //Build a database connection URL from the database config
  //Format: "postgresql://{username}:{password}@{host}:{port}"
  //
  //Use pipe with R.asks to extract database config, then R.map to build the string
}

// @ts-ignore
const getApiEndpoint = (path: string): R.Reader<AppConfig, string> => {
  //TODO:
  //Build a full API endpoint URL
  //Format: "{baseUrl}/{path}?key={apiKey}"
  //
  //Extract the api config and build the endpoint string
}

// @ts-ignore
const getConfigSummary = (): R.Reader<AppConfig, { env: string; dbHost: string; apiUrl: string }> => {
  //TODO:
  //Create a summary object combining multiple config values:
  //1. Get the environment (env)
  //2. Get the database host
  //3. Get the API baseUrl
  //
  //Return an object with: { env, dbHost, apiUrl }
  //
  //Hint: Use R.ask() to get the entire config, then map to extract the needed fields
}

// @ts-ignore
const isProduction = (): R.Reader<AppConfig, boolean> => {
  //TODO:
  //Simple Reader that checks if env === 'production'
  //Use R.asks to extract and check the env field
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
