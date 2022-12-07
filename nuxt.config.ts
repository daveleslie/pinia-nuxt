// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@sidebase/nuxt-auth'],
	runtimeConfig: {
		// The private keys which are only available server-side
		NUXT_SECRET: process.env.NUXT_SECRET
	},
	// @ts-ignore
	auth: {
		// The module is enabled. Change this to disable the module
		isEnabled: true,
		// The origin is set to the development origin. Change this when deploying to production
		origin: 'http://localhost:3000',
		// The base path to the authentication endpoints. Change this if you want to add your auth-endpoints at a non-default location
		basePath: '/api/auth',
		// Whether to periodically refresh the session. Change this to `true` for a refresh every seconds or set this to a number like `5000` for a refresh every 5000 milliseconds (aka: 5 seconds)
		enableSessionRefreshPeriodically: false,
		// Whether to refresh the session whenever a window focus event happens, i.e, when your user refocuses the window. Set this to `false` to turn this off
		enableSessionRefreshOnWindowFocus: true,
		// Whether to add a global authentication middleware that will protect all pages without exclusion
		enableGlobalAppMiddleware: true
	},
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
