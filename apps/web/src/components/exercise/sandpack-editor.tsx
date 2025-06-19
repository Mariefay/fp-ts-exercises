'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { githubLight } from '@codesandbox/sandpack-themes';

interface TestCase {
  description: string;
  code: string;
  type: 'it' | 'describe';
}

interface Exercise {
  slug: string;
  category: string;
  number: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  starterCode: string;
  solutionCode: string;
  imports: string[];
  testCases?: TestCase[];
}

interface SandpackEditorProps {
  exercise: Exercise;
  onTestPass?: () => void;
}

function TestRunner({
  exercise,
  onTestPass,
}: {
  exercise: Exercise;
  onTestPass?: () => void;
}) {
  const { sandpack, dispatch, listen } = useSandpack();
  console.log(exercise)

  const [testResults, setTestResults] = useState<{
    passed: boolean;
    output: string;
  } | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const extractFunctionName = useCallback((starterCode: string): string => {
    const functionMatch = starterCode.match(/const\s+(\w+)\s*=/);
    return functionMatch ? functionMatch[1] : 'unknownFunction';
  }, []);

  const runTests = useCallback(async () => {
    setIsRunningTests(true);
    setTestResults(null);

    try {
      let testOutput = '';
      let hasTestResults = false;
      const unsubscribe = listen((msg) => {
        console.log('Debug: Received message from Sandpack:', msg); // Add debugging
        if (msg.type === 'console') {
          const consoleOutput = msg.log
            .map((item) =>
              typeof item === 'string' ? item : JSON.stringify(item)
            )
            .join(' ');

          testOutput += consoleOutput + '\n';

          if (
            consoleOutput.includes('✓') ||
            consoleOutput.includes('PASS') ||
            consoleOutput.includes('passing') ||
            consoleOutput.includes('passed') ||
            consoleOutput.includes('Test Files') ||
            consoleOutput.includes('Tests') ||
            /\\d+\\s+passed/.test(consoleOutput) ||
            /✓.*test/.test(consoleOutput)
          ) {
            hasTestResults = true;
            setTestResults({
              passed: true,
              output: `✅ All tests passed!\n\n${testOutput}`,
            });
            if (onTestPass) {
              onTestPass();
            }
          } else if (
            consoleOutput.includes('✗') ||
            consoleOutput.includes('FAIL') ||
            consoleOutput.includes('failing') ||
            consoleOutput.includes('failed') ||
            consoleOutput.includes('AssertionError') ||
            consoleOutput.includes('expected') ||
            /\\d+\\s+failed/.test(consoleOutput) ||
            /✗.*test/.test(consoleOutput)
          ) {
            hasTestResults = true;
            setTestResults({
              passed: false,
              output: `❌ Tests failed:\n\n${testOutput}`,
            });
          }
        } else if (msg.type === 'action' && msg.action === 'show-error') {
          hasTestResults = true;
          setTestResults({
            passed: false,
            output: `❌ Compilation error:\n\n${msg.message}`,
          });
        }
      });

      dispatch({ type: 'refresh' });

      setTimeout(() => {
        unsubscribe();
        setIsRunningTests(false);

        console.log('Debug: Full test output:', testOutput); // Add debugging

        if (!hasTestResults && testOutput.trim()) {
          // Enhanced error handling with actual output shown
          setTestResults({
            passed: false,
            output: `❌ Test execution completed but results unclear:\\n\\nActual output:\\n${testOutput}\\n\\nExpected patterns: ✓, PASS, passing, passed, ✗, FAIL, failing, failed`,
          });
        } else if (!hasTestResults) {
          setTestResults({
            passed: false,
            output: `❌ No test output received. Please check your implementation and try again.\\n\\nThis may indicate:\\n- Syntax errors in your code\\n- Test framework not running properly\\n- Network issues with Sandpack`,
          });
        }
      }, 8000);
    } catch (error) {
      setTestResults({
        passed: false,
        output: `❌ Test execution error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
      setIsRunningTests(false);
    }
  }, [
    sandpack,
    dispatch,
    listen,
    onTestPass,
    exercise.starterCode,
    extractFunctionName,
  ]);

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={runTests}
          disabled={isRunningTests}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200"
        >
          {isRunningTests ? 'Running Tests...' : 'Run Tests'}
        </button>
      </div>

      {isRunningTests && (
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center z-20 rounded-lg">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-gray-700 dark:text-gray-300">
              Running tests...
            </span>
          </div>
        </div>
      )}

      {testResults && (
        <div className="absolute top-16 right-4 z-10 max-w-md">
          <div
            className={`rounded-lg shadow-lg p-3 ${
              testResults.passed
                ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800'
                : 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'
            }`}
          >
            <div
              className={`text-sm font-medium mb-1 ${
                testResults.passed
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-red-800 dark:text-red-200'
              }`}
            >
              {testResults.passed ? '✅ Tests Passed' : '❌ Tests Failed'}
            </div>
            <div
              className={`text-xs ${
                testResults.passed
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-red-700 dark:text-red-300'
              }`}
            >
              {testResults.output.split('\n')[0]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SandpackEditor({ exercise, onTestPass }: SandpackEditorProps) {
  const extractFunctionName = useCallback((starterCode: string): string => {
    const functionMatch = starterCode.match(/const\s+(\w+)\s*=/);
    return functionMatch ? functionMatch[1] : 'unknownFunction';
  }, []);

  const createTestFile = () => {
    const functionName = extractFunctionName(exercise.starterCode);
    console.log(exercise.testCases);

    if (exercise.testCases && exercise.testCases.length > 0) {
      const testCaseCode = exercise.testCases
        .filter((tc) => tc.type === 'describe' || tc.type === 'it')
        .map((tc) => tc.code)
        .join('\n\n');

      const testCode = `${exercise.imports.join('\n')}

import { ${functionName} } from './exercise';

${testCaseCode}
`;
      return testCode;
    }

    return `${exercise.imports.join('\n')}

import { ${functionName} } from './exercise';

describe('${exercise.title}', () => {
  it('should implement the function correctly', () => {
    expect(typeof ${functionName}).toBe('function');
  });
});
`;
  };

  const functionName = extractFunctionName(exercise.starterCode);

  const files = {
    '/exercise.ts': {
      code: `${exercise.imports.join('\n')}

${exercise.starterCode}

export { ${functionName} };`,
      active: true,
    },
    '/exercise.test.ts': {
      code: createTestFile(),
    },
    '/package.json': {
      code: JSON.stringify(
        {
          dependencies: {
            'fp-ts': '^2.16.9',
            vitest: '^1.6.0',
            '@vitest/browser': '^1.6.0',
          },
          scripts: {
            test: 'vitest run --reporter=verbose',
          },
        },
        null,
        2
      ),
    },
    '/vitest.config.ts': {
      code: `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});`,
    },
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex-1 flex flex-col">
        <SandpackProvider
          template="react"
          theme={githubLight}
          files={files}
          options={{
            activeFile: '/exercise.ts',
          }}
          customSetup={{
            dependencies: {
              'fp-ts': '^2.16.9',
              vitest: '^1.6.0',
              '@vitest/browser': '^1.6.0',
              typescript: '^5.0.0',
            },
          }}
        >
          <SandpackLayout className="flex-1 flex flex-col">
            <div className="relative flex-1 min-h-[600px] max-h-[80vh]">
              <SandpackCodeEditor
                showTabs={true}
                showLineNumbers={true}
                showInlineErrors={true}
                wrapContent={true}
                closableTabs={false}
                className="h-full"
              />
              <TestRunner exercise={exercise} onTestPass={onTestPass} />
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}
