'use server'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextResponse } from 'next/server'
import { z } from 'zod'
import { SESSION_NAME } from '../constants/auth'

const SESSION_SECRET = process.env.AUTH_SECRET || 'secret-key-make-real'
const SESSION_KEY = new TextEncoder().encode(SESSION_SECRET)

export async function encrypt(payload, remember = false) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(remember ? '30d' : '2h')
		.sign(SESSION_KEY)
}

export async function decrypt(token: string) {
	try {
		const { payload } = await jwtVerify(token, SESSION_KEY, {
			algorithms: ['HS256'],
		})
		return payload
	} catch (e) {
		return
	}
}

export async function getSession() {
	const session = cookies().get(SESSION_NAME)?.value
	return session
}

export async function setSession(
	c: ReturnType<typeof cookies> | NextResponse['cookies'],
	payload: any,
	remember = false
) {
	const token = await encrypt(payload)
	c.set(SESSION_NAME, token, {
		path: '/',
		sameSite: 'lax',
		maxAge: remember ? 60 * 60 * 24 * 30 : undefined,
		httpOnly: true,
	})
}

const User = z
	.object({
		username: z.string(),
		password: z.string().min(8),
		remember: z.union([z.literal('on'), z.undefined()]),
	})
	.refine(
		(data) => data.username === process.env.USERNAME && data.password === process.env.PASSWORD,
		{
			message: 'Invalid username or password',
			path: ['password'],
		}
	)

export type UserParseError = z.ZodError<z.infer<typeof User>>

export async function login(prevState: any, formData: FormData) {
	const userData = Object.fromEntries(formData.entries())
	const result = User.safeParse(userData)
	if (!result.success) {
		return {
			error: {
				name: result.error.errors[0].path[0].toString(),
				message: result.error.errors[0].message,
			},
		}
	}
	const user = result.data
	await setSession(cookies(), result.data, user.remember === 'on')
	redirect('/')
}
