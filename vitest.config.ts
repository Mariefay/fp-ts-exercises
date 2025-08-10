import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec,exercise,solution}.{js,ts}'],
    exclude: ['node_modules', 'dist'],
    reporter: ['verbose'],
    typecheck: {
      checker: 'tsc',
      include: ['src/**/*.{test,spec,exercise,solution}.{ts}'],
    },
  },
})
