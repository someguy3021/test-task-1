// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'vuetify-nuxt-module'
  ],
  
  // CSS конфигурация
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  
  // Build конфигурация
  build: {
    transpile: ['vuetify']
  },
  
  // Vite конфигурация
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },
  
  // Дополнительные настройки для TypeScript
  typescript: {
    typeCheck: true
  }
})