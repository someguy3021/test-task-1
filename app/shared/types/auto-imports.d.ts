// Global imports for composables and utilities
declare global {
  // Composables
  const useUserValidation: typeof import('~/shared/utils/validation')['useUserValidation']
  const useUsersStore: typeof import('~/stores/users')['useUsersStore']

  // Nuxt imports
  const useRouter: typeof import('#app')['useRouter']
  const navigateTo: typeof import('#app')['navigateTo']
  const definePageMeta: typeof import('#app')['definePageMeta']
}

export {}