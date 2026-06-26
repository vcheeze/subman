import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useState } from 'react'

import { AuthPageLogo, AuthPageShell } from '@/components/auth-page-shell'
import { InviteLinkPanel } from '@/components/invite-link-panel'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { toastManager } from '@/components/ui/toast'
import { authClient } from '@/lib/auth-client'
import { householdSlug } from '@/lib/org'
import { fetchUserSubscriptionCount } from '@/queries/subscriptions'

export const Route = createFileRoute('/_authed/onboarding')({
	beforeLoad: async () => {
		const { count } = await fetchUserSubscriptionCount()
		if (count > 0) {
			throw redirect({ to: '/app' })
		}
	},
	component: OnboardingPage,
})

function OnboardingPage() {
	const navigate = Route.useNavigate()
	const [householdName, setHouseholdName] = useState('')
	const [partnerEmail, setPartnerEmail] = useState('')
	const [isCreatingHousehold, setIsCreatingHousehold] = useState(false)
	const [showHouseholdForm, setShowHouseholdForm] = useState(false)
	const [createdInvite, setCreatedInvite] = useState<{
		email: string
		invitationId: string
		householdName: string
	} | null>(null)

	const handleContinueSolo = () => {
		navigate({ to: '/subs/add' })
	}

	const handleCreateHousehold = async () => {
		const name = householdName.trim()
		if (!name) {
			toastManager.add({
				title: 'Name your household',
				description: 'Something like “Our household” or “The Chen family”.',
				type: 'error',
			})
			return
		}

		setIsCreatingHousehold(true)
		try {
			const { data: org, error } = await authClient.organization.create({
				name,
				slug: householdSlug(name),
				metadata: { type: 'household' },
			})

			if (error || !org?.id) {
				throw new Error(error?.message ?? 'Could not create household')
			}

			const { error: activeError } = await authClient.organization.setActive({
				organizationId: org.id,
			})

			if (activeError) {
				throw new Error(activeError.message)
			}

			const email = partnerEmail.trim().toLowerCase()
			if (email) {
				const { data: invite, error: inviteError } =
					await authClient.organization.inviteMember({
						email,
						role: 'member',
						organizationId: org.id,
					})

				if (inviteError || !invite?.id) {
					toastManager.add({
						title: 'Household created',
						description:
							'We could not create the invite yet. You can invite from Settings.',
						type: 'warning',
					})
					navigate({ to: '/app' })
					return
				}

				setCreatedInvite({
					email,
					invitationId: invite.id,
					householdName: name,
				})
				return
			}

			toastManager.add({
				title: 'Household ready',
				description: 'You can invite someone anytime from Settings.',
				type: 'success',
			})
			navigate({ to: '/app' })
		} catch (error) {
			toastManager.add({
				title: 'Could not create household',
				description:
					error instanceof Error
						? error.message
						: 'Please try again in a moment.',
				type: 'error',
			})
		} finally {
			setIsCreatingHousehold(false)
		}
	}

	if (createdInvite) {
		return (
			<div className='font-sans'>
			<AuthPageShell>
				<div className='flex w-full flex-col items-center'>
					<AuthPageLogo />

					<header className='mb-6 w-full text-center'>
						<h1 className='mb-2 font-serif text-2xl text-balance lg:text-3xl'>
							<span className='text-foreground'>
								{createdInvite.householdName}
							</span>{' '}
							is ready
						</h1>
						<p className='mx-auto max-w-sm text-muted-foreground text-sm leading-relaxed text-pretty'>
							One last step — send the invite link to your person. They&apos;ll
							join the same subscription list once they accept.
						</p>
					</header>

					<section className='w-full space-y-4 border-border border-t pt-8'>
						<InviteLinkPanel
							email={createdInvite.email}
							invitationId={createdInvite.invitationId}
							title='Copy their invite link'
						/>

						<Button
							className='w-full'
							onClick={() => navigate({ to: '/app' })}
							size='lg'
						>
							Go to your subscriptions
						</Button>
						<p className='text-center text-muted-foreground text-xs'>
							You can always copy this link again from Settings.
						</p>
					</section>
				</div>
			</AuthPageShell>
			</div>
		)
	}

	return (
		<div className='font-sans'>
		<AuthPageShell>
			<div className='flex w-full flex-col items-center'>
				<AuthPageLogo />

				<header className='mb-6 w-full text-center'>
					<h1 className='mb-2 font-serif text-2xl text-balance lg:text-3xl'>
						Welcome to Subman
					</h1>
					<p className='mx-auto max-w-sm text-muted-foreground text-sm leading-relaxed text-pretty'>
						Track what you pay for and whether it still feels worth it. Most
						people start on their own — you can share a household with someone
						else whenever you&apos;re ready.
					</p>
				</header>

				<section className='w-full space-y-4 border-border border-t pt-8'>
					<div className='space-y-1 text-center'>
						<p className='font-medium text-sm'>Just for me</p>
						<p className='text-muted-foreground text-sm leading-relaxed text-pretty'>
							Your private list. Only you can see it unless you invite someone
							later.
						</p>
					</div>
					<Button className='w-full' onClick={handleContinueSolo} size='lg'>
						Add my first subscription
					</Button>
					<Button
						className='w-full'
						render={<Link to='/app' viewTransition />}
						variant='outline'
					>
						Skip for now
					</Button>
				</section>

				<section className='w-full space-y-4 border-border border-t pt-8'>
					<div className='space-y-1 text-center'>
						<p className='font-medium text-sm'>Share with someone</p>
						<p className='text-muted-foreground text-sm leading-relaxed text-pretty'>
							Create a household to track subscriptions together — Netflix, gym,
							utilities, whatever you split or share. Invites expire in 48
							hours.
						</p>
					</div>

					{showHouseholdForm ? (
						<>
							<Field>
								<FieldLabel htmlFor='household-name'>Household name</FieldLabel>
								<Input
									autoFocus
									id='household-name'
									onChange={(e) => setHouseholdName(e.target.value)}
									placeholder='Our household'
									value={householdName}
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor='partner-email'>
									Invite someone (optional)
								</FieldLabel>
								<Input
									id='partner-email'
									onChange={(e) => setPartnerEmail(e.target.value)}
									placeholder='partner@email.com'
									type='email'
									value={partnerEmail}
								/>
							</Field>
							<p className='text-muted-foreground text-xs leading-relaxed'>
								We&apos;ll give you a link to copy — no need to wait for
								email.
							</p>
							<Button
								className='w-full'
								disabled={isCreatingHousehold}
								onClick={handleCreateHousehold}
								size='lg'
								variant='outline'
							>
								{isCreatingHousehold && <Spinner className='size-4' />}
								Create household
							</Button>
							<Button
								className='w-full'
								onClick={() => {
									setShowHouseholdForm(false)
									setHouseholdName('')
									setPartnerEmail('')
								}}
								variant='ghost'
							>
								Back
							</Button>
						</>
					) : (
						<Button
							className='w-full'
							onClick={() => setShowHouseholdForm(true)}
							size='lg'
							variant='outline'
						>
							Set up a household
						</Button>
					)}
				</section>
			</div>
		</AuthPageShell>
		</div>
	)
}
