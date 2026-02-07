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

// @ts-ignore
const getDatabase = (): R.Reader<Config, Database> => {
  //TODO:
  //Create a Reader that extracts the database from Config
  //Use R.asks((config: Config) => config.database)
}

// @ts-ignore
const getConnectionString = (): R.Reader<Config, string> => {
  //TODO:
  //Chain two Readers together:
  //1. First get the database config using getDatabase()
  //2. Then transform it to a connection string
  //
  //Use pipe with R.chain:
  //pipe(
  //  getDatabase(),
  //  R.chain(db => R.of(`${db.host}:${db.port}`))
  //)
  //
  //Note: R.chain is used to compose Readers that depend on previous Reader results
}

// @ts-ignore
const getFullConnectionString = (): R.Reader<Config, string> => {
  //TODO:
  //Chain multiple operations:
  //1. Get the connection string
  //2. Also get the appName from config
  //3. Combine them into: "appName@host:port"
  //
  //Hint: You can use R.chain multiple times, and use R.ask() inside the chain
  //to access the config again
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
