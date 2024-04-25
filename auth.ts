import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {
					type: 'password',
				},
			},
			authorize: async (credentials) => {
				const { email, password } = credentials
				if (email !== process.env.USER_EMAIL || password !== process.env.USER_PASSWORD) {
					// No user found, so this is their first attempt to login
					// meaning this is also the place you could do registration
					throw new Error('User not found.')
				}

				// return user object with the their profile data
				return {
					id: '1',
					email: email as string,
				}
			},
		}),
	],
})
