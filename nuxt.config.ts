// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  srcDir: 'app/',
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'vuetify-nuxt-module'
  ],

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  build: {
    transpile: ['vuetify']
  },

  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/features',
      pathPrefix: false,
      prefix: ''
    },
    { path: '~/entities', 
      pathPrefix: false 
    }
  ],

  typescript: {
    typeCheck: true
  },

  imports: {
    dirs: [
      'stores',
      'composables',
      'utils'
    ]
  }
})