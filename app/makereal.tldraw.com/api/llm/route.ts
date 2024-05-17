import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const baseURL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
		const body = await req.json()
		const authorization = req.headers.get('Authorization')
		const response = await fetch(`${baseURL}/chat/completions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authorization ?? `Bearer ${process.env.OPENAI_API_KEY}`,
			},
			body: JSON.stringify(body),
		}).then((r) => r.json())

		return Response.json(response)
	} catch (e) {
		return Response.json({ message: `Something went wrong: ${e.message}` })
	}
}
