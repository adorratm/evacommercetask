// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', 'nuxt-icon', '@nuxt/image', '@pinia/nuxt','@pinia-plugin-persistedstate/nuxt',],
  colorMode: {
    preference: 'light', // default theme
    fallback: 'light', // fallback theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: '',
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in' // default
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in' // default
    }
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      GRANT_TYPE: process.env.GRANT_TYPE,
      CLIENT_ID: process.env.CLIENT_ID,
      CLIENT_SECRET: process.env.CLIENT_SECRET,
      REDIRECT_URI: process.env.REDIRECT_URI,
      SCOPE: process.env.SCOPE,
    }
  }
})
