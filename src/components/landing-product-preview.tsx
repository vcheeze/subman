import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { useEffect } from 'react'

import { cn } from '@/lib/utils'

const DEMO_SUBS = [
	{ name: 'Spotify', amount: '16.99', rating: 5 },
	{ name: 'ChatGPT', amount: '20.00', rating: 4 },
	{ name: 'Netflix', amount: '15.99', rating: 3 },
	{ name: 'Amazon Prime', amount: '14.99', rating: 2 },
] as const

const MONTHLY_TOTAL = 62.98
const AVERAGE_RATING = 3.5
const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const
const DATA_DURATION = 0.55
const BAR_DURATION = 0.28
const LIST_STAGGER = 0.06
const BAR_STAGGER = 0.035

function ratingBarColor(rating: number) {
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

function AnimatedPreviewNumber({
	value,
	format,
	reduceMotion,
	delay = 0,
}: {
	value: number
	format: (current: number) => string
	reduceMotion: boolean
	delay?: number
}) {
	const motionValue = useMotionValue(reduceMotion ? value : 0)
	const display = useTransform(motionValue, format)

	useEffect(() => {
		if (reduceMotion) {
			motionValue.set(value)
			return
		}

		const controls = animate(motionValue, value, {
			delay,
			duration: DATA_DURATION,
			ease: EASE_OUT_QUINT,
		})

		return () => controls.stop()
	}, [delay, motionValue, reduceMotion, value])

	return <motion.span className='tabular-nums'>{display}</motion.span>
}

function PreviewRatingBar({
	rating,
	reduceMotion,
	baseDelay = 0,
}: {
	rating: number
	reduceMotion: boolean
	baseDelay?: number
}) {
	return (
		<div className='flex min-w-0 flex-1 gap-0.5'>
			{[1, 2, 3, 4, 5].map((step, index) => {
				const filled = step <= rating

				return (
					<div
						className='h-2 flex-1 overflow-hidden rounded-sm bg-muted'
						key={step}
					>
						{filled ? (
							<motion.div
								className={cn('h-full rounded-sm', ratingBarColor(rating))}
								initial={reduceMotion ? false : { scaleX: 0 }}
								animate={{ scaleX: 1 }}
								style={{ originX: 0 }}
								transition={{
									delay: reduceMotion ? 0 : baseDelay + index * BAR_STAGGER,
									duration: reduceMotion ? 0 : BAR_DURATION,
									ease: EASE_OUT_QUINT,
								}}
							/>
						) : null}
					</div>
				)
			})}
		</div>
	)
}

const listItemVariants = (reduceMotion: boolean) =>
	reduceMotion
		? {
				hidden: { opacity: 1, y: 0 },
				visible: { opacity: 1, y: 0 },
			}
		: {
				hidden: { opacity: 0, y: 8 },
				visible: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.32, ease: EASE_OUT_QUINT },
				},
			}

export function LandingProductPreview({
	reduceMotion,
}: {
	reduceMotion: boolean
}) {
	const previewEnterDelay = reduceMotion ? 0 : 0.28
	const listBaseDelay = reduceMotion ? 0 : previewEnterDelay + 0.2

	return (
		<div aria-hidden='true' className='w-full max-w-lg font-mono text-sm'>
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className='overflow-hidden rounded-lg bg-card shadow-xs ring-1 ring-foreground/10'
				initial={reduceMotion ? false : { opacity: 0, y: 14 }}
				transition={{
					delay: previewEnterDelay,
					duration: reduceMotion ? 0 : 0.45,
					ease: EASE_OUT_QUINT,
				}}
			>
				<div className='grid grid-cols-2 divide-border border-b border-border lg:grid-cols-2'>
					<div className='bg-card px-4 py-3 lg:px-5 lg:py-4'>
						<p className='font-medium text-2xl'>
							<AnimatedPreviewNumber
								delay={previewEnterDelay + 0.12}
								format={(current) => `$${current.toFixed(2)}`}
								reduceMotion={reduceMotion}
								value={MONTHLY_TOTAL}
							/>
						</p>
						<p className='mt-1 text-muted-foreground text-xs text-pretty'>
							monthly total
						</p>
					</div>
					<div className='bg-card px-4 py-3 lg:px-5 lg:py-4'>
						<p className='font-medium text-2xl'>
							<AnimatedPreviewNumber
								delay={previewEnterDelay + 0.18}
								format={(current) => current.toFixed(1)}
								reduceMotion={reduceMotion}
								value={AVERAGE_RATING}
							/>
						</p>
						<p className='mt-1 text-muted-foreground text-xs text-pretty'>
							average value rating
						</p>
					</div>
				</div>

				<div className='space-y-3 p-4 lg:p-5'>
					<p className='font-medium text-muted-foreground text-xs uppercase tracking-wide'>
						/ your subscriptions
					</p>
					<motion.ul
						animate='visible'
						className='space-y-2'
						initial={reduceMotion ? false : 'hidden'}
						variants={{
							hidden: {},
							visible: {
								transition: {
									delayChildren: listBaseDelay,
									staggerChildren: reduceMotion ? 0 : LIST_STAGGER,
								},
							},
						}}
					>
						{DEMO_SUBS.map((sub, index) => (
							<motion.li
								className='rounded-lg border border-border bg-background px-3 py-2.5'
								key={sub.name}
								variants={listItemVariants(reduceMotion)}
							>
								<div className='mb-2 flex items-baseline justify-between gap-2'>
									<span className='truncate font-medium'>{sub.name}</span>
									<span className='shrink-0 text-muted-foreground text-xs tabular-nums'>
										${sub.amount}/mo
									</span>
								</div>
								<PreviewRatingBar
									baseDelay={
										reduceMotion
											? 0
											: listBaseDelay + index * LIST_STAGGER + 0.08
									}
									rating={sub.rating}
									reduceMotion={reduceMotion}
								/>
							</motion.li>
						))}
					</motion.ul>
				</div>
			</motion.div>
			<motion.p
				animate={{ opacity: 1 }}
				className='mt-3 text-center text-muted-foreground text-xs'
				initial={reduceMotion ? false : { opacity: 0 }}
				transition={{
					delay: reduceMotion ? 0 : listBaseDelay + 0.45,
					duration: reduceMotion ? 0 : 0.3,
					ease: EASE_OUT_QUINT,
				}}
			>
				Example view — rate each sub, see what you&apos;re really paying for
			</motion.p>
		</div>
	)
}
