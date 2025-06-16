import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec,exercise,solution}.{js,ts}'],
    watch: true,
    reporters: ['verbose']
  }
})
