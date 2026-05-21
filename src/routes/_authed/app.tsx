import { A } from '@mobily/ts-belt'
import { IconLogout, IconPencil, IconPlus } from '@tabler/icons-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import type { Variants } from 'motion/react'
import { motion } from 'motion/react'
import { useId, useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
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
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import {
	// fetchSubscriptions,
	subscriptionsQueryOptions,
} from '@/queries/subscriptions'

export const Route = createFileRoute('/_authed/app')({
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(
			subscriptionsQueryOptions(context.user?.id ?? ''),
		)
		return {
			user: context.user,
			// subscriptions: fetchSubscriptions({ data: context.user?.id || '' }),
		}
	},
	component: App,
})

const containerAnimation: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.06,
		},
	},
}

const panelAnimation: Variants = {
	hidden: {
		opacity: 0,
		y: 12,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.35,
			ease: 'easeOut',
		},
		y: 0,
	},
}

function App() {
	const router = useRouter()
	const { user } = Route.useLoaderData()
	const { data: subscriptions, isLoading } = useSuspenseQuery(
		subscriptionsQueryOptions(user?.id ?? ''),
	)
	const [showInactive, setShowInactive] = useState(false)
	const [isSigningOut, setIsSigningOut] = useState(false)
	const showInactiveId = useId()

	function parseAmount(amount: string) {
		return Number.parseFloat(amount) || 0
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

	const activeSubscriptions = subscriptions.filter(
		(sub) => sub.isActive !== false,
	)
	const inactiveSubscriptions = subscriptions.filter(
		(sub) => sub.isActive === false,
	)
	const subscriptionsWithAmounts = activeSubscriptions.map((sub) => ({
		...sub,
		amountValue: parseAmount(sub.amount),
	}))
	const totalAmount = subscriptionsWithAmounts.reduce(
		(prev, curr) => prev + curr.amountValue,
		0,
	)
	const annualAmount = totalAmount * 12
	const maxAmount = Math.max(
		1,
		...subscriptionsWithAmounts.map((s) => s.amountValue),
	)
	const totalRating = activeSubscriptions.reduce(
		(prev, curr) => prev + curr.rating,
		0,
	)
	const averageRating =
		activeSubscriptions.length > 0
			? totalRating / activeSubscriptions.length
			: 0
	const subsByRating = A.groupBy(activeSubscriptions, (item) => item.rating)

	const averageCostPerPoint = totalRating > 0 ? totalAmount / totalRating : 0
	const subscriptionsByValue = subscriptionsWithAmounts
		.filter((sub) => sub.amountValue > 0 && sub.rating > 0)
		.map((sub) => ({
			...sub,
			costPerPoint: sub.amountValue / sub.rating,
		}))
		.sort((a, b) => a.costPerPoint - b.costPerPoint)
	const bestValueSub = subscriptionsByValue.at(0)
	const worstValueSub = subscriptionsByValue.at(-1)
	const minCostPerPoint = bestValueSub?.costPerPoint ?? 0
	const costPerPointMax = Math.max(averageCostPerPoint, minCostPerPoint, 1)
	const averageCopWidth = (averageCostPerPoint / costPerPointMax) * 100
	const minCopWidth = (minCostPerPoint / costPerPointMax) * 100
	const estimatedSpendItems = subscriptionsWithAmounts
		.map((sub) => ({
			estimatedSpend: getEstimatedSpend(sub.amountValue, sub.startDate),
		}))
		.filter((item) => item.estimatedSpend !== null)
	const estimatedSpend = estimatedSpendItems.reduce(
		(prev, curr) => prev + (curr.estimatedSpend ?? 0),
		0,
	)
	const subscriptionsByPrice = [...subscriptionsWithAmounts].sort(
		(a, b) => b.amountValue - a.amountValue,
	)
	const subscriptionsForList = [
		...(showInactive ? subscriptions : activeSubscriptions),
	].sort((a, b) => {
		const activeDelta =
			Number(b.isActive !== false) - Number(a.isActive !== false)
		if (activeDelta !== 0) {
			return activeDelta
		}

		return b.rating - a.rating
	})

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

	async function handleSignOut() {
		setIsSigningOut(true)

		try {
			const { error } = await authClient.signOut()

			if (error) {
				setIsSigningOut(false)
				toastManager.add({
					title: 'Sign out failed',
					description: error.message || 'Please try again.',
					type: 'error',
				})
				return
			}

			await router.invalidate()
			await router.navigate({ to: '/signin' })
		} catch {
			setIsSigningOut(false)
			toastManager.add({
				title: 'Sign out failed',
				description: 'Please try again.',
				type: 'error',
			})
		}
	}

	return (
		<>
			<header className='container mx-auto flex items-center justify-between gap-4 p-4 lg:p-8'>
				<Link
					aria-label='Subman dashboard'
					className='flex min-w-0 items-center gap-1 text-foreground/80 transition-colors hover:text-foreground'
					to='/app'
					viewTransition
				>
					<img
						alt=''
						className='size-7 rounded-sm dark:hidden'
						src='/logo_light.svg'
					/>
					<img
						alt=''
						className='hidden size-7 rounded-sm dark:block'
						src='/logo_dark.svg'
					/>
					<span className='hidden truncate font-serif text-xl sm:inline'>
						Subman
					</span>
				</Link>
				<div className='flex items-center justify-end gap-2'>
					<Button
						render={
							<Link className='flex gap-2' to='/subs/add' viewTransition />
						}
						variant='outline'
					>
						<IconPlus className='h-4 w-4' />
						ADD SUB
					</Button>
					<Tooltip>
						<TooltipTrigger
							render={
								<Button
									aria-label={isSigningOut ? 'Signing out' : 'Log out'}
									disabled={isSigningOut}
									onClick={handleSignOut}
									size='icon'
									variant='ghost'
								/>
							}
						>
							<IconLogout className='h-4 w-4' />
						</TooltipTrigger>
						<TooltipContent>
							{isSigningOut ? 'Signing out...' : 'Log out'}
						</TooltipContent>
					</Tooltip>
					<ThemeToggle />
				</div>
			</header>
			{isLoading ? (
				<Skeleton className='container mx-auto h-64 bg-muted p-4 lg:p-8' />
			) : subscriptions.length === 0 ? (
				<div className='container mx-auto p-4 font-mono lg:p-8'>
					You've got no subs!
				</div>
			) : (
				<motion.div
					animate='visible'
					className='container mx-auto p-4 font-mono lg:p-8'
					initial='hidden'
					variants={containerAnimation}
				>
					<motion.div
						className='mb-8 grid gap-2 md:grid-cols-2 lg:grid-cols-4'
						variants={containerAnimation}
					>
						<motion.div variants={panelAnimation} whileHover={{ y: -2 }}>
							<Card className='rounded-sm border-muted shadow-none transition-shadow hover:shadow'>
								<CardHeader>
									<CardTitle className='text-3xl lg:text-4xl'>
										${totalAmount.toFixed(2)}
									</CardTitle>
									<CardDescription>per month</CardDescription>
								</CardHeader>
							</Card>
						</motion.div>
						<motion.div variants={panelAnimation} whileHover={{ y: -2 }}>
							<Card className='rounded-sm border-muted shadow-none transition-shadow hover:shadow'>
								<CardHeader>
									<CardTitle className='text-3xl lg:text-4xl'>
										${annualAmount.toFixed(2)}
									</CardTitle>
									<CardDescription>per year</CardDescription>
								</CardHeader>
							</Card>
						</motion.div>
						<motion.div variants={panelAnimation} whileHover={{ y: -2 }}>
							<Card className='rounded-sm border-muted shadow-none transition-shadow hover:shadow'>
								<CardHeader>
									<CardTitle className='text-3xl lg:text-4xl'>
										{activeSubscriptions.length}
									</CardTitle>
									<CardDescription>active subscriptions</CardDescription>
								</CardHeader>
							</Card>
						</motion.div>
						<motion.div variants={panelAnimation} whileHover={{ y: -2 }}>
							<Card className='rounded-sm border-muted shadow-none transition-shadow hover:shadow'>
								<CardHeader>
									<CardTitle className='text-3xl lg:text-4xl'>
										{estimatedSpendItems.length > 0
											? `$${estimatedSpend.toFixed(2)}`
											: '—'}
									</CardTitle>
									<CardDescription>
										{estimatedSpendItems.length > 0
											? 'estimated spent so far'
											: 'add start dates'}
									</CardDescription>
								</CardHeader>
							</Card>
						</motion.div>
					</motion.div>

					<motion.div
						className='relative grid lg:grid-cols-2'
						variants={panelAnimation}
					>
						<div className='-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-t border-b' />
						<div className='-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r border-l' />
						<div className='border-muted border-b p-6 transition-shadow hover:shadow lg:border-r group'>
							<div className='mb-2 font-medium text-lg text-muted-foreground/80 uppercase transition-colors group-hover:text-muted-foreground'>
								/ Average Value
							</div>
							<div className='flex gap-1'>
								{[1, 2, 3, 4, 5].map((rating) => {
									const index = rating - 1
									const fullStars = Math.floor(averageRating)
									const partialFill = (averageRating - fullStars) * 100
									const fillPercent =
										index < fullStars
											? 100
											: index === fullStars
												? partialFill
												: 0

									return (
										<div
											className={cn(
												'h-3 flex-1 rounded relative overflow-hidden bg-muted',
											)}
											key={`average_value_${rating}`}
										>
											{fillPercent > 0 && (
												<motion.div
													animate={{ width: `${fillPercent}%` }}
													className={cn(
														'absolute inset-y-0 left-0 rounded-l',
														getRatingCountColor(rating),
													)}
													initial={{ width: 0 }}
													transition={{
														delay: 0.12 + index * 0.04,
														duration: 0.45,
														ease: 'easeOut',
													}}
												/>
											)}
										</div>
									)
								})}
								<div className='ml-2 text-muted-foreground text-xs'>
									{averageRating.toFixed(2)} points
								</div>
							</div>
						</div>
						<div className='p-6 transition-shadow hover:shadow group'>
							<div className='mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors group-hover:text-muted-foreground'>
								/ Cost per point
							</div>
							<div className='grid grid-cols-2 gap-1'>
								<div className='flex justify-end gap-2'>
									<div className='text-muted-foreground text-xs'>
										${averageCostPerPoint.toFixed(2)}
									</div>
									<motion.div
										animate={{ width: `${averageCopWidth}%` }}
										className='h-3 rounded bg-orange-8 '
										initial={{ width: 0 }}
										transition={{
											duration: 0.45,
											ease: 'easeOut',
										}}
									/>
								</div>
								<div className='flex gap-2'>
									<motion.div
										animate={{ width: `${minCopWidth}%` }}
										className='h-3 rounded bg-orange-4'
										initial={{ width: 0 }}
										transition={{
											duration: 0.45,
											ease: 'easeOut',
										}}
									/>
									<div className='text-muted-foreground text-xs'>
										${minCostPerPoint.toFixed(2)}
									</div>
								</div>
							</div>
							<div className='text-center text-muted-foreground text-xs'>
								Average vs. Lowest
							</div>
						</div>
					</motion.div>

					<motion.div
						className='relative grid lg:grid-cols-2'
						variants={panelAnimation}
					>
						<div className='-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-b' />
						<div className='-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r border-l' />
						<div className='border-muted border-b p-6 transition-shadow hover:shadow lg:border-r group'>
							<div className='mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors group-hover:text-muted-foreground'>
								/ Best Value
							</div>
							{bestValueSub ? (
								<div className='flex items-end justify-between gap-4'>
									<div>
										<div className='text-muted-foreground font-medium text-xl'>
											{bestValueSub.name}
										</div>
										<div className='text-muted-foreground text-xs'>
											${bestValueSub.amount} / {bestValueSub.rating} points
										</div>
									</div>
									<div className='text-right'>
										<div className='text-muted-foreground font-medium text-xl'>
											${bestValueSub.costPerPoint.toFixed(2)}
										</div>
										<div className='text-muted-foreground text-xs'>
											per point
										</div>
									</div>
								</div>
							) : (
								<div className='text-muted-foreground text-sm'>
									Add prices and ratings to compare value.
								</div>
							)}
						</div>
						<div className='p-6 transition-shadow hover:shadow group'>
							<div className='mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors group-hover:text-muted-foreground'>
								/ Worst Value
							</div>
							{worstValueSub ? (
								<div className='flex items-end justify-between gap-4'>
									<div>
										<div className='text-muted-foreground font-medium text-xl'>
											{worstValueSub.name}
										</div>
										<div className='text-muted-foreground text-xs'>
											${worstValueSub.amount} / {worstValueSub.rating} points
										</div>
									</div>
									<div className='text-right'>
										<div className='text-muted-foreground font-medium text-xl'>
											${worstValueSub.costPerPoint.toFixed(2)}
										</div>
										<div className='text-muted-foreground text-xs'>
											per point
										</div>
									</div>
								</div>
							) : (
								<div className='text-muted-foreground text-sm'>
									Add prices and ratings to compare value.
								</div>
							)}
						</div>
					</motion.div>

					<motion.div
						className='relative grid lg:grid-cols-2'
						variants={panelAnimation}
					>
						<div className='-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-b' />
						<div className='-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r border-l' />
						<div className='border-muted border-b p-6 transition-shadow hover:shadow lg:border-r group'>
							<div className='mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors group-hover:text-muted-foreground'>
								/ Subs by Rating
							</div>
							<div className='flex gap-2'>
								{[...new Array(5)].map((_, index) => (
									<div
										className='flex max-w-16 flex-auto flex-col items-center gap-1'
										// biome-ignore lint/suspicious/noArrayIndexKey: no id for key, using index instead
										key={`rating_${index}_count`}
									>
										<div className='text-muted-foreground text-xs'>
											{index + 1}
										</div>
										{/* {[...new Array(subsByRating[index + 1]?.length ?? 0)].map( */}
										{subsByRating[index + 1]?.map((sub) => (
											<Tooltip key={sub.id}>
												<TooltipTrigger
													render={
														<motion.div
															animate={{ opacity: 1, scaleX: 1 }}
															className={`h-3 w-full rounded ${getRatingCountColor(index + 1)}`}
															initial={{ opacity: 0, scaleX: 0 }}
															style={{ originX: 0 }}
															transition={{
																delay: index * 0.04,
																duration: 0.25,
																ease: 'easeOut',
															}}
														/>
													}
												></TooltipTrigger>
												<TooltipContent>
													<p className='mb-2 border-b pb-1 text-foreground'>
														{sub.name}
													</p>
													<p>${sub.amount}</p>
													<p>{sub.rating} stars</p>
												</TooltipContent>
											</Tooltip>
										))}
									</div>
								))}
							</div>
						</div>
						<div className='p-6 transition-shadow hover:shadow group'>
							<div className='mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors group-hover:text-muted-foreground'>
								/ Subs by Price
							</div>
							<table>
								<tbody>
									{subscriptionsByPrice.map((sub) => {
										const percentage = (sub.amountValue / maxAmount) * 100

										return (
											<tr key={sub.id}>
												<td
													align='right'
													className='whitespace-nowrap p-1 text-muted-foreground text-xs'
												>
													{sub.name}
												</td>
												<td className='w-full p-1'>
													<motion.div
														animate={{ width: `${percentage}%` }}
														className={'h-3 rounded bg-orange-8'}
														initial={{ width: 0 }}
														transition={{
															duration: 0.5,
															ease: 'easeOut',
															type: 'spring',
														}}
													/>
												</td>
												<td
													align='right'
													className='whitespace-nowrap p-1 text-muted-foreground text-xs'
												>
													${sub.amount}
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</motion.div>

					<motion.div
						className='relative p-6 group/section'
						variants={panelAnimation}
					>
						<div className='-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-b' />
						<div className='-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r border-l' />
						<div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
							<div className='font-medium text-lg text-muted-foreground/50 uppercase transition-colors group-hover/section:text-muted-foreground'>
								/ Your Subs
							</div>
							{inactiveSubscriptions.length > 0 && (
								<label
									className='flex items-center gap-2 text-muted-foreground text-xs'
									htmlFor={showInactiveId}
								>
									<span>show inactive</span>
									<Switch
										aria-label='Show inactive subscriptions'
										checked={showInactive}
										id={showInactiveId}
										onCheckedChange={setShowInactive}
									/>
								</label>
							)}
						</div>
						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
							{subscriptionsForList.length === 0 ? (
								<div className='text-muted-foreground text-sm'>
									Inactive subscriptions are hidden.
								</div>
							) : (
								subscriptionsForList.map((sub, subIndex) => (
									<motion.div
										key={sub.id}
										variants={panelAnimation}
										whileHover={{ y: -3 }}
										whileTap={{ scale: 0.99 }}
									>
										<Card
											className={cn(
												'rounded-sm border-muted shadow-none transition-shadow hover:cursor-pointer hover:shadow hover:bg-orange-2 relative group/sub',
												sub.isActive === false &&
													'border border-dashed border-border/50 bg-muted/30 opacity-75 ring-0 hover:bg-muted/50',
											)}
										>
											<Link
												aria-label={`View ${sub.name}`}
												className='absolute inset-0 z-10 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
												params={{ subId: sub.id }}
												to='/subs/$subId'
												viewTransition
											/>
											<div className='absolute top-4 right-4 z-20 flex items-center gap-2'>
												<Button
													variant='ghost'
													size='icon'
													className='lg:opacity-0 group-hover/sub:opacity-100 transition-opacity duration-150 ease-in'
													onClick={(event) => event.stopPropagation()}
													render={
														<Link
															params={{ subId: sub.id }}
															to='/subs/$subId/edit'
															viewTransition
														/>
													}
												>
													<IconPencil className='size-4 stroke-muted-foreground' />
												</Button>
											</div>
											<CardHeader className='pointer-events-none'>
												<CardTitle className='font-medium pr-20'>
													{sub.name}
												</CardTitle>
												<CardDescription>
													${sub.amount} per month
												</CardDescription>
											</CardHeader>
											<CardContent className='pointer-events-none'>
												<div className='mt-2 flex gap-1'>
													{[1, 2, 3, 4, 5].map((rating) => (
														<div
															className={cn(
																'h-3 flex-auto overflow-hidden rounded bg-muted',
															)}
															key={`${sub.name}_rating_${rating}`}
														>
															{rating <= sub.rating && (
																<motion.div
																	animate={{ scaleX: 1 }}
																	className={cn(
																		'h-full rounded',
																		getRatingCountColor(rating),
																	)}
																	initial={{ scaleX: 0 }}
																	style={{ originX: 0 }}
																	transition={{
																		delay: 0.04 * subIndex + 0.03 * rating,
																		duration: 0.28,
																		ease: 'easeOut',
																	}}
																/>
															)}
														</div>
													))}
												</div>
												<p className='mt-1 text-right text-muted-foreground text-xs'>
													{sub.rating} points
												</p>
											</CardContent>
										</Card>
									</motion.div>
								))
							)}
						</div>
					</motion.div>
				</motion.div>
			)}
		</>
	)
}
