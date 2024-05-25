import { getServerSession, type AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'username' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				const user = { id: '1', name: 'Admin' } // Example user
				if (credentials.username === 'admin' && credentials.password === 'admin') {
					return Promise.resolve(user)
				} else {
					return Promise.reject(new Error('Invalid username or password'))
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	jwt: {
		maxAge: 60 * 60 * 24 * 30, // 30 days
	},
}

export const getServerAuthSession = () => getServerSession(authOptions)
