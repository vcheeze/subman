import { IconUsers } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouteContext, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import {
	Select,
	SelectItem,
	SelectPopup,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { toastManager } from '@/components/ui/toast'
import { authClient } from '@/lib/auth-client'
import { isPersonalOrgId, orgDisplayName, personalOrgId } from '@/lib/org'

type OrganizationOption = {
	id: string
	name: string
}

export function OrgSwitcher() {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { user, activeOrganizationId } = useRouteContext({ from: '__root__' })
	const [organizations, setOrganizations] = useState<OrganizationOption[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isSwitching, setIsSwitching] = useState(false)

	const resolvedOrgId =
		activeOrganizationId ?? (user ? personalOrgId(user.id) : '')

	useEffect(() => {
		let cancelled = false

		async function loadOrganizations() {
			setIsLoading(true)
			const { data, error } = await authClient.organization.list()

			if (cancelled) return

			if (error) {
				toastManager.add({
					title: 'Could not load workspaces',
					description: error.message,
					type: 'error',
				})
				setOrganizations([])
			} else {
				setOrganizations(
					(data ?? []).map((org) => ({
						id: org.id,
						name: orgDisplayName(org),
					})),
				)
			}

			setIsLoading(false)
		}

		loadOrganizations()

		return () => {
			cancelled = true
		}
	}, [resolvedOrgId])

	async function handleSwitch(nextOrgId: string | null) {
		if (!nextOrgId || nextOrgId === resolvedOrgId || isSwitching) {
			return
		}

		setIsSwitching(true)

		try {
			const { error } = await authClient.organization.setActive({
				organizationId: nextOrgId,
			})

			if (error) {
				throw new Error(error.message)
			}

			await queryClient.invalidateQueries()
			await router.invalidate()
		} catch (error) {
			toastManager.add({
				title: 'Could not switch workspace',
				description:
					error instanceof Error
						? error.message
						: 'Please try again in a moment.',
				type: 'error',
			})
		} finally {
			setIsSwitching(false)
		}
	}

	if (!user) {
		return null
	}

	if (isLoading) {
		return (
			<div className='flex h-8 min-w-32 items-center justify-center rounded-lg border border-input px-3'>
				<Spinner className='size-4' />
			</div>
		)
	}

	if (organizations.length <= 1) {
		const label =
			organizations[0]?.name ??
			(isPersonalOrgId(resolvedOrgId) ? 'Just me' : 'Workspace')

		return (
			<div className='flex h-8 max-w-48 items-center gap-2 rounded-lg border border-input px-3 text-sm'>
				<IconUsers className='size-4 shrink-0 opacity-70' />
				<span className='truncate'>{label}</span>
			</div>
		)
	}

	return (
		<Select
			disabled={isSwitching}
			items={organizations.map((org) => ({
				value: org.id,
				label: org.name,
			}))}
			onValueChange={(value) => handleSwitch(value)}
			value={resolvedOrgId}
		>
			<SelectTrigger aria-label='Switch workspace' className='max-w-52' size='sm'>
				<IconUsers className='size-4 shrink-0 opacity-70' />
				<SelectValue />
			</SelectTrigger>
			<SelectPopup>
				{organizations.map((org) => (
					<SelectItem key={org.id} value={org.id}>
						{org.name}
					</SelectItem>
				))}
			</SelectPopup>
		</Select>
	)
}
