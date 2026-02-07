'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import type * as Monaco from 'monaco-editor'
import { registerMonacoLibs } from '@/utils/monaco-type-definitions'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50">
      <div className="text-4xl mb-4">💻</div>
      <div className="text-gray-600 font-medium">Loading editor...</div>
      <div className="text-sm text-gray-500 mt-2">
        Preparing Monaco Editor with TypeScript support
      </div>
    </div>
  ),
})

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  fileName?: string
}

export function CodeEditor({ code, onChange, fileName }: CodeEditorProps) {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount = (
    editor: Monaco.editor.IStandaloneCodeEditor,
    monaco: typeof Monaco
  ) => {
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

    // Register fp-ts and Vitest type definitions for IntelliSense
    registerMonacoLibs(monaco)

    // Focus the editor
    editor.focus()
  }

  const handleChange = (value: string | undefined) => {
    onChange(value || '')
  }

  return (
    <div
      className="h-full"
      role="region"
      aria-label={`Code editor for ${fileName || 'exercise'}`}
    >
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
