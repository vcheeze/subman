import { IconArrowsRightLeft } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
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
import {
	moveSubscription,
	moveTargetOrganizationsQueryOptions,
} from '@/queries/subscriptions'

type MoveSubscriptionPanelProps = {
	subId: string
	subName: string
	organizationId: string
}

export function MoveSubscriptionPanel({
	subId,
	subName,
	organizationId,
}: MoveSubscriptionPanelProps) {
	const router = useRouter()
	const queryClient = useQueryClient()
	const [targetOrganizationId, setTargetOrganizationId] = useState<
		string | null
	>(null)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const { data: moveTargets = [], isLoading } = useQuery(
		moveTargetOrganizationsQueryOptions(organizationId),
	)

	const workspaceSelectItems = useMemo(
		() => [
			{ value: null, label: 'Choose workspace' },
			...moveTargets.map((org) => ({
				value: org.id,
				label: org.name,
			})),
		],
		[moveTargets],
	)

	const moveMutation = useMutation({
		mutationFn: moveSubscription,
		onSuccess: async ({ sourceOrganizationId, targetOrganizationId: targetId }) => {
			const targetName =
				moveTargets.find((org) => org.id === targetId)?.name ?? 'the other workspace'

			await queryClient.invalidateQueries({
				queryKey: ['subscriptions', sourceOrganizationId],
			})
			await queryClient.invalidateQueries({
				queryKey: ['subscription', sourceOrganizationId, subId],
			})
			await queryClient.invalidateQueries({
				queryKey: ['subscriptions', targetId],
			})
			await queryClient.invalidateQueries({
				queryKey: ['moveTargetOrganizations', organizationId],
			})

			const { error } = await authClient.organization.setActive({
				organizationId: targetId,
			})

			if (error) {
				toastManager.add({
					title: `Moved to ${targetName}`,
					description:
						'Switch workspace from the header to see it in the new list.',
					type: 'success',
				})
			} else {
				await router.invalidate()
				toastManager.add({
					title: `Moved to ${targetName}`,
					description: `${subName} now lives in that workspace.`,
					type: 'success',
				})
			}

			await router.navigate({ to: '/app' })
		},
		onError: (error) => {
			toastManager.add({
				title: 'Could not move subscription',
				description:
					error instanceof Error
						? error.message
						: 'Please try again in a moment.',
				type: 'error',
			})
		},
	})

	if (isLoading || moveTargets.length === 0) {
		return null
	}

	const selectedTarget =
		moveTargets.find((org) => org.id === targetOrganizationId) ?? null

	return (
		<>
			<div className='flex flex-col gap-4 border-muted border-t p-6 max-sm:items-stretch sm:flex-row sm:items-end sm:justify-between'>
				<div className='space-y-1'>
					<div className='font-medium'>Move to another workspace</div>
					<div className='max-w-md text-muted-foreground text-sm'>
						Share it with your household, or pull it back to just you. Everyone
						in the destination workspace can see it.
					</div>
				</div>
				<div className='flex w-full flex-col gap-2 sm:max-w-xs'>
					<Select
						items={workspaceSelectItems}
						onValueChange={(value) => setTargetOrganizationId(value)}
						value={targetOrganizationId}
					>
						<SelectTrigger aria-label='Choose destination workspace' size='sm'>
							<SelectValue />
						</SelectTrigger>
						<SelectPopup>
							{moveTargets.map((org) => (
								<SelectItem key={org.id} value={org.id}>
									{org.name}
								</SelectItem>
							))}
						</SelectPopup>
					</Select>
					<Button
						className='w-full'
						disabled={!targetOrganizationId || moveMutation.isPending}
						onClick={() => setIsConfirmOpen(true)}
						variant='outline'
					>
						{moveMutation.isPending ? (
							<Spinner className='size-4' />
						) : (
							<IconArrowsRightLeft className='size-4' />
						)}
						Move subscription
					</Button>
				</div>
			</div>

			<AlertDialog onOpenChange={setIsConfirmOpen} open={isConfirmOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Move {subName} to {selectedTarget?.name ?? 'another workspace'}?
						</AlertDialogTitle>
						<AlertDialogDescription>
							It will leave this workspace and appear in{' '}
							{selectedTarget?.name ?? 'the destination workspace'}. You can move
							it back anytime.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel render={<Button variant='ghost' />}>
							Cancel
						</AlertDialogCancel>
						<Button
							disabled={!targetOrganizationId || moveMutation.isPending}
							onClick={() => {
								if (!targetOrganizationId) return

								moveMutation.mutate({
									data: {
										subId,
										targetOrganizationId,
									},
								})
								setIsConfirmOpen(false)
							}}
						>
							{moveMutation.isPending && <Spinner className='size-4' />}
							Move subscription
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
