import { IconSettings, IconTrash, IconUserPlus } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link, useRouteContext, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { CopyInviteLinkButton } from '@/components/copy-invite-link-button'
import { InviteLinkPanel } from '@/components/invite-link-panel'
import { OrgSwitcher } from '@/components/org-switcher'
import { Badge } from '@/components/ui/badge'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { toastManager } from '@/components/ui/toast'
import { authClient } from '@/lib/auth-client'
import {
	householdSlug,
	isHouseholdOrg,
	isPersonalOrgId,
	orgDisplayName,
} from '@/lib/org'

export const Route = createFileRoute('/_authed/settings')({
	component: Settings,
})

type MemberRow = {
	id: string
	userId: string
	role: string
	user: {
		name: string
		email: string
	}
}

type InvitationRow = {
	id: string
	email: string
	role: string
	status: string
}

type ActiveOrganization = {
	id: string
	name: string
	metadata?: string | null
	members?: MemberRow[]
	invitations?: InvitationRow[]
}

function Settings() {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { user, activeOrganizationId } = useRouteContext({ from: '__root__' })
	const [activeOrg, setActiveOrg] = useState<ActiveOrganization | null>(null)
	const [isLoadingOrg, setIsLoadingOrg] = useState(true)
	const [householdName, setHouseholdName] = useState('')
	const [inviteEmail, setInviteEmail] = useState('')
	const [isCreatingHousehold, setIsCreatingHousehold] = useState(false)
	const [isInviting, setIsInviting] = useState(false)
	const [removingMemberId, setRemovingMemberId] = useState<string | null>(null)
	const [createdInvite, setCreatedInvite] = useState<{
		email: string
		invitationId: string
	} | null>(null)

	const resolvedOrgId = activeOrganizationId ?? ''
	const isPersonal = isPersonalOrgId(resolvedOrgId)
	const isHousehold = activeOrg ? isHouseholdOrg(activeOrg) : false
	const currentMember = activeOrg?.members?.find(
		(member) => member.userId === user?.id,
	)
	const canManageMembers =
		currentMember?.role === 'owner' || currentMember?.role === 'admin'
	const pendingInvitations =
		activeOrg?.invitations?.filter(
			(invitation) => invitation.status === 'pending',
		) ?? []

	useEffect(() => {
		let cancelled = false

		async function loadOrganization() {
			setIsLoadingOrg(true)
			const { data, error } =
				await authClient.organization.getFullOrganization()

			if (cancelled) return

			if (error || !data) {
				setActiveOrg(null)
			} else {
				setActiveOrg(data as ActiveOrganization)
			}

			setIsLoadingOrg(false)
		}

		loadOrganization()
	}, [resolvedOrgId])

	async function refreshOrganization() {
		const { data } = await authClient.organization.getFullOrganization()
		if (data) {
			setActiveOrg(data as ActiveOrganization)
		}
	}

	async function handleCreateHousehold() {
		const name = householdName.trim()
		if (!name) {
			toastManager.add({
				title: 'Name your household',
				description: 'Something like “Our household”.',
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

			setHouseholdName('')
			await queryClient.invalidateQueries()
			await router.invalidate()
			toastManager.add({
				title: 'Household created',
				description: 'You can invite someone below.',
				type: 'success',
			})
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

	async function handleInviteMember() {
		const email = inviteEmail.trim().toLowerCase()
		if (!email) {
			toastManager.add({
				title: 'Enter an email',
				description: 'We need their address to create the invite.',
				type: 'error',
			})
			return
		}

		setIsInviting(true)
		try {
			const { data, error } = await authClient.organization.inviteMember({
				email,
				role: 'member',
				organizationId: resolvedOrgId,
			})

			if (error || !data?.id) {
				throw new Error(error?.message ?? 'Could not create invite')
			}

			setInviteEmail('')
			setCreatedInvite({ email, invitationId: data.id })
			await refreshOrganization()
			toastManager.add({
				title: 'Invite ready',
				description: 'Copy the link below and send it their way.',
				type: 'success',
			})
		} catch (error) {
			toastManager.add({
				title: 'Could not send invite',
				description:
					error instanceof Error
						? error.message
						: 'Please try again in a moment.',
				type: 'error',
			})
		} finally {
			setIsInviting(false)
		}
	}

	async function handleRemoveMember(memberId: string) {
		setRemovingMemberId(memberId)
		try {
			const { error } = await authClient.organization.removeMember({
				memberIdOrEmail: memberId,
				organizationId: resolvedOrgId,
			})

			if (error) {
				throw new Error(error.message)
			}

			await refreshOrganization()
			toastManager.add({
				title: 'Member removed',
				type: 'success',
			})
		} catch (error) {
			toastManager.add({
				title: 'Could not remove member',
				description:
					error instanceof Error
						? error.message
						: 'Please try again in a moment.',
				type: 'error',
			})
		} finally {
			setRemovingMemberId(null)
		}
	}

	return (
		<div className='container mx-auto p-4 lg:p-8'>
			<Breadcrumb className='mb-8'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink render={<Link to='/app' viewTransition />}>
							app
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>settings</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<h1 className='font-serif text-3xl lg:text-4xl'>Settings</h1>
					<p className='mt-2 max-w-xl text-muted-foreground text-sm'>
						Manage your workspace and who can see shared subscriptions.
					</p>
				</div>
				<OrgSwitcher />
			</div>

			<div className='grid gap-6 lg:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle className='font-serif text-xl'>Current workspace</CardTitle>
						<CardDescription>
							Subscriptions you see on the dashboard belong to this workspace.
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isLoadingOrg ? (
							<Spinner className='size-5' />
						) : (
							<p className='font-medium'>
								{activeOrg
									? orgDisplayName(activeOrg)
									: isPersonal
										? 'Just me'
										: 'Workspace'}
							</p>
						)}
					</CardContent>
				</Card>

				{isPersonal && (
					<Card>
						<CardHeader>
							<CardTitle className='font-serif text-xl'>
								Create a household
							</CardTitle>
							<CardDescription>
								Start a shared workspace when you want someone else to see the
								same subscription list.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<Field>
								<FieldLabel htmlFor='settings-household-name'>
									Household name
								</FieldLabel>
								<Input
									id='settings-household-name'
									onChange={(e) => setHouseholdName(e.target.value)}
									placeholder='Our household'
									value={householdName}
								/>
							</Field>
							<Button
								className='w-full'
								disabled={isCreatingHousehold}
								onClick={handleCreateHousehold}
							>
								{isCreatingHousehold && <Spinner className='size-4' />}
								Create household
							</Button>
						</CardContent>
					</Card>
				)}

				{isHousehold && canManageMembers && (
					<Card className='lg:col-span-2'>
						<CardHeader>
							<CardTitle className='font-serif text-xl'>Invite someone</CardTitle>
							<CardDescription>
								Add their email, then copy the invite link to send over text,
								Slack, or however you usually reach them. We&apos;ll also email
								them if outbound mail is configured.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='flex flex-col gap-3 sm:flex-row'>
								<Input
									className='flex-1'
									onChange={(e) => setInviteEmail(e.target.value)}
									placeholder='partner@email.com'
									type='email'
									value={inviteEmail}
								/>
								<Button disabled={isInviting} onClick={handleInviteMember}>
									{isInviting ? (
										<Spinner className='size-4' />
									) : (
										<IconUserPlus className='size-4' />
									)}
									Create invite
								</Button>
							</div>

							{createdInvite && (
								<InviteLinkPanel
									email={createdInvite.email}
									invitationId={createdInvite.invitationId}
								/>
							)}

							{pendingInvitations.length > 0 && (
								<div className='space-y-2 border-border border-t pt-4'>
									<p className='font-medium text-sm'>Pending invites</p>
									<ul className='space-y-2'>
										{pendingInvitations.map((invitation) => (
											<li
												className='flex flex-col gap-2 rounded-lg border border-border px-3 py-2 sm:flex-row sm:items-center sm:justify-between'
												key={invitation.id}
											>
												<div className='min-w-0'>
													<p className='truncate font-medium text-sm'>
														{invitation.email}
													</p>
													<p className='text-muted-foreground text-xs'>
														Waiting to join · expires in 48 hours
													</p>
												</div>
												<CopyInviteLinkButton
													email={invitation.email}
													invitationId={invitation.id}
												/>
											</li>
										))}
									</ul>
								</div>
							)}
						</CardContent>
					</Card>
				)}

				{isHousehold && (
					<Card className='lg:col-span-2'>
						<CardHeader>
							<CardTitle className='font-serif text-xl'>Members</CardTitle>
							<CardDescription>
								Everyone here can view and edit subscriptions in this household.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-3'>
							{isLoadingOrg ? (
								<Spinner className='size-5' />
							) : (
								activeOrg?.members?.map((member) => (
									<div
										className='flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2'
										key={member.id}
									>
										<div className='min-w-0'>
											<p className='truncate font-medium'>
												{member.user.name || member.user.email}
											</p>
											<p className='truncate text-muted-foreground text-sm'>
												{member.user.email}
											</p>
										</div>
										<div className='flex shrink-0 items-center gap-2'>
											<Badge variant='outline'>{member.role}</Badge>
											{canManageMembers &&
												member.userId !== user?.id &&
												member.role !== 'owner' && (
													<Button
														aria-label={`Remove ${member.user.email}`}
														disabled={removingMemberId === member.id}
														onClick={() => handleRemoveMember(member.id)}
														size='icon'
														variant='ghost'
													>
														{removingMemberId === member.id ? (
															<Spinner className='size-4' />
														) : (
															<IconTrash className='size-4' />
														)}
													</Button>
												)}
										</div>
									</div>
								))
							)}
						</CardContent>
					</Card>
				)}
			</div>

			<Separator className='my-8' />

			<div className='space-y-4'>
				<div className='flex items-center gap-2 text-muted-foreground text-sm'>
					<IconSettings className='size-4' />
					<span>More settings coming soon.</span>
				</div>
				<Field>
					<FieldLabel>Currency</FieldLabel>
					<FieldDescription>
						Enter the currency symbol you want to use.
					</FieldDescription>
					<Input className='max-w-sm' placeholder='USD' />
				</Field>
			</div>
		</div>
	)
}
