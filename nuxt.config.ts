export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode'
  ],
  css: [
    '~/assets/css/main.css'
  ],
  compatibilityDate: '2024-12-03',
  routeRules: {
    '/': { redirect: '/dashboard' },
    '/login': { public: true },
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  colorMode: {
    classSuffix: '',
    preference: 'system', // default theme
    fallback: 'light',    // fallback theme
  },
  router: {
    routes: [
      {
        name: 'seguradoras',
        path: '/seguradoras',
        component: '~/pages/seguradoras.vue'
      },
      {
        name: 'seguradora-nova',
        path: '/seguradoras/nova',
        component: '~/pages/seguradoras/[id].vue'
      },
      {
        name: 'seguradora-editar',
        path: '/seguradoras/:id',
        component: '~/pages/seguradoras/[id].vue'
      }
    ]
  }
})