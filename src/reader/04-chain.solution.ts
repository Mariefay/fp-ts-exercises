import * as R from 'fp-ts/Reader'
import { describe, it, expect } from 'vitest'
import { pipe } from 'fp-ts/function'

interface Database {
  host: string
  port: number
}

interface Config {
  database: Database
  appName: string
}

export const getDatabase = (): R.Reader<Config, Database> => {
  return R.asks((config: Config) => config.database)
}

export const getConnectionString = (): R.Reader<Config, string> => {
  return pipe(
    getDatabase(),
    R.map(db => `${db.host}:${db.port}`)
  )
}

export const getFullConnectionString = (): R.Reader<Config, string> => {
  return pipe(
    getConnectionString(),
    R.chain(connStr =>
      pipe(
        R.asks((config: Config) => config.appName),
        R.map(appName => `${appName}@${connStr}`)
      )
    )
  )
}

//TESTS
describe('Reader chain', () => {
  const config: Config = {
    database: {
      host: 'localhost',
      port: 5432,
    },
    appName: 'myapp',
  }

  it('gets database config', () => {
    const result = getDatabase()(config)
    expect(result).toEqual({ host: 'localhost', port: 5432 })
  })

  it('builds connection string', () => {
    const result = getConnectionString()(config)
    expect(result).toBe('localhost:5432')
  })

  it('builds full connection string with app name', () => {
    const result = getFullConnectionString()(config)
    expect(result).toBe('myapp@localhost:5432')
  })
})
