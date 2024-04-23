import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	let url = request.nextUrl.clone()
	const base = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
	const OpenAIUrl = new URL(base)
	const requestHeaders = new Headers(request.headers)

	requestHeaders.set('Host', OpenAIUrl.host)
	const requestAuthorization = request.headers.get('Authorization')
	requestHeaders.set(
		'Authorization',
		requestAuthorization?.replace('Bearer', '')
			? requestAuthorization
			: `Bearer ${process.env.OPENAI_API_KEY}`
	)

	url.protocol = 'https'
	url.hostname = OpenAIUrl.hostname
	url.port = '443'
	url.pathname = request.nextUrl.pathname

	return NextResponse.rewrite(url, {
		headers: requestHeaders,
	})
}

export const config = {
	matcher: '/v1/:path*',
}
