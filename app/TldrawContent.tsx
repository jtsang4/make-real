'use client'

import dynamic from 'next/dynamic'
import { useSession, signIn, signOut } from 'next-auth/react'
import '@tldraw/tldraw/tldraw.css'
import { TldrawLogo } from './components/TldrawLogo'
import { MakeRealButton } from './components/MakeRealButton'
import { RiskyButCoolAPIKeyInput } from './components/RiskyButCoolAPIKeyInput'
import { PreviewShapeUtil } from './PreviewShape/PreviewShape'

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})

const shapeUtils = [PreviewShapeUtil]

export default function TldrawContent() {
	return (
		<Tldraw persistenceKey="make-real" shareZone={<MakeRealButton />} shapeUtils={shapeUtils}>
			<TldrawLogo />
			<RiskyButCoolAPIKeyInput />
		</Tldraw>
	)
}
