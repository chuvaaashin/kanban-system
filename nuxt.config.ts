export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.svg' },
      ]
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/tailwindcss',
    [
        '@nuxtjs/google-fonts',
      {
        families: {
          Lato: {
            wght: [300, 400, 700],
            ital: [300],

          }
        }
      }
    ],
    '@nuxt/icon',
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./store/**'],
  },
  compatibilityDate: '2025-04-25',
})