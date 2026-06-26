import { A } from '@mobily/ts-belt'
import { IconLogout, IconPencil, IconPlus, IconSettings } from '@tabler/icons-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import {
	AnimatePresence,
	animate,
	motion,
	useMotionValue,
	useReducedMotion,
	useTransform,
	type Variants,
} from 'motion/react'
import { useEffect, useId, useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { OrgSwitcher } from '@/components/org-switcher'
import { personalOrgId } from '@/lib/org'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { Switch } from '@/components/ui/switch'
import { toastManager } from '@/components/ui/toast'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { subscriptionsQueryOptions } from '@/queries/subscriptions'

export const Route = createFileRoute('/_authed/app')({
	loader: async ({ context }) => {
		const organizationId =
			context.activeOrganizationId ??
			(context.user ? personalOrgId(context.user.id) : '')
		await context.queryClient.ensureQueryData(
			subscriptionsQueryOptions(organizationId),
		)
		return {
			user: context.user,
			organizationId,
		}
	},
	component: App,
})

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const
const MICRO_DURATION = 0.15
const STATE_DURATION = 0.22
const DATA_DURATION = 0.32
const MAX_LIST_STAGGER = 12
const LIST_STAGGER_STEP = 0.04

function cappedListDelay(index: number) {
	return Math.min(index, MAX_LIST_STAGGER - 1) * LIST_STAGGER_STEP
}

function AnimatedNumber({
	value,
	format,
	reduceMotion,
}: {
	value: number
	format: (current: number) => string
	reduceMotion: boolean
}) {
	const motionValue = useMotionValue(reduceMotion ? value : 0)
	const display = useTransform(motionValue, format)

	useEffect(() => {
		if (reduceMotion) {
			motionValue.set(value)
			return
		}

		const controls = animate(motionValue, value, {
			duration: DATA_DURATION,
			ease: EASE_OUT_QUINT,
		})

		return () => controls.stop()
	}, [motionValue, reduceMotion, value])

	return <motion.span className='tabular-nums'>{display}</motion.span>
}

function SectionLabel({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<h2
			className={cn(
				'mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wide',
				className,
			)}
		>
			/ {children}
		</h2>
	)
}

function DashboardSkeleton() {
	return (
		<motion.div
			animate={{ opacity: 1 }}
			aria-busy='true'
			aria-label='Loading dashboard'
			className='container mx-auto space-y-6 p-4 lg:p-8'
			initial={{ opacity: 0.72 }}
			transition={{ duration: STATE_DURATION, ease: EASE_OUT_QUINT }}
		>
			<div className='grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4'>
				{['a', 'b', 'c', 'd'].map((key) => (
					<Skeleton className='h-24 rounded-none bg-card' key={key} />
				))}
			</div>
			<Skeleton className='h-40 w-full rounded-lg' />
			<Skeleton className='h-40 w-full rounded-lg' />
		</motion.div>
	)
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

function App() {
	const router = useRouter()
	const reduceMotion = useReducedMotion() ?? false
	const { organizationId } = Route.useLoaderData()
	const { data: subscriptions, isLoading } = useSuspenseQuery(
		subscriptionsQueryOptions(organizationId),
	)
	const [showInactive, setShowInactive] = useState(false)
	const [isSigningOut, setIsSigningOut] = useState(false)
	const showInactiveId = useId()

	const summaryContainer: Variants = reduceMotion
		? { hidden: {}, visible: {} }
		: {
				hidden: {},
				visible: {
					transition: {
						delayChildren: 0.04,
						staggerChildren: 0.05,
					},
				},
			}

	const summaryCell: Variants = reduceMotion
		? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
		: {
				hidden: { opacity: 0, y: 8 },
				visible: {
					opacity: 1,
					transition: {
						duration: STATE_DURATION,
						ease: EASE_OUT_QUINT,
					},
					y: 0,
				},
			}

	const listItem: Variants = reduceMotion
		? { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } }
		: {
				hidden: { opacity: 0, scale: 0.98 },
				visible: {
					opacity: 1,
					scale: 1,
					transition: {
						duration: STATE_DURATION,
						ease: EASE_OUT_QUINT,
					},
				},
			}

	const barTransition = reduceMotion
		? { duration: 0 }
		: { duration: DATA_DURATION, ease: EASE_OUT_QUINT }

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

	const summaryStats = [
		{
			label: 'monthly total',
			value: `$${totalAmount.toFixed(2)}`,
			animatedValue: totalAmount,
			format: (current: number) => `$${current.toFixed(2)}`,
		},
		{
			label: 'if all renewed for a year',
			value: `$${annualAmount.toFixed(2)}`,
			animatedValue: annualAmount,
			format: (current: number) => `$${current.toFixed(2)}`,
		},
		{
			label: 'active right now',
			value: String(activeSubscriptions.length),
			animatedValue: activeSubscriptions.length,
			format: (current: number) => String(Math.round(current)),
		},
		{
			label:
				estimatedSpendItems.length > 0
					? 'spent since start dates'
					: 'add start dates to track spend',
			value:
				estimatedSpendItems.length > 0
					? `$${estimatedSpend.toFixed(2)}`
					: '—',
			animatedValue:
				estimatedSpendItems.length > 0 ? estimatedSpend : null,
			format: (current: number) => `$${current.toFixed(2)}`,
		},
	]

	async function handleSignOut() {
		setIsSigningOut(true)

		try {
			const { error } = await authClient.signOut()

			if (error) {
				setIsSigningOut(false)
				toastManager.add({
					title: "Couldn't sign you out",
					description:
						error.message || 'Give it another try in a moment.',
					type: 'error',
				})
				return
			}

			await router.invalidate()
			await router.navigate({ to: '/signin' })
		} catch {
			setIsSigningOut(false)
			toastManager.add({
				title: "Couldn't sign you out",
				description: 'Give it another try in a moment.',
				type: 'error',
			})
		}
	}

	return (
		<>
			<header className='container mx-auto flex items-center justify-between gap-4 p-4 lg:p-8'>
				<Link
					aria-label='Subman dashboard'
					className='flex min-w-0 items-center gap-2 text-foreground/80 transition-colors hover:text-foreground'
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
				<div className='flex shrink-0 items-center justify-end gap-2 sm:gap-4'>
					<OrgSwitcher />
					<Button
						render={
							<Link className='flex gap-2' to='/subs/add' viewTransition />
						}
						size='sm'
						variant='outline'
					>
						<IconPlus className='size-4' />
						<span className='hidden sm:inline'>Add subscription</span>
						<span className='sm:hidden'>Add</span>
					</Button>
					<div className='flex items-center gap-1'>
						<Tooltip>
							<TooltipTrigger
								render={
									<Button
										aria-label='Settings'
										render={
											<Link to='/settings' viewTransition />
										}
										size='icon'
										variant='ghost'
									/>
								}
							>
								<IconSettings className='size-4' />
							</TooltipTrigger>
							<TooltipContent>Settings</TooltipContent>
						</Tooltip>
						<ThemeToggle />
						<Tooltip>
							<TooltipTrigger
								render={
									<Button
										aria-label={isSigningOut ? 'Signing out' : 'Sign out'}
										disabled={isSigningOut}
										onClick={handleSignOut}
										size='icon'
										variant='ghost'
									/>
								}
							>
								{isSigningOut ? (
									<Spinner className='size-4' />
								) : (
									<IconLogout className='size-4' />
								)}
							</TooltipTrigger>
							<TooltipContent>
								{isSigningOut ? 'Signing out…' : 'Sign out'}
							</TooltipContent>
						</Tooltip>
					</div>
				</div>
			</header>

			<main>
				<h1 className='sr-only'>Subscription dashboard</h1>

				{isLoading ? (
					<DashboardSkeleton />
				) : subscriptions.length === 0 ? (
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						className='container mx-auto max-w-lg p-4 lg:p-8'
						initial={reduceMotion ? false : { opacity: 0, y: 10 }}
						transition={{ duration: STATE_DURATION, ease: EASE_OUT_QUINT }}
					>
						<Empty className='items-start p-0 text-left'>
							<EmptyHeader className='items-start text-left'>
								<EmptyMedia variant='icon'>
									<motion.div
										animate={{ scale: 1, y: 0 }}
										initial={reduceMotion ? false : { scale: 0.92, y: 4 }}
										transition={{
											delay: reduceMotion ? 0 : 0.08,
											duration: STATE_DURATION,
											ease: EASE_OUT_QUINT,
										}}
									>
										<IconPlus />
									</motion.div>
								</EmptyMedia>
								<EmptyTitle>No subscriptions yet</EmptyTitle>
								<EmptyDescription>
									Add one and we'll show you what it costs — and whether it's
									still worth it.
								</EmptyDescription>
							</EmptyHeader>
							<EmptyContent className='items-start'>
								<Button
									render={
										<Link
											className='flex gap-2'
											to='/subs/add'
											viewTransition
										/>
									}
								>
									<IconPlus className='size-4' />
									Add your first subscription
								</Button>
							</EmptyContent>
						</Empty>
					</motion.div>
				) : (
					<div className='container mx-auto space-y-6 p-4 font-mono lg:p-8'>
						<motion.section
							animate='visible'
							initial={reduceMotion ? false : 'hidden'}
							variants={summaryContainer}
						>
							<div className='overflow-hidden rounded-lg border border-border'>
								<div className='grid grid-cols-2 divide-border divide-y lg:grid-cols-4 lg:divide-x lg:divide-y-0'>
									{summaryStats.map((stat) => (
										<motion.div
											className='bg-card px-5 py-4 lg:px-6 lg:py-5'
											key={stat.label}
											variants={summaryCell}
										>
											<p className='font-medium text-2xl lg:text-3xl'>
												{stat.animatedValue === null ? (
													stat.value
												) : (
													<AnimatedNumber
														format={stat.format}
														reduceMotion={reduceMotion}
														value={stat.animatedValue}
													/>
												)}
											</p>
											<p className='mt-1 text-muted-foreground text-sm text-pretty'>
												{stat.label}
											</p>
										</motion.div>
									))}
								</div>
							</div>
						</motion.section>

						<section
							className='overflow-hidden rounded-lg border border-border lg:grid lg:grid-cols-2'
						>
							<div className='border-border border-b p-6 lg:border-r'>
								<SectionLabel>Average rating</SectionLabel>
								<div className='flex items-center gap-2'>
									<div className='flex min-w-0 flex-1 gap-1'>
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
													className='relative h-3 flex-1 overflow-hidden rounded bg-muted'
													key={`average_value_${rating}`}
												>
													{fillPercent > 0 && (
														<motion.div
															animate={{ width: `${fillPercent}%` }}
															className={cn(
																'absolute inset-y-0 left-0 rounded-l',
																getRatingCountColor(rating),
															)}
															initial={
																reduceMotion ? false : { width: 0 }
															}
															transition={{
																...barTransition,
																delay: reduceMotion
																	? 0
																	: 0.08 + index * 0.035,
															}}
														/>
													)}
												</div>
											)
										})}
									</div>
									<p className='shrink-0 text-muted-foreground text-xs tabular-nums'>
										{averageRating.toFixed(1)} of 5
									</p>
								</div>
							</div>
							<div className='p-6'>
								<SectionLabel>Cost per rating point</SectionLabel>
								<div className='space-y-3'>
									<div className='flex items-center gap-3'>
										<span className='w-14 shrink-0 text-right text-muted-foreground text-xs tabular-nums'>
											${averageCostPerPoint.toFixed(2)}
										</span>
										<div className='h-3 min-w-0 flex-1 overflow-hidden rounded bg-muted'>
											<motion.div
												animate={{ width: `${averageCopWidth}%` }}
												className='h-full rounded bg-orange-8'
												initial={reduceMotion ? false : { width: 0 }}
												transition={{
													...barTransition,
													delay: reduceMotion ? 0 : 0.12,
												}}
											/>
										</div>
										<span className='w-14 shrink-0 text-muted-foreground text-xs'>
											Average
										</span>
									</div>
									<div className='flex items-center gap-3'>
										<span className='w-14 shrink-0 text-right text-muted-foreground text-xs tabular-nums'>
											${minCostPerPoint.toFixed(2)}
										</span>
										<div className='h-3 min-w-0 flex-1 overflow-hidden rounded bg-muted'>
											<motion.div
												animate={{ width: `${minCopWidth}%` }}
												className='h-full rounded bg-orange-4'
												initial={reduceMotion ? false : { width: 0 }}
												transition={{
													...barTransition,
													delay: reduceMotion ? 0 : 0.16,
												}}
											/>
										</div>
										<span className='w-14 shrink-0 text-muted-foreground text-xs'>
											Best sub
										</span>
									</div>
								</div>
								<p className='mt-3 text-center text-muted-foreground text-xs text-pretty'>
									Your average vs. your best-rated sub
								</p>
							</div>
						</section>

						<section className='overflow-hidden rounded-lg border border-border lg:grid lg:grid-cols-2'>
							<div className='border-border border-b p-6 lg:border-r'>
								<SectionLabel>Best value</SectionLabel>
								{bestValueSub ? (
									<div className='flex items-end justify-between gap-4'>
										<div className='min-w-0'>
											<p className='truncate font-medium text-foreground text-xl'>
												{bestValueSub.name}
											</p>
											<p className='text-muted-foreground text-xs tabular-nums'>
												${bestValueSub.amount}/mo · rated {bestValueSub.rating}{' '}
												of 5
											</p>
										</div>
										<div className='shrink-0 text-right'>
											<p className='font-medium text-foreground text-xl tabular-nums'>
												${bestValueSub.costPerPoint.toFixed(2)}
											</p>
											<p className='text-muted-foreground text-xs'>
												per rating point
											</p>
										</div>
									</div>
								) : (
									<p className='text-muted-foreground text-sm text-pretty'>
										Add a price and rating to see which sub gives you the most
										for your money.
									</p>
								)}
							</div>
							<div className='p-6'>
								<SectionLabel>Priciest per point</SectionLabel>
								{worstValueSub ? (
									<div className='flex items-end justify-between gap-4'>
										<div className='min-w-0'>
											<p className='truncate font-medium text-foreground text-xl'>
												{worstValueSub.name}
											</p>
											<p className='text-muted-foreground text-xs tabular-nums'>
												${worstValueSub.amount}/mo · rated {worstValueSub.rating}{' '}
												of 5
											</p>
										</div>
										<div className='shrink-0 text-right'>
											<p className='font-medium text-foreground text-xl tabular-nums'>
												${worstValueSub.costPerPoint.toFixed(2)}
											</p>
											<p className='text-muted-foreground text-xs'>
												per rating point
											</p>
										</div>
									</div>
								) : (
									<p className='text-muted-foreground text-sm text-pretty'>
										Add a price and rating to spot subs that cost more than they
										give back.
									</p>
								)}
							</div>
						</section>

						<section className='overflow-hidden rounded-lg border border-border lg:grid lg:grid-cols-2'>
							<div className='border-border border-b p-6 lg:border-r'>
								<SectionLabel>By rating</SectionLabel>
								<div className='flex gap-2'>
									{[1, 2, 3, 4, 5].map((rating) => (
										<div
											className='flex max-w-16 min-w-0 flex-auto flex-col items-center gap-1'
											key={`rating_${rating}_count`}
										>
											<span className='text-muted-foreground text-xs tabular-nums'>
												{rating}
											</span>
											{subsByRating[rating]?.map((sub) => (
												<Tooltip key={sub.id}>
													<TooltipTrigger
														render={
															<motion.div
																animate={{ opacity: 1, scaleX: 1 }}
																className={cn(
																	'h-3 w-full rounded',
																	getRatingCountColor(rating),
																)}
																initial={
																	reduceMotion
																		? false
																		: { opacity: 0, scaleX: 0 }
																}
																style={{ originX: 0 }}
																transition={{
																	delay: reduceMotion
																		? 0
																		: 0.16 + (rating - 1) * 0.035,
																	duration: reduceMotion ? 0 : STATE_DURATION,
																	ease: EASE_OUT_QUINT,
																}}
															/>
														}
													/>
													<TooltipContent>
														<p className='mb-2 border-b pb-1 font-medium text-foreground'>
															{sub.name}
														</p>
														<p className='tabular-nums'>${sub.amount}/mo</p>
														<p>Rated {sub.rating} of 5</p>
													</TooltipContent>
												</Tooltip>
											))}
										</div>
									))}
								</div>
							</div>
							<div className='p-6'>
								<SectionLabel>By price</SectionLabel>
								<table
									aria-label='Active subscriptions sorted by monthly price'
									className='w-full'
								>
									<caption className='sr-only'>
										Subscriptions by monthly price
									</caption>
									<tbody>
										{subscriptionsByPrice.map((sub, rowIndex) => {
											const percentage = (sub.amountValue / maxAmount) * 100

											return (
												<tr key={sub.id}>
													<td className='max-w-[8rem] truncate p-1 text-right text-muted-foreground text-xs'>
														{sub.name}
													</td>
													<td className='w-full p-1'>
														<div className='h-3 overflow-hidden rounded bg-muted'>
															<motion.div
																animate={{ width: `${percentage}%` }}
																className='h-full rounded bg-orange-8'
																initial={
																	reduceMotion ? false : { width: 0 }
																}
																transition={{
																	...barTransition,
																	delay: reduceMotion
																		? 0
																		: 0.14 + rowIndex * 0.03,
																}}
															/>
														</div>
													</td>
													<td className='whitespace-nowrap p-1 text-right text-muted-foreground text-xs tabular-nums'>
														${sub.amount}
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</section>

						<section className='overflow-hidden rounded-lg border border-border p-6'>
							<div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
								<SectionLabel className='mb-0'>Your subscriptions</SectionLabel>
								{inactiveSubscriptions.length > 0 && (
									<label
										className='flex items-center gap-2 text-muted-foreground text-xs'
										htmlFor={showInactiveId}
									>
										<span>Show inactive</span>
										<motion.div
											layout={!reduceMotion}
											transition={{
												duration: MICRO_DURATION,
												ease: EASE_OUT_QUINT,
											}}
										>
											<Switch
												aria-label='Show inactive subscriptions in the list'
												checked={showInactive}
												id={showInactiveId}
												onCheckedChange={setShowInactive}
											/>
										</motion.div>
									</label>
								)}
							</div>
							<motion.div
								className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'
								layout={!reduceMotion}
							>
								{subscriptionsForList.length === 0 ? (
									<p className='text-muted-foreground text-sm text-pretty sm:col-span-2 xl:col-span-4'>
										All your subscriptions are inactive. Turn on "Show inactive"
										to see them.
									</p>
								) : (
									<AnimatePresence initial={false} mode='popLayout'>
										{subscriptionsForList.map((sub, subIndex) => (
											<motion.div
												animate='visible'
												exit={
													reduceMotion
														? undefined
														: { opacity: 0, scale: 0.98 }
												}
												initial='hidden'
												key={sub.id}
												layout={!reduceMotion}
												transition={{
													delay: reduceMotion
														? 0
														: cappedListDelay(subIndex),
													duration: STATE_DURATION,
													ease: EASE_OUT_QUINT,
													layout: {
														duration: STATE_DURATION,
														ease: EASE_OUT_QUINT,
													},
												}}
												variants={listItem}
												whileHover={
													reduceMotion ? undefined : { y: -2 }
												}
												whileTap={
													reduceMotion ? undefined : { scale: 0.99 }
												}
											>
												<Card
													className={cn(
														'relative rounded-lg border-border bg-card shadow-none transition-colors hover:bg-orange-2 group/sub',
														sub.isActive === false &&
															'border border-dashed bg-muted/30 opacity-80 hover:bg-muted/50',
													)}
												>
													<Link
														aria-label={`View ${sub.name}`}
														className='absolute inset-0 z-10 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
														params={{ subId: sub.id }}
														to='/subs/$subId'
														viewTransition
													/>
													<div className='absolute top-3 right-3 z-20'>
														<Button
															aria-label={`Edit ${sub.name}`}
															className='opacity-100 transition-opacity focus-visible:opacity-100 lg:opacity-0 lg:group-hover/sub:opacity-100 lg:group-focus-within/sub:opacity-100'
															onClick={(event) => event.stopPropagation()}
															render={
																<Link
																	params={{ subId: sub.id }}
																	to='/subs/$subId/edit'
																	viewTransition
																/>
															}
															size='icon'
															variant='ghost'
														>
															<IconPencil className='size-4 stroke-muted-foreground' />
														</Button>
													</div>
													<CardHeader className='pointer-events-none pb-2'>
														<CardTitle className='truncate pr-12 font-medium'>
															{sub.name}
														</CardTitle>
														<CardDescription className='tabular-nums'>
															${sub.amount}/mo
														</CardDescription>
													</CardHeader>
													<CardContent className='pointer-events-none pt-0'>
														<div className='flex gap-1'>
															{[1, 2, 3, 4, 5].map((rating) => (
																<div
																	className='h-3 min-w-0 flex-auto overflow-hidden rounded bg-muted'
																	key={`${sub.id}_rating_${rating}`}
																>
																	{rating <= sub.rating && (
																		<motion.div
																			animate={{ scaleX: 1 }}
																			className={cn(
																				'h-full rounded',
																				getRatingCountColor(rating),
																			)}
																			initial={
																				reduceMotion
																					? false
																					: { scaleX: 0 }
																			}
																			style={{ originX: 0 }}
																			transition={{
																				delay: reduceMotion
																					? 0
																					: cappedListDelay(subIndex) +
																						0.025 * rating,
																				duration: reduceMotion
																					? 0
																					: STATE_DURATION,
																				ease: EASE_OUT_QUINT,
																			}}
																		/>
																	)}
																</div>
															))}
														</div>
														<p className='mt-2 text-right text-muted-foreground text-xs tabular-nums'>
															Rated {sub.rating} of 5
														</p>
													</CardContent>
												</Card>
											</motion.div>
										))}
									</AnimatePresence>
								)}
							</motion.div>
						</section>
					</div>
				)}
			</main>
		</>
	)
}
