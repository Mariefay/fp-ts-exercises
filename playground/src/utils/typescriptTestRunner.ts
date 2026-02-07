import { TestSuite, TestResult } from '@/types/exercise'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import { pipe, flow } from 'fp-ts/function'
import * as ts from 'typescript'

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

export class TypeScriptTestRunner {
  // Run user code combined with test code
  async runCodeWithTests(userCode: string, testCode: string): Promise<TestSuite> {
    // Combine user code with tests
    const fullCode = `${userCode}\n\n${testCode}`
    return this.runCode(fullCode)
  }

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
          // Better error message for undefined returns
          if (actual === undefined) {
            const expectedStr = JSON.stringify(expected, null, 2)
            throw new Error(
              `❌ Function returned undefined!\n\n` +
              `Expected:\n${expectedStr}\n\n` +
              `💡 Hint: Make sure you're returning a value from your function. ` +
              `Check that you've implemented the function and are using the correct fp-ts methods.`
            )
          }

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
            if (actual === undefined) {
              throw new Error(
                `❌ Function returned undefined!\n\n` +
                `Expected: ${String(expected)}\n\n` +
                `💡 Hint: Make sure you're returning a value from your function.`
              )
            }
            throw new Error(
              `Expected: ${String(expected)}\nReceived: ${String(actual)}`
            )
          }
        },

        toBeUndefined: () => {
          if (actual !== undefined) {
            throw new Error(
              `Expected: undefined\nReceived: ${String(actual)}`
            )
          }
        },

        toBeNull: () => {
          if (actual !== null) {
            throw new Error(
              `Expected: null\nReceived: ${String(actual)}`
            )
          }
        },

        toBeTruthy: () => {
          if (!actual) {
            throw new Error(
              `Expected: truthy value\nReceived: ${String(actual)}`
            )
          }
        },

        toBeFalsy: () => {
          if (actual) {
            throw new Error(
              `Expected: falsy value\nReceived: ${String(actual)}`
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
          message: '💡 Function not yet implemented',
          error: 'Remove @ts-ignore and the TODO comments, then implement the function using fp-ts'
        }]
      }
    }

    try {
      // First, remove import statements from the TypeScript code
      let cleanCode = code
      cleanCode = cleanCode.replace(/import\s+\*\s+as\s+\w+\s+from\s+['"][^'"]+['"]/g, '')
      cleanCode = cleanCode.replace(/import\s+{[^}]*}\s+from\s+['"][^'"]+['"]/g, '')
      cleanCode = cleanCode.replace(/import\s+.*?from\s+['"][^'"]+['"]/g, '')
      cleanCode = cleanCode.replace(/import\s+['"][^'"]+['"]/g, '')

      // Remove export statements before transpiling
      cleanCode = cleanCode.replace(/export\s+(const|function|class|interface|type)\s+/g, '$1 ')
      cleanCode = cleanCode.replace(/export\s+/g, '')

      // Transpile TypeScript to JavaScript using the TypeScript compiler
      const transpiled = ts.transpileModule(cleanCode, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.None,
          removeComments: false,
          isolatedModules: true,
          esModuleInterop: true,
          skipLibCheck: true,
        }
      })

      let jsCode = transpiled.outputText

      // Remove empty lines
      jsCode = jsCode.split('\n').filter(line => line.trim().length > 0).join('\n')

      // Debug: log the transpiled code
      console.log('=== Transpiled JavaScript ===')
      console.log(jsCode)
      console.log('============================')

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

      // Execute code in controlled environment
      try {
        const fn = new Function(
          ...Object.keys(context),
          jsCode
        )
        fn(...Object.values(context))
      } catch (executionError) {
        console.error('Execution error:', executionError)
        console.error('JavaScript code was:', jsCode)
        throw new Error(`Execution error: ${executionError instanceof Error ? executionError.message : String(executionError)}`)
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
          message: 'Compilation error',
          error: error instanceof Error ? error.message : String(error)
        }]
      }
    }
  }
}

export const typescriptTestRunner = new TypeScriptTestRunner()
