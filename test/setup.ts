import { vi } from 'vitest'

// Базовые моки
vi.stubGlobal('definePageMeta', vi.fn())
vi.stubGlobal('useRouter', () => ({ push: vi.fn() }))
vi.stubGlobal('navigateTo', vi.fn())