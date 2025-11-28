import { defineVitestConfig } from '@nuxt/test-utils/config'

// vitest.config.ts
export default defineVitestConfig({
  test: {
    environment: 'jsdom', // вместо 'nuxt'
    setupFiles: ['./test/setup.ts'],
    globals: true,
  },
})