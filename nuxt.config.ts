export default defineNuxtConfig({
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
  ],
  css: ['~/assets/css/main.css'],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  },
  compatibilityDate: '2025-04-25',
})