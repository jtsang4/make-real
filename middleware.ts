import { NextRequest, NextResponse } from 'next/server'
import { decrypt, getSession, setSession } from './app/actions/auth'
import { LINK_HOST } from './app/lib/hosts'

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _vercel (Vercel internals)
		 * - _next (next internals)
		 * - some-file.extension (static files)
		 */
		'/((?!_vercel|_next/|[\\w-]+\\.\\w+).*)',
	],
}

export async function middleware(req: NextRequest) {
	const session = await getSession()
	const url = req.nextUrl
	const host = req.headers.get('host').toLowerCase()
	const rewrittenUrl = new URL(url.toString())

	// rewrite requests on the link host to the link site:
	if (host === LINK_HOST) {
		rewrittenUrl.pathname = `/makereal.tldraw.link${rewrittenUrl.pathname}`
		return NextResponse.rewrite(rewrittenUrl)
	}
	const userData = await decrypt(session)

	if (!userData) {
		rewrittenUrl.pathname = '/makereal.tldraw.com/login'
		return NextResponse.rewrite(rewrittenUrl)
	}

	if (url.pathname.startsWith('/login')) {
		rewrittenUrl.pathname = `/makereal.tldraw.com/`
		const response = NextResponse.rewrite(rewrittenUrl)
		return response
	}
	// rewrite everything else to the main site:
	rewrittenUrl.pathname = `/makereal.tldraw.com${rewrittenUrl.pathname}`
	const response = NextResponse.rewrite(rewrittenUrl)
	await setSession(response.cookies, userData, userData?.remember === 'on')

	return response
}
