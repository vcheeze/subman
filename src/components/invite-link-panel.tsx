import { IconCheck, IconCopy, IconLink } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
import { buildInvitationUrlClient } from '@/lib/org'
import { fetchInvitationUrl } from '@/queries/invitations'

type InviteLinkPanelProps = {
	email: string
	invitationId: string
	title?: string
	className?: string
}

export function InviteLinkPanel({
	email,
	invitationId,
	title = 'Share this invite link',
	className,
}: InviteLinkPanelProps) {
	const [url, setUrl] = useState('')
	const [isLoadingUrl, setIsLoadingUrl] = useState(true)
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		let cancelled = false

		async function resolveUrl() {
			setIsLoadingUrl(true)
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
			} finally {
				if (!cancelled) {
					setIsLoadingUrl(false)
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
			setCopied(false)
		}
	}

	return (
		<div
			className={`rounded-xl border border-border bg-accent/35 p-4 ${className ?? ''}`}
		>
			<div className='mb-3 flex items-start gap-2'>
				<IconLink aria-hidden className='mt-0.5 size-4 shrink-0 text-accent-foreground' />
				<div className='min-w-0 space-y-1'>
					<p className='font-medium text-sm'>{title}</p>
					<p className='text-muted-foreground text-sm leading-relaxed'>
						Send this to{' '}
						<span className='text-foreground'>{email}</span>. They&apos;ll need
						to sign in with that address to join. Link expires in 48 hours.
					</p>
				</div>
			</div>

			{isLoadingUrl ? (
				<div className='flex h-9 items-center justify-center rounded-lg border border-border bg-background/80'>
					<Spinner className='size-4' />
				</div>
			) : (
				<InputGroup className='h-auto bg-background/80'>
					<InputGroupInput
						className='font-mono text-xs'
						id={`invite-link-${invitationId}`}
						readOnly
						value={url}
					/>
					<InputGroupAddon align='inline-end'>
						<InputGroupButton
							aria-label={copied ? 'Link copied' : 'Copy invite link'}
							onClick={handleCopy}
							size='sm'
							variant={copied ? 'secondary' : 'default'}
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
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			)}
		</div>
	)
}
