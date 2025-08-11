'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-purple-100">
      <div className="text-purple-600">Loading editor...</div>
    </div>
  ),
})

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  fileName: string
}

export function CodeEditor({ code, onChange, fileName }: CodeEditorProps) {
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor

    // Configure Monaco for TypeScript
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      allowNonTsExtensions: true,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      allowSyntheticDefaultImports: true,
    })

    // Add fp-ts type definitions (simplified for demo)
    const optionTypes = `
      declare module 'fp-ts/Option' {
        export interface None {
          readonly _tag: 'None'
        }
        export interface Some<A> {
          readonly _tag: 'Some'
          readonly value: A
        }
        export type Option<A> = None | Some<A>
        export const none: Option<never>
        export function some<A>(a: A): Option<A>
        export function of<A>(a: A): Option<A>
        export function fromNullable<A>(a: A | null | undefined): Option<A>
        export function fromPredicate<A>(predicate: (a: A) => boolean): (a: A) => Option<A>
        export function fold<A, B>(onNone: () => B, onSome: (a: A) => B): (ma: Option<A>) => B
        export function getOrElse<A>(onNone: () => A): (ma: Option<A>) => A
        export function filter<A>(predicate: (a: A) => boolean): (ma: Option<A>) => Option<A>
        export function map<A, B>(f: (a: A) => B): (ma: Option<A>) => Option<B>
        export function chain<A, B>(f: (a: A) => Option<B>): (ma: Option<A>) => Option<B>
        export function isSome<A>(ma: Option<A>): ma is Some<A>
        export function isNone<A>(ma: Option<A>): ma is None
        export function toNullable<A>(ma: Option<A>): A | null
        export function toUndefined<A>(ma: Option<A>): A | undefined
      }

      declare module 'fp-ts/function' {
        export function pipe<A>(a: A): A
        export function pipe<A, B>(a: A, ab: (a: A) => B): B
        export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
        export function pipe<A, B, C, D>(
          a: A,
          ab: (a: A) => B,
          bc: (b: B) => C,
          cd: (c: C) => D
        ): D
        export function pipe<A, B, C, D, E>(
          a: A,
          ab: (a: A) => B,
          bc: (b: B) => C,
          cd: (c: C) => D,
          de: (d: D) => E
        ): E
        export function flow<A extends ReadonlyArray<unknown>, B>(
          ab: (...a: A) => B
        ): (...a: A) => B
        export function flow<A extends ReadonlyArray<unknown>, B, C>(
          ab: (...a: A) => B,
          bc: (b: B) => C
        ): (...a: A) => C
      }
    `

    const vitestTypes = `
      declare module 'vitest' {
        export function describe(name: string, fn: () => void): void
        export function it(name: string, fn: () => void): void
        export const expect: {
          (actual: any): {
            toEqual(expected: any): void
            toBe(expected: any): void
            toBeUndefined(): void
            toBeNull(): void
            toBeTruthy(): void
            toBeFalsy(): void
          }
        }
      }
    `

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      optionTypes,
      'file:///node_modules/@types/fp-ts-option.d.ts'
    )

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      vitestTypes,
      'file:///node_modules/@types/vitest.d.ts'
    )

    // Focus the editor
    editor.focus()
  }

  const handleChange = (value: string | undefined) => {
    onChange(value || '')
  }

  return (
    <div className="h-full">
      <MonacoEditor
        height="100%"
        language="typescript"
        value={code}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        options={{
          theme: 'vs-light',
          fontSize: 14,
          fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
          lineNumbers: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          contextmenu: false,
          renderWhitespace: 'none',
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          glyphMargin: false,
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  )
}
