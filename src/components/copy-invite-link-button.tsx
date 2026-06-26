import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { buildInvitationUrlClient } from '@/lib/org'
import { fetchInvitationUrl } from '@/queries/invitations'

type CopyInviteLinkButtonProps = {
	invitationId: string
	email: string
}

export function CopyInviteLinkButton({
	invitationId,
	email,
}: CopyInviteLinkButtonProps) {
	const [copied, setCopied] = useState(false)
	const [url, setUrl] = useState('')

	useEffect(() => {
		let cancelled = false

		async function resolveUrl() {
			try {
				const { url: resolvedUrl } = await fetchInvitationUrl({
					data: { invitationId },
				})
				if (!cancelled) {
					setUrl(resolvedUrl)
				}
			} catch {
				if (!cancelled) {
					setUrl(buildInvitationUrlClient(invitationId))
				}
			}
		}

		resolveUrl()

		return () => {
			cancelled = true
		}
	}, [invitationId])

	useEffect(() => {
		if (!copied) return

		const timer = window.setTimeout(() => setCopied(false), 2000)
		return () => window.clearTimeout(timer)
	}, [copied])

	async function handleCopy() {
		if (!url) return

		try {
			await navigator.clipboard.writeText(url)
			setCopied(true)
		} catch {
			setCopied(true)
		}
	}

	return (
		<Button
			aria-label={
				copied ? `Copied invite link for ${email}` : `Copy invite link for ${email}`
			}
			disabled={!url}
			onClick={handleCopy}
			size='sm'
			variant='outline'
		>
			{copied ? (
				<>
					<IconCheck className='size-3.5' />
					Copied
				</>
			) : (
				<>
					<IconCopy className='size-3.5' />
					Copy link
				</>
			)}
		</Button>
	)
}
