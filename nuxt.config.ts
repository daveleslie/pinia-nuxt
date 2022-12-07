// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Playfair+Display&display=swap'
        }
      ]
    }
  }
})
