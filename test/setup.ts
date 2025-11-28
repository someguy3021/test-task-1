import { mockNuxtImport } from '@nuxt/test-utils/runtime'

// Мокаем Nuxt композаблы
mockNuxtImport('useRouter', () => {
  return () => ({
    push: vi.fn(),
    back: vi.fn(),
    replace: vi.fn(),
  })
})

mockNuxtImport('navigateTo', () => vi.fn())
mockNuxtImport('definePageMeta', () => vi.fn())