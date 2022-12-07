import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

const config = useRuntimeConfig()

export default NuxtAuthHandler({
	secret: config.NUXT_SECRET,
	providers: [
		// @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
		CredentialsProvider.default({
			// The name to display on the sign-in form (e.g. 'Sign-in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign-in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: '(hint: jsmith)'
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: '(hint: hunter2)'
				}
			},
			async authorize(credentials: any) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
				const user = {
					id: '1',
					name: 'J Smith',
					username: 'test@test.com',
					password: 'testpassword'
				}

        // check for user
        const dbUser:any[] = await $fetch('http://localhost:4000/users')
        const validUser = dbUser.find(u => u.username === credentials.username)
        if (!validUser) {
          console.error('No user with that email found')
          console.log('User: ', validUser)
          console.log('Credentials: ', credentials)
          return null
        }

				if (credentials?.password === validUser.password) {
					// Any object returned will be saved in `user` property of the JWT
					console.log(validUser)
					return validUser
				} else {
					// eslint-disable-next-line no-console
					console.error(
						'Warning: Malicious login attempt registered, bad credentials provided'
					)
          console.error('Credentials: ', credentials)
					// If you return null then an error will be displayed advising the user to check their details.
					return null
					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			}
		})
	]
})
