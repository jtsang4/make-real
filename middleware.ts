import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { auth } from '@/auth'

export const middleware = auth((request: NextRequest & { auth: any }) => {
	const url = request.nextUrl.clone()
	if (!request.auth) {
		const callbackUrl = url.toString()
		url.pathname = '/api/auth/signin'
		url.searchParams.set('callbackUrl', callbackUrl)
		return NextResponse.redirect(url)
	}
	if (!url.pathname.startsWith('/v1')) {
		return NextResponse.next()
	}
	const base = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
	const openAIUrl = new URL(base)
	const requestHeaders = new Headers(request.headers)

	requestHeaders.set('Host', openAIUrl.host)
	const requestAuthorization = request.headers.get('Authorization')
	requestHeaders.set(
		'Authorization',
		requestAuthorization?.replace('Bearer', '')
			? requestAuthorization
			: `Bearer ${process.env.OPENAI_API_KEY}`
	)

	url.protocol = openAIUrl.protocol
	url.hostname = openAIUrl.hostname
	url.port = openAIUrl.port
	url.pathname = request.nextUrl.pathname

	return NextResponse.rewrite(url, {
		headers: requestHeaders,
	})
})

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|login|favicon.ico).*)'],
}
