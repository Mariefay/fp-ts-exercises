import * as NEA from 'fp-ts/NonEmptyArray'
import * as O from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

type LogEntry = {
  timestamp: number
  message: string
  level: 'info' | 'warn' | 'error'
}

export const getLatestLog = (logs: LogEntry[]): O.Option<LogEntry> =>
  pipe(
    NEA.fromArray(logs),
    O.map(NEA.last)
  )

export const getErrorLogs = (logs: NEA.NonEmptyArray<LogEntry>): O.Option<NEA.NonEmptyArray<LogEntry>> =>
  NEA.filter((log: LogEntry) => log.level === 'error')(logs)

export const getMostRecentError = (logs: NEA.NonEmptyArray<LogEntry>): O.Option<LogEntry> =>
  pipe(
    getErrorLogs(logs),
    O.map(NEA.last)
  )

//TESTS
describe('NonEmptyArray practical examples', () => {
  const logs: LogEntry[] = [
    { timestamp: 1, message: 'Started', level: 'info' },
    { timestamp: 2, message: 'Warning!', level: 'warn' },
    { timestamp: 3, message: 'Failed', level: 'error' },
    { timestamp: 4, message: 'Completed', level: 'info' },
  ]

  it('gets latest log', () => {
    const result = getLatestLog(logs)
    expect(O.isSome(result)).toBe(true)
    if (O.isSome(result)) {
      expect(result.value.timestamp).toBe(4)
    }
  })

  it('returns None for empty logs', () => {
    const result = getLatestLog([])
    expect(O.isNone(result)).toBe(true)
  })

  it('filters error logs', () => {
    const nonEmptyLogs = NEA.fromArray(logs)
    expect(O.isSome(nonEmptyLogs)).toBe(true)
    if (O.isSome(nonEmptyLogs)) {
      const result = getErrorLogs(nonEmptyLogs.value)
      expect(O.isSome(result)).toBe(true)
      if (O.isSome(result)) {
        expect(result.value.length).toBe(1)
        expect(result.value[0].level).toBe('error')
      }
    }
  })

  it('gets most recent error', () => {
    const nonEmptyLogs = NEA.fromArray(logs)
    expect(O.isSome(nonEmptyLogs)).toBe(true)
    if (O.isSome(nonEmptyLogs)) {
      const result = getMostRecentError(nonEmptyLogs.value)
      expect(O.isSome(result)).toBe(true)
      if (O.isSome(result)) {
        expect(result.value.message).toBe('Failed')
      }
    }
  })
})
