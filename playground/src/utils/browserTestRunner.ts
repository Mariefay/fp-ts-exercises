import { TestSuite, TestResult } from '@/types/exercise'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import { pipe, flow } from 'fp-ts/function'

interface TestContext {
  describe: (name: string, fn: () => void) => void
  it: (name: string, fn: () => void) => void
  expect: <T>(actual: T) => {
    toEqual: <U>(expected: U) => void
    toBe: <U>(expected: U) => void
    toBeUndefined: () => void
    toBeNull: () => void
    toBeTruthy: () => void
    toBeFalsy: () => void
  }
}

export class BrowserTestRunner {
  async runCode(code: string): Promise<TestSuite> {
    const results: TestResult[] = []
    let suiteName = 'Test Suite'

    // Create test context
    const testContext: TestContext = {
      describe: (name: string, fn: () => void) => {
        suiteName = name
        try {
          fn()
        } catch (error) {
          results.push({
            passed: false,
            message: `Suite setup failed: ${name}`,
            error: error instanceof Error ? error.message : String(error)
          })
        }
      },

      it: (name: string, fn: () => void) => {
        const startTime = Date.now()
        try {
          fn()
          const duration = Date.now() - startTime
          results.push({
            passed: true,
            message: name,
            duration
          })
        } catch (error) {
          const duration = Date.now() - startTime
          results.push({
            passed: false,
            message: name,
            error: error instanceof Error ? error.message : String(error),
            duration
          })
        }
      },

      expect: <T>(actual: T) => ({
        toEqual: <U>(expected: U) => {
          const actualStr = JSON.stringify(actual, null, 2)
          const expectedStr = JSON.stringify(expected, null, 2)

          if (actualStr !== expectedStr) {
            throw new Error(
              `Expected:\n${expectedStr}\n\nReceived:\n${actualStr}`
            )
          }
        },

        toBe: <U>(expected: U) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((actual as any) !== expected) {
            throw new Error(
              `Expected: ${String(expected)}\nReceived: ${String(actual)}`
            )
          }
        },

        toBeUndefined: () => {
          if (actual !== undefined) {
            throw new Error(
              `Expected undefined\nReceived: ${String(actual)}`
            )
          }
        },

        toBeNull: () => {
          if (actual !== null) {
            throw new Error(
              `Expected null\nReceived: ${String(actual)}`
            )
          }
        },

        toBeTruthy: () => {
          if (!actual) {
            throw new Error(
              `Expected truthy value\nReceived: ${String(actual)}`
            )
          }
        },

        toBeFalsy: () => {
          if (actual) {
            throw new Error(
              `Expected falsy value\nReceived: ${String(actual)}`
            )
          }
        }
      })
    }

    // Check for unimplemented code
    if (code.includes('@ts-ignore') || code.includes('//TODO')) {
      return {
        name: suiteName,
        passed: false,
        total: 1,
        passCount: 0,
        failCount: 1,
        results: [{
          passed: false,
          message: 'Function not implemented',
          error: 'Remove @ts-ignore and implement the function'
        }]
      }
    }

    try {
      // Remove TypeScript-specific syntax more aggressively
      let cleanCode = code

      // Remove all import statements (including multi-line)
      cleanCode = cleanCode.replace(/import\s+.*?from\s+['"][^'"]+['"]/g, '')
      cleanCode = cleanCode.replace(/import\s+['"][^'"]+['"]/g, '')
      cleanCode = cleanCode.replace(/import\s+{[^}]*}\s+from\s+['"][^'"]+['"]/g, '')
      cleanCode = cleanCode.replace(/import\s+\*\s+as\s+\w+\s+from\s+['"][^'"]+['"]/g, '')

      // Remove export statements
      cleanCode = cleanCode.replace(/export\s+(const|function|class|interface|type)\s+/g, '$1 ')

      // Remove interface declarations (including multi-line)
      cleanCode = cleanCode.replace(/interface\s+\w+\s*{[^}]*}/gs, '')

      // Remove type declarations
      cleanCode = cleanCode.replace(/type\s+\w+\s*=\s*[^;\n]+/g, '')

      // Remove variable type annotations: const name: Type = value
      cleanCode = cleanCode.replace(/\b(const|let|var)\s+(\w+)\s*:\s*[\w.<>[\]|,\s()=>]+\s*=/g, '$1 $2 =')

      // Remove type annotations with more precise patterns
      // First pass: Remove parameter type annotations
      // Match: (param: Type) or ,param: Type
      cleanCode = cleanCode.replace(/:(\s*[\w<>\[\]|&{}]+)(\s*[,)])/g, '$2')

      // Second pass: Remove return type annotations - anything between ): and =>
      cleanCode = cleanCode.replace(/\)(\s*):\s*[^=>]+(=>)/g, ')$1$2')

      // Remove type assertions
      cleanCode = cleanCode.replace(/\s+as\s+[\w<>.|]+/g, '')

      // Remove empty lines
      cleanCode = cleanCode.split('\n').filter(line => line.trim().length > 0).join('\n')

      // Debug: log the cleaned code
      console.log('=== Cleaned Code ===')
      console.log(cleanCode)
      console.log('===================')

      // Create execution context with fp-ts and test utilities
      const context = {
        O,
        E,
        pipe,
        flow,
        describe: testContext.describe,
        it: testContext.it,
        expect: testContext.expect,
        console: {
          log: (...args: unknown[]) => console.log('[Test]', ...args),
          error: (...args: unknown[]) => console.error('[Test Error]', ...args)
        }
      }

      // Execute code in controlled environment (without strict mode to avoid reserved word issues)
      try {
        const fn = new Function(
          ...Object.keys(context),
          cleanCode
        )
        fn(...Object.values(context))
      } catch (syntaxError) {
        console.error('Syntax error in cleaned code:', syntaxError)
        console.error('Cleaned code was:', cleanCode)
        throw new Error(`Code transformation error: ${syntaxError instanceof Error ? syntaxError.message : String(syntaxError)}`)
      }

      // Calculate results
      const passCount = results.filter(r => r.passed).length
      const failCount = results.filter(r => !r.passed).length

      return {
        name: suiteName,
        passed: failCount === 0,
        total: results.length,
        passCount,
        failCount,
        results
      }
    } catch (error) {
      return {
        name: suiteName,
        passed: false,
        total: 1,
        passCount: 0,
        failCount: 1,
        results: [{
          passed: false,
          message: 'Execution error',
          error: error instanceof Error ? error.message : String(error)
        }]
      }
    }
  }
}

export const browserTestRunner = new BrowserTestRunner()
