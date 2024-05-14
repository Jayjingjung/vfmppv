import colors from 'vuetify/es5/util/colors'

export default {
  router: {
    base: '/'
  },
  target: 'static',
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'VFMPP',
    title: 'VFMPP',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/VFMPP.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@assets/font/style.css', '@mdi/font/css/materialdesignicons.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  components: true,

  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', { treeShake: true },'@nuxtjs/moment'],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'nuxt-sweetalert2',
    ['@nuxtjs/toast', {
      position: 'top-center',
      duration: 4000,
      keepOnHover: true,
      iconPack: 'mdi',
      action: {
        icon: 'mdi-close',
        onClick: (e, toastObject) => {
          toastObject.goAway(0)
        },
      },
    },]
  ],

  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/api-prod/v1/truck/',
    
    baseURL: 'https://octopus-app-n476x.ondigitalocean.app/',


    // baseURL: 'https://trackingapp-qupd.onrender.com/',
  },
  server:{
    port:'3200'
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    font: {
      family: 'Noto Sans Lao UI'
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
