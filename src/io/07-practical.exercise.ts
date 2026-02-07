import * as IOE from 'fp-ts/IOEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type Config = { timeout: number; retries: number }

const configStore: Record<string, Config> = {
  dev: { timeout: 5000, retries: 3 },
  prod: { timeout: 3000, retries: 5 },
}

// @ts-ignore
const loadConfig = (env: string): IOE.IOEither<string, Config> => {
  //TODO: Load config from store, fail if not found
  //HINT: Check if env exists in configStore
}

// @ts-ignore
const validateConfig = (config: Config): IOE.IOEither<string, Config> => {
  //TODO: Validate timeout > 0 and retries > 0
  //HINT: Use IOE.fromEither or manual check
}

// @ts-ignore
const loadAndValidateConfig = (env: string): IOE.IOEither<string, Config> => {
  //TODO: Load config then validate it
  //HINT: Use pipe with loadConfig and IOE.flatMap
}

//TESTS
describe('IOEither practical', () => {
  it('loads valid config', () => {
    const result = loadConfig('dev')()
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toEqual({ timeout: 5000, retries: 3 })
    }
  })

  it('fails on missing config', () => {
    const result = loadConfig('staging')()
    expect(E.isLeft(result)).toBe(true)
  })

  it('validates config successfully', () => {
    const config: Config = { timeout: 5000, retries: 3 }
    const result = validateConfig(config)()
    expect(E.isRight(result)).toBe(true)
  })

  it('fails validation for invalid config', () => {
    const config: Config = { timeout: -1, retries: 3 }
    const result = validateConfig(config)()
    expect(E.isLeft(result)).toBe(true)
  })

  it('loads and validates config', () => {
    const result = loadAndValidateConfig('prod')()
    expect(E.isRight(result)).toBe(true)
  })
})
