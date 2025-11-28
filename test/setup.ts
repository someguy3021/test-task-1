import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { vi } from 'vitest'

// Mock Nuxt composables
mockNuxtImport('useRouter', () => {
  return () => ({
    push: vi.fn(),
    back: vi.fn(),
    replace: vi.fn(),
  })
})

mockNuxtImport('navigateTo', () => vi.fn())
mockNuxtImport('definePageMeta', () => vi.fn())

// Mock Vuetify if needed
vi.stubGlobal('useNuxtApp', () => ({
  $vuetify: {
    theme: {
      current: {
        dark: false
      }
    }
  }
}))