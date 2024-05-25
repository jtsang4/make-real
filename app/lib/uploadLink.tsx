'use server'

import { db } from '../db'

export async function uploadLink(shapeId: string, html: string) {
	if (typeof shapeId !== 'string' || !shapeId.startsWith('shape:')) {
		throw new Error('shapeId must be a string starting with shape:')
	}
	if (typeof html !== 'string') {
		throw new Error('html must be a string')
	}

	shapeId = shapeId.replace(/^shape:/, '')
	await db.links.create({
		data: {
			shapeId: shapeId,
			html,
		},
	})
}
