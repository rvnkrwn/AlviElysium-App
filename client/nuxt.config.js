export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  publicRuntimeConfig: {
    appName: 'AlviElysium',
  },
  head: {
    title: 'AlviElysium - kembangin dan tulis cerita dengan bakatmu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Platform digital yang dirancang untuk menciptakan pengalaman membaca yang mendalam, menginspirasi, dan memikat.',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'Content-Security-Policy', content: "script-src 'self'" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin', // Jika Anda ingin menambahkan atribut crossorigin
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/axios.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  sitemap: {
    hostname: 'https://alvielysium.com',
    gzip: true,
    exclude: ['/profile/**'],

    // eslint-disable-next-line require-await
    routes: async () => {
      const dynamicRoutes = []
      for (let id = 1; id <= 3; id++) {
        dynamicRoutes.push({
          url: `/stories/${id}`,
          title: `Judul Halaman ${id}`,
          changefreq: 'daily',
          priority: 1,
          lastmod: '2023-10-11T07:51:48+00:00',
        })
      }
      const staticRoutes = ['/', '/login', '/register']
      return [...staticRoutes, ...dynamicRoutes]
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://revank.my.id',
    // baseURL: 'http://localhost:5001',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'id',
    },
  },
  loading: {
    color: 'black',
    height: '5px',
    continuous: true,
    duration: 3000,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    fallback: true,
  },

  router: {
    middleware: ['auth'],
  },
}
