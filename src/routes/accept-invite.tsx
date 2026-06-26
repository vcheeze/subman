import { useQueryClient } from '@tanstack/react-query'
import {
	createFileRoute,
	Link,
	redirect,
	useRouteContext,
	useRouter,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { AuthPageLogo, AuthPageShell } from '@/components/auth-page-shell'
import { InviteAuthPanel } from '@/components/invite-auth-panel'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { toastManager } from '@/components/ui/toast'
import { authClient } from '@/lib/auth-client'
import { invitationAcceptPath } from '@/lib/org'
import {
	fetchPublicInvitationPreview,
	type PublicInvitationPreview,
	type PublicInvitationPreviewError,
} from '@/queries/invitations'

export const Route = createFileRoute('/accept-invite')({
	validateSearch: (search) =>
		({
			invitationId: (search.invitationId as string) || '',
		}) as { invitationId: string },
	beforeLoad: ({ search }) => {
		if (!search.invitationId) {
			throw redirect({ to: '/app' })
		}
	},
	component: AcceptInvitePage,
})

const previewErrors: Record<PublicInvitationPreviewError, string> = {
	not_found: 'This invite is invalid or has already been used.',
	expired: 'This invite expired. Ask whoever invited you for a fresh link.',
	not_pending: 'This invite is no longer active.',
	inviter_gone:
		'The person who invited you is no longer in this household. Ask for a new invite.',
}

function InviteLoadingState() {
	return (
		<AuthPageShell>
			<div className='flex w-full flex-col items-center'>
				<Skeleton className='mb-2 size-16 rounded-lg' />
				<Skeleton className='mb-2 h-8 w-full max-w-xs' />
				<Skeleton className='mb-6 h-4 w-full max-w-sm' />
				<Skeleton className='mb-6 h-6 w-44' />
				<div className='w-full space-y-4 border-border border-t pt-8'>
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-11 w-full' />
				</div>
			</div>
		</AuthPageShell>
	)
}

function AcceptInvitePage() {
	const { invitationId } = Route.useSearch()
	const { user } = useRouteContext({ from: '__root__' })
	const navigate = Route.useNavigate()
	const router = useRouter()
	const queryClient = useQueryClient()
	const redirectTo = invitationAcceptPath(invitationId)

	const [preview, setPreview] = useState<PublicInvitationPreview | null>(null)
	const [loadError, setLoadError] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [isAccepting, setIsAccepting] = useState(false)
	const [isSigningOut, setIsSigningOut] = useState(false)

	useEffect(() => {
		let cancelled = false

		async function loadPreview() {
			setIsLoading(true)
			setLoadError('')

			const { preview: nextPreview, error } =
				await fetchPublicInvitationPreview({
					data: { invitationId },
				})

			if (cancelled) return

			if (error || !nextPreview) {
				setPreview(null)
				setLoadError(
					error ? previewErrors[error] : previewErrors.not_found,
				)
			} else {
				setPreview(nextPreview)
			}

			setIsLoading(false)
		}

		loadPreview()

		return () => {
			cancelled = true
		}
	}, [invitationId])

	const invitedEmail = preview?.email.toLowerCase() ?? ''
	const signedInEmail = user?.email.toLowerCase() ?? ''
	const isRecipient = Boolean(
		user && preview && signedInEmail === invitedEmail,
	)
	const isWrongAccount = Boolean(
		user && preview && signedInEmail !== invitedEmail,
	)

	const handleAccept = async () => {
		setIsAccepting(true)
		try {
			const { error } = await authClient.organization.acceptInvitation({
				invitationId,
			})

			if (error) {
				throw new Error(error.message)
			}

			toastManager.add({
				title: 'You joined the household',
				description: 'You can now see shared subscriptions.',
				type: 'success',
			})
			await queryClient.invalidateQueries()
			await router.invalidate()
			navigate({ to: '/app' })
		} catch (error) {
			toastManager.add({
				title: 'Could not accept invite',
				description:
					error instanceof Error
						? error.message
						: 'Please try again in a moment.',
				type: 'error',
			})
		} finally {
			setIsAccepting(false)
		}
	}

	const handleSignOut = async () => {
		setIsSigningOut(true)
		try {
			await authClient.signOut()
			await router.invalidate()
		} catch {
			toastManager.add({
				title: 'Could not sign out',
				description: 'Please try again.',
				type: 'error',
			})
		} finally {
			setIsSigningOut(false)
		}
	}

	if (isLoading) {
		return <InviteLoadingState />
	}

	if (loadError || !preview) {
		return (
			<AuthPageShell>
				<div className='w-full text-center'>
					<AuthPageLogo />
					<h1 className='mb-2 font-serif text-2xl text-balance lg:text-3xl'>
						Invite not available
					</h1>
					<p className='mb-6 text-muted-foreground text-sm leading-relaxed text-pretty'>
						{loadError}
					</p>
					<Button
						className='w-full'
						render={<Link to='/app' viewTransition />}
						size='lg'
					>
						Go to Subman
					</Button>
				</div>
			</AuthPageShell>
		)
	}

	const inviterLabel =
		preview.inviterName.trim() || preview.inviterEmail.split('@')[0]

	const subline = isRecipient
		? 'Accept to see the same subscriptions as everyone in this household.'
		: 'One shared list for the household. Sign in below to join — link expires in 48 hours.'

	return (
		<AuthPageShell>
			<div className='flex w-full flex-col items-center'>
				<AuthPageLogo />

				<header className='mb-6 w-full text-center'>
					<h1 className='mb-2 font-serif text-2xl text-balance lg:text-3xl'>
						<span className='text-foreground'>{inviterLabel}</span> invited you
						to{' '}
						<span className='text-foreground'>{preview.organizationName}</span>
					</h1>
					<p className='mx-auto max-w-sm text-muted-foreground text-sm leading-relaxed text-pretty'>
						{subline}
					</p>
					{!isRecipient && (
						<div className='mt-4 flex justify-center px-1'>
							<Badge
								aria-label={`Invitation for ${preview.email}`}
								className='max-w-full truncate font-normal'
								title={preview.email}
								variant='outline'
							>
								{preview.email}
							</Badge>
						</div>
					)}
				</header>

				<section className='w-full space-y-4 border-border border-t pt-8'>
					{isWrongAccount && (
						<Alert variant='warning'>
							<AlertTitle>Signed in as someone else</AlertTitle>
							<AlertDescription>
								You&apos;re signed in as{' '}
								<span className='text-foreground'>{user?.email}</span>, but
								this invite is for{' '}
								<span className='text-foreground'>{preview.email}</span>.
								Sign out to continue with the right account.
							</AlertDescription>
						</Alert>
					)}

					{isRecipient ? (
						<>
							<p className='text-center text-muted-foreground text-sm'>
								Signed in as{' '}
								<span className='text-foreground'>{preview.email}</span>
							</p>
							<Button
								className='w-full'
								disabled={isAccepting}
								onClick={handleAccept}
								size='lg'
							>
								{isAccepting && <Spinner className='size-4' />}
								Accept invite
							</Button>
							<Button
								className='w-full'
								render={<Link to='/app' viewTransition />}
								variant='outline'
							>
								Not now
							</Button>
						</>
					) : isWrongAccount ? (
						<Button
							className='w-full'
							disabled={isSigningOut}
							onClick={handleSignOut}
							size='lg'
						>
							{isSigningOut && <Spinner className='size-4' />}
							Sign out and continue
						</Button>
					) : (
						<InviteAuthPanel email={preview.email} redirectTo={redirectTo} />
					)}
				</section>
			</div>
		</AuthPageShell>
	)
}
