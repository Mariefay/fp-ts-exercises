import { describe, it, expect } from 'vitest'
import { pipe } from 'fp-ts/function'

interface Logger {
  log: (message: string) => void
}

interface UserService {
  getUser: (id: number) => { id: number; name: string } | undefined
}

interface Dependencies {
  logger: Logger
  userService: UserService
}

// @ts-ignore
const getUserById = (id: number): R.Reader<Dependencies, string> => {
  //TODO:
  //Use Reader for dependency injection:
  //1. Use R.ask() to get the Dependencies
  //2. Use the userService to get the user
  //3. Use the logger to log what happened
  //4. Return a string: either the user name or "User not found"
  //
  //Example pattern:
  //pipe(
  //  R.ask<Dependencies>(),
  //  R.map(deps => {
  //    const user = deps.userService.getUser(id)
  //    if (user) {
  //      deps.logger.log(`Found user: ${user.name}`)
  //      return user.name
  //    } else {
  //      deps.logger.log(`User ${id} not found`)
  //      return 'User not found'
  //    }
  //  })
  //)
}

//TESTS
describe('Reader dependency injection', () => {
  const logs: string[] = []
  const mockLogger: Logger = {
    log: (msg) => logs.push(msg),
  }

  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]

  const mockUserService: UserService = {
    getUser: (id) => users.find(u => u.id === id),
  }

  const deps: Dependencies = {
    logger: mockLogger,
    userService: mockUserService,
  }

  beforeEach(() => {
    logs.length = 0
  })

  it('finds existing user and logs', () => {
    const result = getUserById(1)(deps)
    expect(result).toBe('Alice')
    expect(logs).toContain('Found user: Alice')
  })

  it('handles missing user and logs', () => {
    const result = getUserById(99)(deps)
    expect(result).toBe('User not found')
    expect(logs).toContain('User 99 not found')
  })

  it('works with different user service', () => {
    const differentService: UserService = {
      getUser: () => ({ id: 999, name: 'Test User' }),
    }
    const testDeps = { ...deps, userService: differentService }
    const result = getUserById(1)(testDeps)
    expect(result).toBe('Test User')
  })
})
