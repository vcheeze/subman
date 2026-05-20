import { IconArrowLeft, IconPencil, IconTrash } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useId, useState } from 'react'

import {
	AlertDialog,
	AlertDialogClose,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogPopup,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { toastManager } from '@/components/ui/toast'
import type { Subscription } from '@/db/schema'
import { cn } from '@/lib/utils'
import {
	deleteSubscription,
	subscriptionByIdQueryOptions,
	updateSubscriptionStatus,
} from '@/queries/subscriptions'

export const Route = createFileRoute('/_authed/subs/$subId/')({
	component: RouteComponent,
})

function parseAmount(amount: string | null | undefined) {
	return Number.parseFloat(amount ?? '0') || 0
}

function getEstimatedSpend(amount: number, startDate: string | null) {
	if (!startDate) {
		return null
	}

	const startedAt = new Date(`${startDate}T00:00:00`)
	if (Number.isNaN(startedAt.getTime())) {
		return null
	}

	const elapsedMs = Date.now() - startedAt.getTime()
	if (elapsedMs <= 0) {
		return 0
	}

	const averageMonthMs = 1000 * 60 * 60 * 24 * 30.4375
	return amount * (elapsedMs / averageMonthMs)
}

function getRatingCountColor(rating: number) {
	switch (rating) {
		case 5:
			return 'bg-orange-8'
		case 4:
			return 'bg-orange-7'
		case 3:
			return 'bg-orange-6'
		case 2:
			return 'bg-orange-5'
		default:
			return 'bg-orange-4'
	}
}

function RouteComponent() {
	const { subId } = Route.useParams()
	const navigate = Route.useNavigate()
	const statusSwitchId = useId()
	const userId = Route.useRouteContext({
		select: (context) => context.user?.id ?? '',
	})
	const queryClient = useQueryClient()
	const { data, isLoading } = useQuery(
		subscriptionByIdQueryOptions(subId, userId),
	)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const statusMutation = useMutation({
		mutationFn: updateSubscriptionStatus,
		onMutate: async ({ data: mutationData }) => {
			await queryClient.cancelQueries({ queryKey: ['subscription', subId] })
			await queryClient.cancelQueries({
				queryKey: ['subscriptions', userId],
			})

			const previousSubscription = queryClient.getQueryData<Subscription>([
				'subscription',
				subId,
			])
			const previousSubscriptions = queryClient.getQueryData<Subscription[]>([
				'subscriptions',
				userId,
			])
			const optimisticUpdatedAt = new Date()

			queryClient.setQueryData<Subscription>(
				['subscription', subId],
				(current) =>
					current
						? {
								...current,
								isActive: mutationData.isActive,
								updatedAt: optimisticUpdatedAt,
							}
						: current,
			)
			queryClient.setQueryData<Subscription[]>(
				['subscriptions', userId],
				(current) =>
					current?.map((subscription) =>
						subscription.id === subId
							? {
									...subscription,
									isActive: mutationData.isActive,
									updatedAt: optimisticUpdatedAt,
								}
							: subscription,
					),
			)

			return { previousSubscription, previousSubscriptions }
		},
		onError: (_error, _variables, context) => {
			queryClient.setQueryData(
				['subscription', subId],
				context?.previousSubscription,
			)
			queryClient.setQueryData(
				['subscriptions', userId],
				context?.previousSubscriptions,
			)
			toastManager.add({
				title: 'Status update failed',
				description: 'Your subscription status was restored. Please try again.',
				type: 'error',
			})
		},
		onSuccess: (updatedSubscription) => {
			queryClient.setQueryData(['subscription', subId], updatedSubscription)
			queryClient.setQueryData<Subscription[]>(
				['subscriptions', userId],
				(current) =>
					current?.map((subscription) =>
						subscription.id === subId ? updatedSubscription : subscription,
					),
			)
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['subscriptions', userId],
			})
			await queryClient.invalidateQueries({ queryKey: ['subscription', subId] })
		},
	})
	const deleteMutation = useMutation({
		mutationFn: deleteSubscription,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['subscriptions', userId],
			})
			await queryClient.invalidateQueries({ queryKey: ['subscription', subId] })
			navigate({ to: '/app' })
		},
	})

	if (isLoading) {
		return (
			<div className='container mx-auto flex min-h-screen max-w-4xl flex-col justify-center p-4 lg:p-8'>
				<Skeleton className='h-96 rounded-sm bg-muted' />
			</div>
		)
	}

	if (!data) {
		return (
			<div className='container mx-auto flex min-h-screen max-w-4xl flex-col justify-center p-4 font-mono lg:p-8'>
				<div className='text-muted-foreground'>Subscription not found.</div>
			</div>
		)
	}

	const monthlyAmount = parseAmount(data.amount)
	const yearlyAmount = monthlyAmount * 12
	const costPerPoint = monthlyAmount / data.rating
	const estimatedSpend = getEstimatedSpend(monthlyAmount, data.startDate)
	const isActive = data.isActive !== false

	return (
		<>
			<div className='container mx-auto flex min-h-screen max-w-4xl flex-col justify-center p-4 font-mono lg:p-8'>
				<div className='mb-4 flex items-center justify-between gap-2'>
					<Button
						render={<Link className='flex gap-2' to='/app' viewTransition />}
						variant='ghost'
					>
						<IconArrowLeft className='size-4' />
						BACK
					</Button>
					<div className='flex items-center gap-3'>
						<label
							className='flex items-center gap-2 text-muted-foreground text-sm'
							htmlFor={statusSwitchId}
						>
							<span>{isActive ? 'active' : 'inactive'}</span>
							<Switch
								aria-label={`${isActive ? 'Deactivate' : 'Activate'} ${data.name}`}
								checked={isActive}
								disabled={statusMutation.isPending}
								id={statusSwitchId}
								onCheckedChange={(checked) => {
									statusMutation.mutate({
										data: { subId, userId, isActive: checked },
									})
								}}
							/>
						</label>
						<Button
							render={
								<Link
									className='flex gap-2'
									params={{ subId }}
									to='/subs/$subId/edit'
									viewTransition
								/>
							}
							variant='outline'
						>
							<IconPencil className='size-4' />
							EDIT
						</Button>
					</div>
				</div>

				<div className='grid gap-4'>
					<Card
						className={cn(
							'rounded-sm border-muted shadow-none',
							!isActive &&
								'border border-dashed border-border/80 bg-muted/30 ring-0',
						)}
					>
						<CardHeader>
							<div className='flex flex-wrap items-center gap-3'>
								<CardTitle className='font-bold font-serif text-4xl'>
									{data.name}
								</CardTitle>
								{!isActive && <Badge variant='outline'>inactive</Badge>}
							</div>
							<CardDescription>
								Current picture of what this sub costs and what it gives back.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='grid gap-2 md:grid-cols-3'>
								<div
									className={cn(
										'border-muted border-t pt-4',
										!isActive && 'opacity-70',
									)}
								>
									<div className='font-medium text-3xl'>
										${monthlyAmount.toFixed(2)}
									</div>
									<div className='text-muted-foreground text-xs'>per month</div>
								</div>
								<div
									className={cn(
										'border-muted border-t pt-4',
										!isActive && 'opacity-70',
									)}
								>
									<div className='font-medium text-3xl'>
										${yearlyAmount.toFixed(2)}
									</div>
									<div className='text-muted-foreground text-xs'>per year</div>
								</div>
								<div
									className={cn(
										'border-muted border-t pt-4',
										!isActive && 'opacity-70',
									)}
								>
									<div className='font-medium text-3xl'>
										${costPerPoint.toFixed(2)}
									</div>
									<div className='text-muted-foreground text-xs'>per point</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<div
						className={cn(
							'relative grid lg:grid-cols-2',
							!isActive && 'opacity-75',
						)}
					>
						<div className='-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-t border-b' />
						<div className='-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r border-l' />
						<div className='border-muted border-b p-6 transition-shadow hover:shadow lg:border-r group'>
							<div className='mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors group-hover:text-muted-foreground'>
								/ Value Score
							</div>
							<div className='flex gap-1'>
								{[1, 2, 3, 4, 5].map((rating) => (
									<div
										className={cn(
											'h-3 flex-auto rounded',
											rating > data.rating
												? 'bg-muted'
												: getRatingCountColor(rating),
										)}
										key={`${data.name}_rating_${rating}`}
									/>
								))}
							</div>
							<p className='mt-1 text-right text-muted-foreground text-xs'>
								{data.rating} points
							</p>
						</div>
						<div className='p-6 transition-shadow hover:shadow group'>
							<div className='mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors group-hover:text-muted-foreground'>
								/ Estimated Spend
							</div>
							<div className='font-medium text-3xl'>
								{estimatedSpend === null
									? '—'
									: `$${estimatedSpend.toFixed(2)}`}
							</div>
							<div className='text-muted-foreground text-xs'>
								{data.startDate
									? `since ${data.startDate}`
									: 'add a start date to estimate this'}
							</div>
						</div>
					</div>

					<Card
						className={cn(
							'rounded-sm border-muted shadow-none',
							!isActive &&
								'border border-dashed border-border/80 bg-muted/20 ring-0',
						)}
					>
						<CardHeader>
							<CardTitle className='font-medium'>Notes</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='whitespace-pre-wrap text-muted-foreground text-sm'>
								{data.notes || 'No notes yet.'}
							</p>
						</CardContent>
					</Card>

					<div className='flex items-center justify-between gap-4 border-muted border-t p-6 max-sm:flex-col max-sm:items-stretch'>
						<div>
							<div className='font-medium'>Remove this subscription</div>
							<div className='text-muted-foreground text-sm'>
								Delete it when it no longer belongs in your current picture.
							</div>
						</div>
						<Button
							className='max-sm:w-full'
							onClick={() => setIsDeleteDialogOpen(true)}
							variant='destructive'
						>
							<IconTrash className='size-4' />
							DELETE SUB
						</Button>
					</div>
				</div>
			</div>

			<AlertDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
			>
				<AlertDialogPopup>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete {data.name}?</AlertDialogTitle>
						<AlertDialogDescription>
							This permanently removes it from your subscription list.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogClose render={<Button variant='ghost' />}>
							Cancel
						</AlertDialogClose>
						<Button
							disabled={deleteMutation.isPending}
							onClick={() => {
								deleteMutation.mutate({
									data: { subId, userId },
								})
							}}
							variant='destructive'
						>
							Delete Sub
						</Button>
					</AlertDialogFooter>
				</AlertDialogPopup>
			</AlertDialog>
		</>
	)
}
